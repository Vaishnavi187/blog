const express = require('express');
const { registerusers, getalluser, loginuser } = require('../controllers/users');

const Router=express.Router()

//register user
Router.route('/register').post(registerusers);
Router.route('/allusers').get(getalluser);
Router.route('/login').post(loginuser);

module.exports=Router;