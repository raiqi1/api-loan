import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  toggleUserActivation,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProducts,
} from "../controllers/productController.js";

const router = Router();

router.put("/:id/role", authMiddleware, updateUserRole); // Update user role
router.put("/:id/activation", authMiddleware, toggleUserActivation);
router.delete("/:id", authMiddleware, deleteProduct);

router.post("/create-products", authMiddleware, createProduct);
router.get("/all-products", authMiddleware, getAllProducts);
router.get("/all-product", getAllProduct);

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user's profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile
router.put("/profile", authMiddleware, updateUserProfile); // Use authentication for updating profile

export default router;
