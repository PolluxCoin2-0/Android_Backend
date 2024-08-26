import User from "../models/user.models.js";

export const register = async (req, res, next) => {
    const { walletAddress, token } = req.body;
  
    try {
      // Check if a verified user with the given walletAddress exists
      const existingUser = await User.findOne({ walletAddress: walletAddress});
  
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Wallet Address is already in use. Please try again",
        });
      } else {
        // If user record is not available in the database, create a new user
        const newUser = await User.create({
         walletAddress: walletAddress,
         token: token,
        });
  
        return res.status(200).json({
          status: "success",
          message: "User registered successfully.",
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the registration process
      console.error("Error during user registration:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };
  