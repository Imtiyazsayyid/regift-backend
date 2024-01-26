import statusType from "../../../@core/enum/statusTypes";
import logger from "../../../@core/services/LoggingService";
import { sendResponse } from "../../../@core/services/ResponseService";
import prisma from "../../../@core/helpers/prisma";
import { getIntOrNull } from "../../../@core/helpers/commonHelpers";
import {
  donatedItemSchema,
  donorSchema,
  organisationSchema,
} from "../validationSchema";

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
    logger.consoleErrorLog(
      req.originalUrl,
      "Error in getOrganisationDetails",
      error
    );
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
    logger.consoleErrorLog(
      res.originalUrl,
      "Error in getAllDonatedItems",
      error
    );
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}
