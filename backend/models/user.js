const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [{productId: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
    quantity: {type: Number, required: true}
    }
  ]
  }
});

userSchema.methods.addToCart = function(item) {
  console.log('here');
  const cartProductIndex = this.cart.items.findIndex( cartProduct => {
    return cartProduct.productId.toString() === item._id.toString();
  })

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: item._id,
      quantity: newQuantity
    })
  }

  const updatedCart = {
    items: updatedCartItems
  }

  this.cart = updatedCart;
  return this.save();

}

module.exports = mongoose.model('User', userSchema);
