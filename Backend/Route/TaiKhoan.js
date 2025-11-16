const express = require("express");
const router = express.Router();
const userController = require("../Controller/TaiKhoan");
const upload = require('../Middleware/Upload');

// CRUD + Login
router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);
router.post("/change-password", userController.changePassword);

// Chỉ dùng 1 PUT route với multer để upload avatar
router.put("/:id", upload.single('Avatar'), userController.updateUser);

module.exports = router;
