import express from "express";
import {
  getLeads,
  getLeadById,
  getAnalytics,
} from "../controllers/leadController.js";

const leadrouter = express.Router();

/**
 * @route   GET /api/leads
 * @desc    Get all leads (search, filter, sort, pagination)
 */
leadrouter.get("/", getLeads);

/**
 * @route   GET /api/leads/analytics
 * @desc    Get analytics metrics
 */
leadrouter.get("/analytics", getAnalytics);

/**
 * @route   GET /api/leads/:id
 * @desc    Get single lead details
 */
leadrouter.get("/:id", getLeadById);

export default leadrouter;
