const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createUserToken = async(user, code, req, res) => {
    const token = signToken(user._id);

    //cookie settings 
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    //remove user password from output
    user.password = undefined; 
    res.status(code).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.registerUser = async(req, res, next) => {
    //pass in request data here to create user from user schema 
        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm
            });

          createUserToken(newUser, 201, req, res);
    //if user can't be created, throw an error 
        } catch(err) {
            next(err);
    }
}