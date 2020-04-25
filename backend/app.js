const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const ItemRoutes = require('./routes/items');
const AuthRoutes = require('./routes/users');
const multer = require('multer');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const app = express();

mongoose.connect(`mongodb+srv://filind:${process.env.MONGO_ATLAS_PW}@cluster0-8zbzf.mongodb.net/item?retryWrites=true&w=majority`)
.then(() => {
  console.log('connected to DB');
})
.catch(() => {
  console.log('connection problems')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header', 'Authorization', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Headers', '*'); // do not think that it is good to allow all here, but not sure what should be allowed. Otherwise cannot post.
  res.setHeader('Access-Control-Allow-Methods',
  "GET, PUT, POST, DELETE, OPTIONS, PATCH");
  next();
});

app.use('', ItemRoutes);
app.use('', AuthRoutes);

module.exports = app;
