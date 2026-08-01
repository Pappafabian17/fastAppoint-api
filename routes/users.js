const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/users");

const validate = require('../middleware/validate');
const {
  userIdValidation,
  createUserValidation,
  updateUserValidation
} = require('../middleware/userValidator');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', userIdValidation, validate, getUserById);
router.post('/', createUserValidation, validate, createUser);
router.put('/:id', updateUserValidation, validate, updateUser);
router.delete('/:id', userIdValidation, validate, deleteUser);

module.exports = router;
