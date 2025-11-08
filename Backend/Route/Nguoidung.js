const express = require('express');
const router = express.Router();
const userController = require('../Controller/NguoiDung');

router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/login', userController.loginUser);

module.exports = router;