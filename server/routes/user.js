const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser");

router.use(bodyParser.json());

let User = require('../models/userModel');

router.route('/signup').post(async(req, res) => {
    try {
      const { email, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.route('/signin').post(async(req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign({ email: user.email, username : user.username }, 'rs8Hjjs&hbsg56');
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;