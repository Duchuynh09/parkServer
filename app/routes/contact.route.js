const express = require("express");
const contacts = require("../controllers/contact.controller.js");
const multer = require('multer')();
const router = express.Router();
router.route("/user")
   .get(contacts.findAllUser)
   .post(multer.any(),contacts.createUser);
router.route("/user/:id")
   .get(contacts.findOneUser)
router.route("/")
    .get(contacts.findAllPark)
// update park 
router.route("/:id")
    .put(contacts.updateArea)

module.exports = router;

