import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../models/productModel.js";

// Create Product tampilkan id yang membuatnya
export const createProduct = async (req, res) => {
  const { name } = req.body;

  try {
    const product = await Product.create({ name, userId: req.user.id });
    res.status(201).json({
      data: product,
      message: "Product created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get all products by user login
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { userId: req.user.id } });
    res.json({ data: products, message: "All products", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // Send both the token and the user's role in the response
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(req.user.id); // Get logged-in user's ID from the JWT token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get the logged-in user's profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "isActive"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// // Update user role
// export const updateUserRole = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { role } = req.body;

//         const user = await User.findByPk(id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         user.role = role;
//         await user.save();
//         res.json({ message: 'User role updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// Deactivate or delete a user
// export const toggleUserActivation = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const user = await User.findByPk(id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         user.isActive = !user.isActive;
//         await user.save();
//         res.json({ message: 'User activation status changed successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle user activation
export const toggleUserActivation = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: "User activation status changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
