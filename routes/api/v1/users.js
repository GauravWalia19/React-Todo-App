const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../../middleware/auth');

// User model
const User = require('../../../models/User');

/**
 * EndPoint: /api/v1/users/register
 * @method POST
 * @description route to register a new user
 * @access public
 **/
router.post('/register', (req,res)=>{
    const {name, email, password} = req.body;

    //server validation
    if(!name || !email || !password){ 
        return res.status(400).json({message: "Please enter all fields"});
    }

    //check for existing user
    User.findOne({email})
    .then(user => {
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const newUser = new User({
            name,
            email,
            password
        })

        // hashing the user password
        bcrypt.hash(newUser.password, 10, (err, hash)=> {
            if(err) throw err;
            newUser.password = hash;
            // saving the new user to the database
            newUser.save()
            .then(user => {
                // create a jwt token
                jwt.sign(
                    { id: user.id },
                    process.env.jwtSecret,
                    { expiresIn: 3600 },
                    (err, token)=>{
                        if(err){
                            throw err;
                        }
                        // send the response
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })
        });
    })
})

/**
 * EndPoint: /api/v1/users/login
 * @method POST
 * @description route to login with the user
 * @access public
 **/
router.post('/login', (req, res)=>{
    const {email, password} = req.body;

    // server validation
    if(!email || !password){
        return res.status(400).json({message: "Please enter all the required fields"})
    }

    // check for existing user
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(400).json({message: "User is not present"})
        }
        // validate password
        bcrypt.compare(password, user.password)
        .then(isMatch  => {
            if(!isMatch){
                return res.status(400).json({message: "Invalid Credentials"});
            }
            // create a jwt token
            jwt.sign(
                { id: user.id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
                (err, token)=>{
                    if(err){
                        throw err;
                    }
                    // send the response
                    res.json({
                        token,
                        user:{
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
        })
    })
})

/**
 * EndPoint: /api/v1/users
 * @method GET
 * @description route to get data of the user using jwt token
 * @access private
 **/
router.get('/', auth, (req, res)=>{
    // get the id from the access token and find the user in mongodb
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;