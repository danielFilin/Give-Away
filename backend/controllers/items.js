const Item = require('../models/item');
const User = require('../models/user');
const Order = require('../models/order');

exports.getOrders = async (req, res) => {
  try {
  const userOrders = await Order.find({"user.userId" : req.user._id});
  res.status(200).json({
    message: 'items order added',
    orders: userOrders
  });
} catch (err) {
  console.log(err);
}
}

exports.postOrder = async (req, res) => {
  try{
    userId =  await User.findById(req.user._id);
    const userCart = await userId.populate('cart.items.productId').execPopulate();
    const products = userCart.cart.items.map(i => {
      return {quantity: i.quantity, productData: { ...i.productId._doc }};
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      products: products
    })
    await order.save();
    await req.user.clearCart();
    res.status(200).json({
      message: 'items order added',
      order: order
    });
  } catch (err) {
    console.log(err);
  }
}


exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    const creatorInfo = await User.findById(item.userId);
    res.status(200).json({
      message: 'items fetched',
      items: item,
      creator: creatorInfo
    })
  } catch (err) {
    console.log(err);
  }
}

exports.getAllItems = async (req, res) => {
  try {
    let itemsQuery = Item.find();
    if (+req.query.user) {
      itemsQuery = Item.find({userId: req.user.id});
    }
    // const pageSize = +req.query.pagesize;
    // const currentPage = +req.query.page;
    // if(pageSize && currentPage) {
    //   itemsQuery.skip(pageSize * (currentPage-1))
    //   .limit(pageSize).find({_id: req.user.id});
    // }
    const items = await itemsQuery;
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

exports.addToFavorites = async (req, res) => {
  try {
    productToFavorites =  await Item.findById(req.body.id);
    req.user.addToFavorites(productToFavorites);
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

exports.deleteFromFavorites = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const updatedFavorites = currentUser.favorites.items.filter(item => item._id != req.params.id)
    currentUser.favorites.items = updatedFavorites;
    currentUser.save();
    const detailedCart = await currentUser.populate('favorites.items').execPopulate();
    res.status(201).json({
      message: 'item was deleted from favorites',
      updatedFavorites: detailedCart.favorites
    })
  } catch (err) {
    console.log(err);
  }
}

exports.getFavorites = async (req, res) => {
  try {
    let currentUser =  await User.findById(req.user._id);
    const userFavorites = await currentUser.populate('favorites.items').execPopulate();
    res.status(201).json({
      message: 'item was added to cart',
      items: userFavorites.favorites
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
