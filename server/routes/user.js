const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser");

router.use(bodyParser.json());

let User = require('../models/userModel');
// Protected route
let userid = null;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }
  jwt.verify(token, 'rs8Hjjs&hbsg56', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err });
    }
    userid = decoded.userId;
    req.userId = decoded.userId; // Assuming your JWT payload includes a 'user' object
    next();
  });
};

router.route('/').get( verifyToken, async(req, res) => {
  // Access the decoded user object from the request
  let { user } = req.userId;
  console.log(userid);
  
  res.json({ message:  user });
});

router.route('/signup').post(async(req, res) => {
    try {
      const { email, username, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
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
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({  userId : user._id }, 'rs8Hjjs&hbsg56');
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