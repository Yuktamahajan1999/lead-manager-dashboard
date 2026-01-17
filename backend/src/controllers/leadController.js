import Lead from "../models/Lead.js";

/**
 * @desc    Get all leads (search, filter, pagination)
 * @route   GET /api/leads
 */
export const getLeads = async (req, res) => {
  try {
    const {
      search = "",
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // 🔍 Search query logic
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 Filter by status
    if (status) {
      query.status = status;
    }

    // 🔢 Pagination & Sorting
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // 📊 Calculations for Dashboard Cards
    const totalLeads = await Lead.countDocuments(); 
    const convertedCount = await Lead.countDocuments({ status: "Converted" });
    const lostCount = await Lead.countDocuments({ status: "Lost" });

    // 📊 Total count for Table Pagination (Filtered)
    const totalFiltered = await Lead.countDocuments(query);

    // 📥 Fetch Table Data
    const leads = await Lead.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: leads,
      total: totalFiltered,
      totalLeads,         
      convertedCount,      
      lostCount,            
      page: Number(page),
      totalPages: Math.ceil(totalFiltered / limit),
    });
  } catch (error) {
    console.error("Error fetching leads:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @desc    Get single lead by ID
 * @route   GET /api/leads/:id
 */
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    console.error("Error fetching lead:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @desc    Analytics data
 * @route   GET /api/leads/analytics
 */
export const getAnalytics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: "Converted" });

    const leadsByStatus = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalLeads,
      convertedLeads,
      leadsByStatus,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


