import statusType from "../../../@core/enum/statusTypes";
import logger from "../../../@core/services/LoggingService";
import { sendResponse } from "../../../@core/services/ResponseService";
import prisma from "../../../@core/helpers/prisma";
import { getIntOrNull } from "../../../@core/helpers/commonHelpers";
import { donatedItemSchema, donorSchema, organisationSchema, categorySchema } from "../validationSchema";
import { getComparisonDate } from "../../helpers/datetimeHelpers";
import { mailOptions, transporter } from "../../helpers/email";
import welcomeOrganisation from "../../emails/templates/welcomeOrganisation";
import welcomeApprovedOrganisation from "../../emails/templates/welcomeApprovedOrganisation";
import rejectOrganisation from "../../emails/templates/rejectOrganisation";
import moment from "moment";

import {
  processOrders,
  getMonthRange,
  mergeWithRange,
  mergeDonorsWithRange,
  processDonors,
  procesOrganisations,
  mergeOrganisationsWithRange,
  mergeDonationsWithRange,
  procesDonations,
} from "./chartHelpers";

// Admin Details
export async function getAdminDetails(req, res) {
  try {
    const { id } = req.app.settings.userInfo;

    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    return sendResponse(res, true, admin, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllDonors", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Donor Functions

export async function getAllDonors(req, res) {
  try {
    const { searchText } = req.query;

    let where = {};

    if (searchText) {
      where = {
        ...where,
        OR: [
          { firstName: { contains: searchText } },
          { lastName: { contains: searchText } },
          { email: { contains: searchText } },
        ],
      };
    }

    const donors = await prisma.donor.findMany({
      where,
    });

    return sendResponse(res, true, donors, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllDonors", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function saveDonor(req, res) {
  try {
    const { id, firstName, lastName, email, password, gender, profileImg, address, status } = req.body;

    const donorData = {
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      profileImg,
      address,
      status,
    };

    const validation = donorSchema.safeParse(donorData);

    if (!validation.success) {
      return sendResponse(res, false, donorData, "Error ", statusType.BAD_REQUEST);
    }

    let savedDonor;

    if (donorData.id) {
      savedDonor = await prisma.donor.update({
        data: donorData,
        where: {
          id: donorData.id,
        },
      });
    } else {
      savedDonor = await prisma.donor.create({
        data: donorData,
      });
    }

    return sendResponse(res, true, savedDonor, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveDonor", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function getSingleDonor(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Donor ID", statusType.BAD_REQUEST);
    }

    const donor = await prisma.donor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, donor, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getSingleDonor", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function deleteDonor(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Donor ID", statusType.BAD_REQUEST);
    }

    const deletedDonor = await prisma.donor.delete({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, deletedDonor, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in deleteDonor", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Organisation Functions

export async function getAllOrganisations(req, res) {
  try {
    const { searchText, approvalStatus } = req.query;

    let where = {};

    if (searchText) {
      where = {
        ...where,
        OR: [
          { name: { contains: searchText } },
          { acronym: { contains: searchText } },
          { email: { contains: searchText } },
        ],
      };
    }

    if (approvalStatus) {
      where = {
        ...where,
        approvalStatus,
      };
    }

    const organisations = await prisma.organisation.findMany({ where });
    return sendResponse(res, true, organisations, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllOrganisations", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveOrganisation(req, res) {
  try {
    const { id, name, acronym, email, password, websiteUrl, logo, address, approvalStatus, status } = req.body;

    const organisationData = {
      id,
      name,
      acronym,
      email,
      password,
      websiteUrl,
      logo,
      address,
      approvalStatus: approvalStatus || null,
      status,
    };

    const validation = organisationSchema.safeParse(organisationData);

    if (!validation.success) {
      return sendResponse(res, false, organisationData, "Error", statusType.BAD_REQUEST);
    }

    let savedOrganisation;

    if (organisationData.id) {
      savedOrganisation = await prisma.organisation.update({
        data: organisationData,
        where: {
          id: organisationData.id,
        },
      });

      if (savedOrganisation.approvalStatus === "approved") {
        await transporter.sendMail({
          ...mailOptions,
          to: savedOrganisation.email,
          subject: "Regift Account has been approved!",
          html: welcomeApprovedOrganisation(savedOrganisation),
        });
      }

      if (savedOrganisation.approvalStatus === "rejected") {
        await transporter.sendMail({
          ...mailOptions,
          to: savedOrganisation.email,
          subject: "Regift Application has been rejected!",
          html: rejectOrganisation(savedOrganisation),
        });
      }
    } else {
      savedOrganisation = await prisma.organisation.create({
        data: organisationData,
      });

      await transporter.sendMail({
        ...mailOptions,
        to: savedOrganisation.email,
        subject: "Welcome Aboard!",
        html: welcomeOrganisation(savedOrganisation),
      });
    }

    return sendResponse(res, true, savedOrganisation, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleOrganisation(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Organisation id", statusType.BAD_REQUEST);
    }

    const organisation = await prisma.organisation.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, organisation, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getSingleOrganisation", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function deleteOrganisation(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, null, "Invalid Organisation id", statusType.BAD_REQUEST);
    }

    const deletedOrganisation = await prisma.organisation.delete({
      where: {
        id: parseInt(id),
      },
    });
    return sendResponse(res, true, deletedOrganisation, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in deleteOrganisation", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Category

export async function getAllCategories(req, res) {
  try {
    // const { searchText, key } = req.query;

    // let where = {};

    // if (searchText) {
    //   where = {
    //     ...where,
    //     OR: [
    //       { name: { contains: searchText } },
    //       { key: { contains: searchText } },
    //     ],
    //   };
    // }

    // if (key) {
    //   where = {
    //     ...where,
    //     key,
    //   };
    // }

    const categories = await prisma.category.findMany();
    return sendResponse(res, true, categories, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllCategories", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveCategory(req, res) {
  try {
    const { id, name, key, description, status } = req.body;

    const categoryData = {
      id,
      name,
      key,
      description,
      status,
    };

    const validation = categorySchema.safeParse(categoryData);

    if (!validation.success) {
      return sendResponse(res, false, categoryData, "Error ", statusType.BAD_REQUEST);
    }

    let savedCategory;

    if (categoryData.id) {
      savedCategory = await prisma.category.update({
        data: categoryData,
        where: {
          id: categoryData.id,
        },
      });
    } else {
      savedCategory = await prisma.category.create({
        data: categoryData,
      });
    }

    return sendResponse(res, true, categoryData, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveCategory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleCategory(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Category ID", statusType.BAD_REQUEST);
    }

    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, category, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getSingleCategory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Category ID", statusType.BAD_REQUEST);
    }

    const donatedItems = await prisma.donatedItem.findFirst({
      where: {
        categoryId: parseInt(id),
      },
    });

    if (donatedItems) {
      return sendResponse(res, false, null, "Cannot Delete. Category In Use.", statusType.SUCCESS);
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, deletedCategory, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in deleteCategory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// DonatedItem

export async function getAllDonatedItems(req, res) {
  try {
    const { searchText, approvalStatus, categoryId, condition, availability, isPickedUp } = req.query;

    let where = {};

    if (searchText) {
      where = {
        ...where,
        OR: [{ title: { contains: searchText } }],
      };
    }

    if (approvalStatus) {
      where = {
        ...where,
        approvalStatus,
      };
    }

    if (categoryId) {
      where = {
        ...where,
        categoryId: parseInt(categoryId),
      };
    }

    if (condition) {
      where = {
        ...where,
        condition,
      };
    }

    if (availability) {
      where = {
        ...where,
        isAvailable: availability == "true" ? true : false,
      };
    }

    if (isPickedUp) {
      where = {
        ...where,
        isPickedUp: isPickedUp == "true" ? true : false,
      };
    }

    const donatedItems = await prisma.donatedItem.findMany({
      include: {
        donor: true,
        category: true,
      },
      where,
    });
    return sendResponse(res, true, donatedItems, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getAllDonatedItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveDonatedItem(req, res) {
  try {
    const { id, title, image, condition, approvalStatus, isPickedUp, categoryId, description, donorId } = req.body;

    const donatedItemData = {
      id,
      title,
      image,
      condition,
      isPickedUp,
      approvalStatus,
      categoryId,
      description,
      donorId,
    };

    const validation = donatedItemSchema.safeParse(donatedItemData);

    if (!validation.success) {
      return sendResponse(res, false, donatedItemData, "Error", statusType.BAD_REQUEST);
    }

    let savedDonatedItem;

    if (donatedItemData.id) {
      savedDonatedItem = await prisma.donatedItem.update({
        data: {
          ...donatedItemData,
          isAvailable:
            donatedItemData.approvalStatus === "approved" && donatedItemData.isPickedUp === true ? true : false,
        },
        where: {
          id: donatedItemData.id,
        },
      });
    } else {
      savedDonatedItem = await prisma.donatedItem.create({
        data: {
          ...donatedItemData,
          isAvailable:
            donatedItemData.approvalStatus === "approved" && donatedItemData.isPickedUp === true ? true : false,
        },
      });
    }

    return sendResponse(res, true, savedDonatedItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveDonatedItem", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleDonatedItem(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Donated Item ID", statusType.BAD_REQUEST);
    }

    const donatedItem = await prisma.donatedItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, donatedItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getSingleDonatedItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function deleteDonatedItem(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Cart Item ID", statusType.BAD_REQUEST);
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, cartItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in deleteDonatedItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// Orders

export async function getAllOrders(req, res) {
  try {
    const { searchText, orderStatus, showCancelled, dateRange } = req.query;

    let where = {};

    if (searchText) {
      where = {
        ...where,
        donatedItem: {
          title: {
            contains: searchText,
          },
        },
      };
    }

    if (orderStatus) {
      where = {
        ...where,
        orderStatus,
      };
    }

    if (showCancelled === "true") {
      where = {
        ...where,
        orderStatus: "cancelled",
      };
    }

    if (dateRange && dateRange.length == 2) {
      const { startDate, endDate } = getComparisonDate(dateRange);

      where = {
        ...where,
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    const order = await prisma.order.findMany({
      include: {
        donatedItem: {
          include: {
            category: true,
          },
        },
        organisation: true,
      },
      where: {
        orderStatus: {
          not: "cancelled",
        },
        ...where,
      },
    });

    return sendResponse(res, true, order, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getAllOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveOrder(req, res) {
  try {
    const { orderStatus, id } = req.body;

    if (!orderStatus || !id) {
      return sendResponse(res, false, null, "Please Send Order Status And Order ID");
    }

    const allowedOrderStatus = ["pending", "processing", "confirmed", "shipped", "delivered", "cancelled"];

    if (!allowedOrderStatus.includes(orderStatus)) {
      return sendResponse(res, false, null, "Invalid Order Status");
    }

    const updatedOrder = await prisma.order.update({
      data: {
        orderStatus,
      },
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, updatedOrder, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in saveOrder", error);
    return sendResponse(res, false, null, "Error in SaveOrder", statusType.DB_ERROR);
  }
}

export async function getSingleOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      include: {
        donatedItem: {
          include: {
            category: true,
          },
        },
        organisation: true,
      },
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, order, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getAllOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Order ID", statusType.BAD_REQUEST);
    }

    const order = await prisma.order.update({
      data: {
        orderStatus: "cancelled",
      },
      where: {
        id: parseInt(id),
      },
    });

    const itemAvailable = await prisma.donatedItem.update({
      data: {
        isAvailable: true,
      },
      where: {
        id: order.donatedItemId,
      },
    });

    return sendResponse(res, true, order, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in deleteCartItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// charts

export async function chartOrders(req, res) {
  try {
    // Fetch all orders

    const { startDate, endDate } = req.params;

    let created_at = {};

    if (startDate) {
      created_at = {
        ...created_at,
        gte: moment(startDate).toISOString(),
      };
    }

    if (endDate) {
      created_at = {
        ...created_at,
        lte: moment(endDate).toISOString(),
      };
    }

    const allOrders = await prisma.order.findMany({
      where: {
        orderStatus: {
          not: "cancelled",
        },
        created_at,
      },
    });

    // Process orders to create an array of objects including months with no orders
    const monthlyOrders = processOrders(allOrders);

    // Get the range of months from 12 months ago to the current month
    const range = getMonthRange();

    // Merge the existing monthlyOrders with the range to ensure all months are included
    const result = mergeWithRange(monthlyOrders, range);

    return sendResponse(res, true, result, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function chartDonations(req, res) {
  try {
    // Fetch all orders

    const { startDate, endDate } = req.params;

    let created_at = {};

    if (startDate) {
      created_at = {
        ...created_at,
        gte: moment(startDate).toISOString(),
      };
    }

    if (endDate) {
      created_at = {
        ...created_at,
        lte: moment(endDate).toISOString(),
      };
    }

    const allDonations = await prisma.donatedItem.findMany({
      where: {
        created_at,
      },
    });

    // Process orders to create an array of objects including months with no orders
    const monthlyDonations = procesDonations(allDonations);

    // Get the range of months from 12 months ago to the current month
    const range = getMonthRange();

    // Merge the existing monthlyOrders with the range to ensure all months are included
    const result = mergeDonationsWithRange(monthlyDonations, range);

    return sendResponse(res, true, result, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function chartDonors(req, res) {
  try {
    // Fetch all orders

    const { startDate, endDate } = req.params;

    let created_at = {};

    if (startDate) {
      created_at = {
        ...created_at,
        gte: moment(startDate).toISOString(),
      };
    }

    if (endDate) {
      created_at = {
        ...created_at,
        lte: moment(endDate).toISOString(),
      };
    }

    const allDonors = await prisma.donor.findMany({
      where: {
        status: true,
        created_at,
      },
    });

    // Process orders to create an array of objects including months with no orders
    const monthlyDonors = processDonors(allDonors);

    // Get the range of months from 12 months ago to the current month
    const range = getMonthRange();

    // Merge the existing monthlyOrders with the range to ensure all months are included
    const result = mergeDonorsWithRange(monthlyDonors, range);

    return sendResponse(res, true, result, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function chartOrganisations(req, res) {
  try {
    // Fetch all orders

    const { startDate, endDate } = req.params;

    let created_at = {};

    if (startDate) {
      created_at = {
        ...created_at,
        gte: moment(startDate).toISOString(),
      };
    }

    if (endDate) {
      created_at = {
        ...created_at,
        lte: moment(endDate).toISOString(),
      };
    }

    const allOrganisations = await prisma.organisation.findMany({
      where: {
        status: true,
        created_at,
      },
    });

    // Process orders to create an array of objects including months with no orders
    const monthlyOrganisations = procesOrganisations(allOrganisations);

    // Get the range of months from 12 months ago to the current month
    const range = getMonthRange();

    // Merge the existing monthlyOrders with the range to ensure all months are included
    const result = mergeOrganisationsWithRange(monthlyOrganisations, range);

    return sendResponse(res, true, result, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function chartCounts(req, res) {
  try {
    const organisationsCount = await prisma.organisation.count({
      where: {
        status: true,
      },
    });

    const donorsCount = await prisma.donor.count({
      where: {
        status: true,
      },
    });

    const donationsCount = await prisma.donatedItem.count();

    const ordersCount = await prisma.order.count({
      where: {
        orderStatus: {
          not: "cancelled",
        },
      },
    });

    const totalUsersCount = organisationsCount + donorsCount;

    const data = {
      organisationsCount,
      donorsCount,
      donationsCount,
      ordersCount,
      totalUsersCount,
    };

    return sendResponse(res, true, data, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function chartOrdersByCategory(req, res) {
  try {
    const ordersByCategory = await prisma.order.findMany({
      include: {
        donatedItem: {
          include: {
            category: true,
          },
        },
      },
      where: {
        orderStatus: {
          not: "cancelled",
        },
      },
    });

    // Now, let's create a map to count orders by category
    const ordersCountByCategory = {};

    ordersByCategory.forEach((order) => {
      const categoryName = order.donatedItem.category.name;
      if (!ordersCountByCategory[categoryName]) {
        ordersCountByCategory[categoryName] = 0;
      }
      ordersCountByCategory[categoryName]++;
    });

    const ordersCountArray = Object.keys(ordersCountByCategory).map((categoryName) => ({
      name: categoryName,
      count: ordersCountByCategory[categoryName],
    }));

    return sendResponse(res, true, ordersCountArray, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function chartDonationsByCategory(req, res) {
  try {
    const donationsByCategory = await prisma.donatedItem.findMany({
      include: {
        category: true,
      },
    });

    // Now, let's create a map to count orders by category
    const donationsCountByCategory = {};

    donationsByCategory.forEach((donatedItem) => {
      const categoryName = donatedItem.category.name;
      if (!donationsCountByCategory[categoryName]) {
        donationsCountByCategory[categoryName] = 0;
      }
      donationsCountByCategory[categoryName]++;
    });

    const donationsCountArray = Object.keys(donationsCountByCategory).map((categoryName) => ({
      name: categoryName,
      count: donationsCountByCategory[categoryName],
    }));

    return sendResponse(res, true, donationsCountArray, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in chartOrders", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}
