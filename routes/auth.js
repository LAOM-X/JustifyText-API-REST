const router = require('express').Router();
const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


router.use(express.json());
router.post('/register', async (req, res) => {
    //validate data before
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(401).send(err);
    }
});

router.post('/token', async (req, res) => {
    //validate data before
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Email is not found');
    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
    return res.status(400).send('Invalid password');


    //create and assign a token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('Authorization','Bearer '+token).send({token : token});
    
});
module.exports = router;