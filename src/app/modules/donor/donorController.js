import statusType from "../../../@core/enum/statusTypes";
import logger from "../../../@core/services/LoggingService";
import { sendResponse } from "../../../@core/services/ResponseService";
import prisma from "../../../@core/helpers/prisma";
import { getIntOrNull } from "../../../@core/helpers/commonHelpers";
import { donatedItemSchema, donorSchema, organisationSchema } from "../validationSchema";
import { mailOptions, transporter } from "../../helpers/email";
import donorOTP from "../../emails/templates/donorOTP";
import donorPasswordReset from "../../emails/templates/donorPasswordReset";

// Reset Password
export async function sendOTP(req, res) {
  try {
    const { email } = req.body;

    const donor = await prisma.donor.findFirst({
      where: {
        email,
      },
    });

    if (!donor) {
      return sendResponse(res, false, null, "User Does Not Exist.");
    }

    const otp = Math.floor(Math.random() * 900000) + 100000;

    const savedDonor = await prisma.donor.update({
      data: {
        otp,
      },
      where: {
        id: donor.id,
      },
    });

    // send OTP mail
    await transporter.sendMail({
      ...mailOptions,
      to: savedDonor.email,
      subject: "Verify Email",
      html: donorOTP(savedDonor),
    });

    return sendResponse(res, true, null, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, statusType.DB_ERROR);
  }
}

export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    const donor = await prisma.donor.findFirst({
      where: {
        email,
        otp: (otp && parseInt(otp)) || 0,
      },
    });

    if (!donor) {
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

    const donor = await prisma.donor.findFirst({
      where: {
        email,
        otp: (otp && parseInt(otp)) || 0,
      },
    });

    if (!donor) {
      return sendResponse(res, false, null, "Invalid Details", statusType.BAD_REQUEST);
    }

    const savedDonor = await prisma.donor.update({
      data: {
        password: newPassword,
        otp: null,
      },
      where: {
        id: donor.id,
      },
    });

    // send OTP mail
    await transporter.sendMail({
      ...mailOptions,
      to: savedDonor.email,
      subject: "Password Reset",
      html: donorPasswordReset(savedDonor),
    });

    return sendResponse(res, true, null, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, statusType.DB_ERROR);
  }
}

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

// Donated Items
export async function getAllDonatedItems(req, res) {
  try {
    const { id } = req.app.settings.userInfo;

    const donatedItems = await prisma.donatedItem.findMany({
      include: {
        donor: true,
        category: true,
      },
      where: {
        donorId: id,
      },
    });
    return sendResponse(res, true, donatedItems, "Success");
  } catch (error) {
    logger.consoleErrorLog(res.originalUrl, "Error in getAllDonatedItems", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveDonatedItem(req, res) {
  try {
    const { title, image, condition, categoryId, description } = req.body;
    const { id: donorId } = req.app.settings.userInfo;

    const donatedItemData = {
      donorId,
      title,
      description,
      image,
      condition,
      categoryId,
    };

    const validation = donatedItemSchema.safeParse(donatedItemData);

    if (!validation.success) {
      return sendResponse(res, false, donatedItemData, "Error", statusType.BAD_REQUEST);
    }

    let savedDonatedItem = await prisma.donatedItem.create({
      data: donatedItemData,
    });

    return sendResponse(res, true, savedDonatedItem, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveDonatedItem", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

// Categories
export async function getAllCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();
    return sendResponse(res, true, categories, "Success");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllCategories", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}
