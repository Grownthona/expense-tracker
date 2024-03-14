const express = require('express');

const router = express.Router();

const bodyParser = require("body-parser");


router.use(bodyParser.json());

let Catagory = require('../models/catagoryModel');

router.route('/addcatagory').post(async(req, res) => {

    const name = req.body.name;

    try {
      const newCatagory = new Catagory({name});
      await newCatagory.save();
      return res.status(201).json('Catagory created successfully' );
    } catch(err){
      return res.status(400).json(err);
    }
  });
  module.exports = router;