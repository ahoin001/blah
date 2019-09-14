// routes/authorization-routes.js
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

// cloudinary
const cloudinary = require('../config/cloudinaryconfig');

// User model
const User = require("../models/User");

// Passport keeps track of logged in User, we access User with req.user
router.get("/user-page", ensureLogin.ensureLoggedIn(), (req, res) => {

  res.render("user-views/user-page", { theUser: req.user });

});

router.get("/user-page/:id/edit", ensureLogin.ensureLoggedIn(), (req, res) => {

  res.render("user-views/user-edit", { theUser: req.user });

});

router.post("/user/:id/update", cloudinary.single('image'), ensureLogin.ensureLoggedIn('/'), (req, res) => {

  console.log('========================================================================================================================================')
  console.log('Was redirected to update page')
  let newProfilePic;

  console.log("req.file", req.file)
  if (!req.file) {
    // If no image was provided, give it our default image
    newProfilePic = 'images/ppic.png';
  }
  else {
    newProfilePic = req.file.url;
  }

  // Find user in DB using current user ID , and update the username to what is in the form
  User
    // TODO :Can add whatever else user should be able to update here, 
    .findByIdAndUpdate(req.params.id, { username: req.body.username, profilepic: newProfilePic })
    .then(() => {
      console.log('========================================================================================================================================')
      console.log('Going to user page');
      res.redirect('/user-page');
    })
    .catch((err) => {
      console.log(`Error updating document`, err);
    })

});

router.post('/user/:id/deleteUser', (req, res, next) => {

  console.log('=====================================================================================');
  console.log(req.params.id);
  console.log('USER BING DELETED');
  console.log('=====================================================');
  console.log(req.params.id);

  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err);
    })
})

module.exports = router;