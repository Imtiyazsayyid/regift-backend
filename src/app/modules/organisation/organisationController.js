import statusType from "../../../@core/enum/statusTypes";
import logger from "../../../@core/services/LoggingService";
import { sendResponse } from "../../../@core/services/ResponseService";
import prisma from "../../../@core/helpers/prisma";
import { getIntOrNull } from "../../../@core/helpers/commonHelpers";
import { donatedItemSchema, donorSchema, organisationSchema } from "../validationSchema";

// Reset Password
export async function sendOTP(req, res) {
  try {
    const { email } = req.body;

    const organisation = await prisma.organisation.findFirst({
      where: {
        email,
      },
    });

    if (!organisation) {
      return sendResponse(res, false, null, "User Does Not Exist.");
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    const savedOrganisation = await prisma.organisation.update({
      data: {
        otp,
      },
      where: {
        id: organisation.id,
        approvalStatus: "approved",
      },
    });

    // send OTP mail

    return sendResponse(res, true, null, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, statusType.DB_ERROR);
  }
}

export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    const organisation = await prisma.organisation.findFirst({
      where: {
        email,
        otp: (otp && parseInt(otp)) || 0,
        approvalStatus: "approved",
      },
    });

    if (!organisation) {
      return sendResponse(res, false, null, "Invalid OTP", statusType.BAD_REQUEST);
    }

    return sendResponse(res, true, null, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, statusType.DB_ERROR);
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!newPassword || !email || !otp) {
      return sendResponse(res, false, null, "Send All Details", statusType.BAD_REQUEST);
    }

    const organisation = await prisma.organisation.findFirst({
      where: {
        email,
        otp: (otp && parseInt(otp)) || 0,
        approvalStatus: "approved",
      },
    });

    if (!organisation) {
      return sendResponse(res, false, null, "Invalid Details", statusType.BAD_REQUEST);
    }

    const savedOrganisation = await prisma.organisation.update({
      data: {
        password: newPassword,
      },
      where: {
        id: organisation.id,
      },
    });

    return sendResponse(res, true, null, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, statusType.DB_ERROR);
  }
}
// Organisation Details
export async function getOrganisationDetails(req, res) {
  try {
    const { id } = req.app.settings.userInfo;

    const organisation = await prisma.organisation.findUnique({
      where: {
        id,
      },
    });

    return sendResponse(res, true, organisation, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getOrganisationDetails", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Donated Items
export async function getAllDonatedItems(req, res) {
  try {
    const { searchText, categoryId, condition } = req.query;

    let where = {};

    if (searchText) {
      where = {
        ...where,
        OR: [{ title: { contains: searchText } }],
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

    const donatedItems = await prisma.donatedItem.findMany({
      include: {
        donor: true,
        category: true,
      },
      where: {
        isPickedUp: true,
        isAvailable: true,
        approvalStatus: "approved",
        ...where,
      },
    });
    return sendResponse(res, true, donatedItems, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getAllDonatedItems", error);
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
      include: {
        category: true,
      },
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

export async function getAllCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();

    return sendResponse(res, true, categories, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllCategories", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// Organisation
export async function saveOrganisation(req, res) {
  try {
    const { id, name, acronym, email, password, websiteUrl, logo, address, status } = req.body;

    const organisationData = {
      id,
      name,
      acronym,
      email,
      password,
      websiteUrl,
      logo,
      address,
      status,
    };

    const validation = organisationSchema.safeParse(organisationData);

    if (!validation.success) {
      return sendResponse(res, false, organisationData, "Error ", statusType.BAD_REQUEST);
    }

    let savedOrganisation;

    if (organisationData.id) {
      savedOrganisation = await prisma.organisation.update({
        data: organisationData,
        where: {
          id: organisationData.id,
        },
      });
    } else {
      savedOrganisation = await prisma.organisation.create({
        data: organisationData,
      });
    }

    return sendResponse(res, true, organisationData, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, statusType.DB_ERROR);
  }
}

// Cart
export async function getAllCartItems(req, res) {
  try {
    const { searchText } = req.query;
    const { id } = req.app.settings.userInfo;

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

    const cart = await prisma.cartItem.findMany({
      include: {
        donatedItem: {
          include: {
            category: true,
          },
        },
        organisation: true,
      },
      where: {
        organisationId: id,
        ...where,
      },
    });

    return sendResponse(res, true, cart, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getAllDonatedItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveCartItem(req, res) {
  try {
    const { donatedItemId } = req.body;
    const { id } = req.app.settings.userInfo;

    const cartItemData = {
      donatedItemId: parseInt(donatedItemId),
      organisationId: id,
    };

    const existingCartItemCount = await prisma.cartItem.count({
      where: {
        ...cartItemData,
      },
    });

    if (existingCartItemCount > 0) {
      return sendResponse(res, false, null, "Item Already In Cart.");
    }

    const donatedItem = await prisma.donatedItem.findUnique({
      where: {
        id: parseInt(donatedItemId),
      },
    });

    if (!donatedItem.isAvailable) {
      return sendResponse(res, false, null, "Item Not Avaialable.");
    }

    let savedCartItem = await prisma.cartItem.create({
      data: cartItemData,
    });

    return sendResponse(res, true, savedCartItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveCartItem", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleCartItem(req, res) {
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

export async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;
    if (!id || !getIntOrNull(id)) {
      return sendResponse(res, false, null, "Invalid Cart Item ID", statusType.BAD_REQUEST);
    }

    const cartItem = await prisma.cartItem.delete({
      where: {
        id: parseInt(id),
      },
    });
    return sendResponse(res, true, cartItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in deleteCartItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// Order
export async function getAllOrders(req, res) {
  try {
    const { searchText, orderStatus, showCancelled } = req.query;
    const { id } = req.app.settings.userInfo;

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
        organisationId: id,
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
    const { id } = req.app.settings.userInfo;

    let cartItems = await prisma.cartItem.findMany({
      where: {
        organisationId: id,
      },
    });

    if (cartItems.length === 0) {
      return sendResponse(res, false, null, "Cart Is Empty");
    }

    cartItems = cartItems.map((item) => ({
      organisationId: item.organisationId,
      donatedItemId: item.donatedItemId,
      orderStatus: "pending",
    }));

    for (let item of cartItems) {
      const placedOrder = await prisma.order.create({
        data: item,
      });
    }

    const allOrders = await prisma.order.findMany({
      where: {
        organisationId: id,
        orderStatus: {
          not: "cancelled",
        },
      },
    });

    for (let item of allOrders) {
      // remove ordered items from everyones cart.
      const deletedCartItems = await prisma.cartItem.deleteMany({
        where: {
          donatedItemId: item.donatedItemId,
        },
      });

      // change availability of all donated items to false
      const unAvailableItems = await prisma.donatedItem.update({
        data: {
          isAvailable: false,
        },
        where: {
          id: item.donatedItemId,
        },
      });
    }

    return sendResponse(res, true, allOrders, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveCartItem", error);
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
