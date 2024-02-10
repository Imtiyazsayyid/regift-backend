import statusType from "../../../@core/enum/statusTypes";
import logger from "../../../@core/services/LoggingService";
import { sendResponse } from "../../../@core/services/ResponseService";
import prisma from "../../../@core/helpers/prisma";
import { getIntOrNull } from "../../../@core/helpers/commonHelpers";
import { donatedItemSchema, donorSchema, organisationSchema } from "../validationSchema";

// Donor Details
export async function getDonorDetails(req, res) {
  try {
    const { id } = req.app.settings.userInfo;

    const organisation = await prisma.donor.findUnique({
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
