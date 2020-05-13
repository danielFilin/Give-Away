const Category = require('../models/category');
const User = require('../models/user');
const Item = require('../models/item');

exports.addCategory = async (req, res) => {
 try {
  const url = req.protocol + '://' + req.get('host');
  const category = new Category({
    name: req.body.name,
    imagePath: url + '/images/' + req.file.filename,
    routerLink: req.body.routerLink
  })
  const addedCategory = await category.save();

  res.status(200).json({
    message: 'category was added',
    category: addedCategory
  })
 } catch (err) {
     res.status(500).json({
      err: err,
      message: 'adding category failed'
    })
 }
}

exports.getCategories = async (req, res) => {
  try {
   const listOfCategories = await Category.find();
   res.status(200).json({
     message: 'category was added',
     categoryList: listOfCategories
   })
  } catch (err) {
      res.status(404).json({
       err: err,
       message: 'categories not found'
     })
  }
 }

 exports.getOneCategory = async (req, res) => {
  try {
   const category = await Category.findById(req.params.id);
   res.status(200).json({
     message: 'category was fetched',
     categoryList: category
   })
  } catch (err) {
      res.status(404).json({
       err: err,
       message: 'category was not found'
     })
  }
 }


 exports.deleteCategory = async (req, res) => {
  try {
   const deletedCategory = await Category.deleteOne({_id: req.params.id});
   if (deletedCategory.n > 0) {
    res.status(201).json({
      message: 'Category was deleted',
    })
  } else {
    throw new Error('Something went wrong!');
  }
} catch (err) {
      res.status(404).json({
       err: err,
       message: 'category failed to delete'
     })
  }
 }

 exports.editCategory = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    let imagePath;
    if (!req.file) {
      imagePath = req.body.imagePath;
    } else {
      imagePath = url + '/images/' + req.file.filename
    }
    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
      imagePath: imagePath,
      routerLink: req.body.routerLink
    });
    const updatedResult = await Category.updateOne({_id: req.params.id}, category);
  if (updatedResult.n > 0) {
    res.status(201).json({
      message: 'Category was deleted',
      updatedItem: updatedResult
    })
  } else {
    throw new Error('Something went wrong!');
  }
} catch (err) {
      res.status(404).json({
       err: err,
       message: 'category failed to delete'
     })
  }
 }

 exports.getUsers = async (req, res) => {
  try {
   const users = await User.find();
   res.status(200).json({
     message: 'users were fetched',
     users: users
   })
  } catch (err) {
      res.status(404).json({
       err: err,
       message: 'category was not found'
     })
  }
 }

 exports.deleteUser = async (req, res) => {
  try {
   const userId = req.params.id;
   await User.findByIdAndDelete(userId);
   res.status(200).json({
     message: 'user was deleted',
     userId: req.params.id
   })
  } catch (err) {
      res.status(404).json({
       err: err,
       message: 'something went wrong'
     })
  }
 }


 exports.getAllItems = async (req, res) => {
  try {
   const items = await Item.find();
   res.status(200).json({
     message: 'items were fetched',
     items: items
   })
  } catch (err) {
      res.status(404).json({
       err: err,
       message: 'items were not found'
     })
  }
 }




