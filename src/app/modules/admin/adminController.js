import statusType from "@/@core/enum/statusTypes";
import logger from "@/@core/services/LoggingService";
import { sendResponse } from "@core/services/ResponseService";
import prisma from "@/@core/helpers/prisma";
import { getIntOrNull } from "@/@core/helpers/commonHelpers";
import { donorSchema, organisationSchema } from "../validationSchema";

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
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      profileImg,
      address,
      status,
    } = req.body;

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
      return sendResponse(
        res,
        false,
        donorData,
        "Error ",
        statusType.BAD_REQUEST
      );
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
      return sendResponse(
        res,
        false,
        null,
        "Invalid Donor ID",
        statusType.BAD_REQUEST
      );
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
      return sendResponse(
        res,
        false,
        null,
        "Invalid Donor ID",
        statusType.BAD_REQUEST
      );
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
    logger.consoleErrorLog(
      req.originalUrl,
      "Error in getAllOrganisations",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveOrganisation(req, res) {
  try {
    const {
      id,
      name,
      acronym,
      email,
      password,
      websiteUrl,
      logo,
      address,
      approvalStatus,
      status,
    } = req.body;

    const organisationData = {
      id,
      name,
      acronym,
      email,
      password,
      websiteUrl,
      logo,
      address,
      approvalStatus,
      status,
    };

    const validation = organisationSchema.safeParse(organisationData);
    if (!validation.success) {
      return sendResponse(
        res,
        false,
        organisationData,
        "Error",
        statusType.BAD_REQUEST
      );
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
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}


export async function getSingleOrganisation(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(
        res,
        false,
        null,
        "Invalid Organisation id",
        statusType.BAD_REQUEST
      );
    }

    const organisation = await prisma.organisation.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, organisation, "Success");
  } catch (error) {
    logger.consoleErrorLog(
      req.originalUrl,
      "Error in getSingleOrganisation",
      error
    );
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function deleteOrganisation(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(
        res,
        null,
        "Invalid Organisation id",
        statusType.BAD_REQUEST
      );
    }

    const deletedOrganisation = await prisma.organisation.delete({
      where: {
        id: parseInt(id),
      },
    });
    return sendResponse(res, true, deletedOrganisation, "Success");
  } catch (error) {
    logger.consoleErrorLog(
      req.originalUrl,
      "Error in deleteOrganisation",
      error
    );
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Inventory Functions

export async function getAllInventories(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(
      req.originalUrl,
      "Error in getAllInventories",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveInventory(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveInventory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleInventory(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(
      req.originalUrl,
      "Error in getSingleInventory",
      error
    );
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function deleteInventory(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in deleteInventory", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Category

export async function getAllCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();

    return sendResponse(res, true, categories, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllCategories", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveCategory(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveCategory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleCategory(req, res) {
  try {
    return sendResponse(res, true, nul, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(
      res.originalUrl,
      "Error in getSingleCategory",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function deleteCategory(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in deleteCategory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// DonatedItem

export async function getAllDonatedItems(req, res) {
  try {
    const { searchText, approvalStatus, categoryId } = req.query;

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

    const donatedItems = await prisma.donatedItem.findMany({
      include: {
        donor: true,
        category: true,
      },
      where,
    });
    return sendResponse(res, true, donatedItems, "Success");
  } catch (error) {
    logger.consoleErrorLog(
      res.originalUrl,
      "Error in getAllDonatedItems",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveDonatedItem(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveCategory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleDonatedItem(req, res) {
  try {
    const { id } = req.params;

    if (!id || !getIntOrNull(id)) {
      return sendResponse(
        res,
        false,
        null,
        "Invalid Donated Item ID",
        statusType.BAD_REQUEST
      );
    }

    const donatedItem = await prisma.donatedItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return sendResponse(res, true, donatedItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(
      res.originalUrl,
      "Error in getSingleDonatedItems",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function deleteDonatedItem(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(
      res.originalUrl,
      "Error in deleteDonatedItems",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}
