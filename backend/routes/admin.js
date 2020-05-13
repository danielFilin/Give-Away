const express = require('express');

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const extractFile = require('../middleware/file');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/admin/post-categories', checkAuth, checkAdmin, extractFile, adminController.addCategory);

router.get('/admin/post-categories', adminController.getCategories);

router.get('/admin/categories/:id', checkAuth, checkAdmin, adminController.getOneCategory);

router.delete('/admin/delete-category/:id', checkAuth, checkAdmin, adminController.deleteCategory);

router.put('/admin/edit-category/:id', checkAuth, checkAdmin, extractFile, adminController.editCategory);

router.get('/admin/get-users', checkAuth, adminController.getUsers);

router.delete('/admin/delete-user/:id', checkAuth, checkAdmin, adminController.deleteUser);

router.get('/admin/get-items', checkAuth, adminController.getAllItems);

module.exports = router;
