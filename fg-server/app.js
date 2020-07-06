var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const firebase = require("firebase");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const config = {
  apiKey: "AIzaSyBddzYUuly2d-sJb5NMcY2FLQQgDArJ_KA",
  authDomain: "belajar-firebase-60140.firebaseapp.com",
  databaseURL: "https://belajar-firebase-60140.firebaseio.com",
  projectId: "belajar-firebase-60140",
  storageBucket: "belajar-firebase-60140.appspot.com",
  messagingSenderId: "964589686310"
};
firebase.initializeApp(config);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const userSchema = require('./graphql').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));


module.exports = app;
