const Item = require('../models/item');
const User = require('../models/user');


exports.getItemById = async (req, res, next) => {
  try {
    itemId = req.params.id;
    const item = await Item.findById(itemId);
    res.status(200).json({
      message: 'items fetched',
      items: item
    })
  } catch (err) {
    console.log(err);
  }
}

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find()
    //.populate('userId');
    //.select('title')
    res.status(200).json({
      message: 'items fetched',
      items: items
    })
  } catch (err) {
    console.log(err);
  }
}

exports.editItem = async (req, res, next) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    let imagePath;
    if (!req.file) {
      imagePath = req.body.imagePath;
    } else {
      imagePath = url + '/images/' + req.file.filename
    }
    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      _id: req.params.id,
      imagePath: imagePath,
      userId: req.body.userId
    })
    const updateResult = await Item.updateOne({_id: req.params.id, userId: req.userData.userId}, item);
    if (updateResult.n > 0) {
      res.status(201).json({
        message: 'item was edited successefully',
        updatedItem: item
      })
    } else {
      throw new Error ('User is not authorized to modify!');
    }
  } catch (err) {
    res.status(500).json({
      err: err,
      message: 'failed to update post'
    })
  }
}

exports.addItem = async (req, res, next) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      userId: req.userData.userId,
      imagePath: url + '/images/' + req.file.filename
    })
    const addedItem = await item.save();
    console.log(addedItem);
    res.status(200).json({
      message: 'item was added',
      item: addedItem
    })
  } catch (err) {
    res.status(500).json({
      err: err,
      message: 'adding post failed'
    })
  }
}

exports.deleteItem = async (req, res, next) => {
  try {
    const deleteResult = await Item.deleteOne({_id: req.params.id, userId: req.userData.userId});
    if (deleteResult.n > 0) {
      res.status(201).json({
        message: 'item was deleted',
      })
    } else {
      throw new Error('User does not have a permission to delete this post');
    }
  } catch (err) {
    res.status(401).json({
      message: err,
    })
  }
}

exports.addToCart = async (req, res ) => {
  try {
    productToCart =  await Item.findById(req.params.id);
    req.user.addToCart(productToCart);
    res.status(201).json({
      message: 'item was added to cart',
    })
  } catch (err) {
    res.status(500).json({
      err: err,
      message: 'adding the item to cart failed'
    })
  }
}

exports.getCartItems = async (req, res) => {
  try {
    userId =  await User.findById(req.user._id);
    const userCart = await userId.populate('cart.items.productId').execPopulate();
    const products = userCart.cart.items;
    res.status(201).json({
      message: 'item was added to cart',
      cartItems: products
    })
  } catch (err) {
    console.log(err);
  }
}

exports.deleteFromCart = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const updatedCart = currentUser.cart.items.filter(item => item._id != req.params.id)
    currentUser.cart.items = updatedCart;
    currentUser.save();
    const detailedCart = await currentUser.populate('cart.items.productId').execPopulate();
    res.status(201).json({
      message: 'item was deleted from cart',
      updatedCart: detailedCart.cart.items
    })
  } catch (err) {
    console.log(err);
  }
}
