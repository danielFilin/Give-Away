const express = require('express');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/admin/post-categories', checkAuth, extractFile, adminController.addCategory);

router.get('/admin/post-categories', checkAuth, adminController.getCategories);

router.get('/admin/categories/:id', checkAuth, adminController.getOneCategory);

router.delete('/admin/delete-category/:id', checkAuth, adminController.deleteCategory);

router.put('/admin/edit-category/:id', checkAuth, extractFile, adminController.editCategory);

module.exports = router;
