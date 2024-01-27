import statusType from "../../../@core/enum/statusTypes";
import logger from "../../../@core/services/LoggingService";
import { sendResponse } from "../../../@core/services/ResponseService";
import prisma from "../../../@core/helpers/prisma";
import { getIntOrNull } from "../../../@core/helpers/commonHelpers";
import { donatedItemSchema, donorSchema, organisationSchema } from "../validationSchema";

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
