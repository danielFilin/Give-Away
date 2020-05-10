const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgirdTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const transporter = nodemailer.createTransport(sendgirdTransport({
  auth: {
    api_key: process.env.SEND_GREED_PW
  }
}));

exports.addUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cart: {
        items: []
      }
    })
    await user.save();
    transporter.sendMail({
      to: user.email,
      from: 'filind85@gmail.com',
      subject: 'Signup succeeded!',
      html: '<h1>You signed up to take me!</h1>'
    })
    res.status(201).json({
      message: 'user was added',
    })
  } catch (err) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    res.status(500).json({
      status: 'fail',
      message: 'The email you entered exists in the system already!',
      user: user
    })
  }
}

exports.login = async(req, res) => {
  try {
    const logedUser = await User.findOne({email: req.body.email});
    if (!logedUser) {
      throw new Error ('user with such an email does not exist in the system');
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, logedUser.password);
    if (!isPasswordCorrect) {
      throw new Error ('The user entered an invalid password');
    }
    const token = jwt.sign({email: logedUser.email, userId: logedUser._id}, process.env.JWT_KEY, {expiresIn: '1h'});

    // provide the user ID of the currently loged in user to the req object
    const activeUser = await User.findById(logedUser._id)
    req.user = activeUser;
    let isAdmin = false;
    if (req.user.admin) {
      isAdmin = true;
    }
    res.status(200).json({
      message: 'user logged in successefully',
      token: token,
      expiresIn: 3600,
      userId: activeUser._id,
      admin: isAdmin
    })
  } catch (err) {
    res.status(401).json({
      message: 'you provided incorrect data',
    })
  }
}

exports.reset = async (req, res) => {
  try{
    const buffer = await crypto.randomBytes(32)
    if (!buffer) {
      throw new Error(err);
    }
    const token = buffer.toString('hex');
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      throw new Error ('Account with this email is not found');
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 36000000;
    await user.save();
    transporter.sendMail({
      to: user.email,
      from: 'filind85@gmail.com',
      subject: 'Password Reset',
      html: `<p>You requested to reset your password</p>
            <p>Follow this <a href="http://localhost:4200/auth/reset-password/${user.resetToken}/${user._id}">link</a> to reset password</p>`
    })
    res.status(200).json({
      message: 'A link to reset you password was sent to your email',
    })
  } catch (err) {
    res.status(401).json({
      message: 'your email does not exist in the system',
    })
  }
}

exports.postNewPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const user = await User.findOne({resetToken: token, _id: req.body.userId.toString(),  resetTokenExpiration: {$gt: Date.now()}});

    if (!user) {
      throw new Error ('wrong credentials or date expired');
    }

    const newPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(200).json({
      message: 'password was changed'
    })
  } catch (err) {
     res.status(401).json({
      message: 'Password was not reset',
    })
  }
}


