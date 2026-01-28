import express from "express";
import User from "../models/User.js";
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, department, birthday, position, gender, married, role, image, rememberMe } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      name,
      email,
      password,
      department,
      birthday,
      position,
      gender,
      married,
      role,
      image,
      rememberMe
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully ✅", user : savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


router.post("/login", async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("Login successful for:", user.email);
    res.json({ user: user.toObject() });
  } catch (error) {
    console.error("Login route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user profile
router.get("/me", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log('Searching for user profile with email:', email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log('Found user profile:', { email: user.email, name: user.name, role: user.role });
    res.json(user);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

//--------------------------------------
// Update user profile
router.put("/me", async (req, res) => {
  try {
    const { email, phone, department, position, gender, married, image } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required to update profile" });
    }

    // Find user by email and update the allowed fields
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { 
        $set: { 
          phone, 
          department, 
          position, 
          gender, 
          married, 
          image 
        } 
      },
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully ✅", user: updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update profile ❌" });
  }
});




export default router;
