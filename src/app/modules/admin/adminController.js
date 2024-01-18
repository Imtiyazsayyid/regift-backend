import statusType from "@/@core/enum/statusTypes";
import logger from "@/@core/services/LoggingService";
import { sendResponse } from "@core/services/ResponseService";
import prisma from "@/@core/helpers/prisma";

// User Functions
export async function getAllUsers(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getAllUsers", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function saveUser(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveUser", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function getSingleUser(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getSingleUser", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function deleteUser(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in deleteUser", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

// Organisation Functions
export async function getAllOrganisations(req, res) {
  try{
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch(error) {
    logger.consoleErrorLog(req.originalUrl,"Error in getAllOrganisations", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveOrganisation(req, res) {
  try{
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch(error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveOrganisation", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleOrganisation(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getSingleOrganisation", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}

export async function deleteOrganisation(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in deleteOrganisation", error);
    return sendResponse(res, false, null, "Error ", statusType.DB_ERROR);
  }
}
// Inventory Functions
export async function getAllInventories(req, res) {
  try{
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch(error) {
    logger.consoleErrorLog(req.originalUrl,"Error in getAllInventories", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function saveInventory(req, res) {
  try{
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch(error) {
    logger.consoleErrorLog(req.originalUrl, "Error in saveInventory", error);
    return sendResponse(res, false, null, "Error", statusType.DB_ERROR);
  }
}

export async function getSingleInventory(req, res) {
  try {
    return sendResponse(res, true, null, "Api Not Ready Yet");
  } catch (error) {
    logger.consoleErrorLog(req.originalUrl, "Error in getSingleInventory", error);
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