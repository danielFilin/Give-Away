const express = require('express');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const itemsController = require('../controllers/items');

const router = express.Router();

router.get('/items/:id', itemsController.getItemById);

router.get('/items', checkAuth, itemsController.getAllItems);

// router.get('/items-category/:category', checkAuth, itemsController.getItemsByCategory);

router.post('/edit/:id', checkAuth, extractFile, itemsController.editItem);

router.post('/post-items',checkAuth, extractFile, itemsController.addItem);

router.delete('/delete/:id', checkAuth, itemsController.deleteItem);

router.post('/cart/:id', checkAuth, itemsController.addToCart);

router.get('/user-cart',checkAuth, itemsController.getCartItems);

router.delete('/delete-from-cart/:id', checkAuth, itemsController.deleteFromCart);

router.get('/orders', checkAuth, itemsController.postOrder);

router.get('/get-orders', checkAuth, itemsController.getOrders);

router.post('/favorites', checkAuth, itemsController.addToFavorites);

router.get('/favorites', checkAuth, itemsController.getFavorites);

router.delete('/delete-from-favorites/:id', checkAuth, itemsController.deleteFromFavorites);


module.exports = router;


