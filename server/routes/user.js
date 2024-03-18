const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser");

router.use(bodyParser.json());

let User = require('../models/userModel');
const checkLogin = require('../middlewares/checkLogin');

router.route('/').get(checkLogin, async(req, res) => {
  const data = req.userId;
  console.log(data);
  res.json({data});
});

router.route('/signup').post(async(req, res) => {
    try {
      const { email, username, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if(password === null || password.trim()===''){
        return res.status(401).json({ message: 'Incorrect password' });
      }
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail= emailRegex.test(email);

      if (!isValidEmail) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      // Find user by email
      const user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Check if password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        //console.log(user._id);
        const userIdString = user._id.toString();
        console.log(userIdString);

        const token = jwt.sign({ userId : userIdString }, 'rs8Hjjs&hbsg56');
        
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