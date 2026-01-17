/**
 * @desc    Simple login (basic auth)
 * @route   POST /api/auth/login
 */
export const login = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials (demo purpose)
  const ADMIN_EMAIL = "admin@crm.com";
  const ADMIN_PASSWORD = "admin123";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email,
        name: "Admin User",
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
};
