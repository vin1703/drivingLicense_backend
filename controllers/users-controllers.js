const HttpError = require('../models/http-error');
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require('../utils/cloudinary');

const signup = async(req,res,next)=>{
    const {name,email,password,address,number} = req.body;
    let existingUser;
    try{
    existingUser = await user.findOne({email:email});
    }catch(err){
        const error = new HttpError('Signing-Up failed',500);
        return next(error);
    }
    if(existingUser){
        const error = new HttpError('User already exists',422);
        return next(error);
    }
    let hashedPassword;
    hashedPassword=  await bcrypt.hash(password,12)
    const createUser = new user({
        name,
        email,
        password:hashedPassword,
        address,
        number,
        photoURL:'_',
        panURL:'_',
        aadharURL:'_',
        status:'_',
        score:0
    });

    let token;
    token = jwt.sign({user:createUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    await createUser.save();
    res.status(201).json({user:createUser,token:token});
};

//login
const login = async(req,res,next)=>{
    const {email,password} = req.body;
    const findUser = await user.findOne({email:email});
    if(!findUser){
        const error = new HttpError('Invalid User',401);
        return next(error);
    }
    const isValidPassword = await bcrypt.compare(password,findUser.password);
    if(!isValidPassword){
        const error = new HttpError('Invalid User',401);
        return next(error);
    }

    let token;
    token = jwt.sign({user:findUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    res.status(200).json({User:findUser,token:token});
}



const updateId = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        if (!req.files || req.files.length !== 3) {
            throw new Error('Please provide 3 image files');
        }

        // Upload all images to Cloudinary asynchronously
        const uploadPromises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    reject(new Error('Failed to upload image to Cloudinary'));
                } else {
                    resolve(result.secure_url);
                }
            }).end(file.buffer);
        }));

        // Wait for all uploads to complete
        const imageUrls = await Promise.all(uploadPromises);

        // Find the user by ID
        let foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new HttpError('User not found', 404);
        }

        // Update the user document with the image URLs
        foundUser.photoURL = imageUrls[0] || foundUser.photoURL;
        foundUser.aadharURL = imageUrls[1] || foundUser.aadharURL;
        foundUser.panURL = imageUrls[2] || foundUser.panURL;

        // Save the updated user document
        await foundUser.save();

        let token;
        token = jwt.sign({user:foundUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

        // Respond with the updated user object
        res.status(200).json({ user: foundUser.toObject(),token:token });
    } catch (err) {
        // Handle errors
        console.error('Error updating user:', err);
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }
};




const updateName = async (req, res, next) => {
    const { name } = req.body;
    const userId = req.params.uid;

    let foundUser;
    try {
        foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new HttpError('User not found', 404);
        }
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }


    foundUser.name = name;

    try {
        await foundUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    let token;
    token = jwt.sign({user:foundUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    // Respond with the updated user object
    res.status(200).json({ user: foundUser.toObject(),token:token });
};
const updateEmail = async (req, res, next) => {
    const { email } = req.body;
    const userId = req.params.uid;

    let foundUser;
    try {
        foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new HttpError('User not found', 404);
        }
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }


    foundUser.email = email;

    try {
        await foundUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    let token;
    token = jwt.sign({user:foundUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    // Respond with the updated user object
    res.status(200).json({ user: foundUser.toObject(),token:token });
};
const updateNumber = async (req, res, next) => {
    const { number } = req.body;
    const userId = req.params.uid;

    let foundUser;
    try {
        foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new HttpError('User not found', 404);
        }
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }


    foundUser.number = number;

    try {
        await foundUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    let token;
    token = jwt.sign({user:foundUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    // Respond with the updated user object
    res.status(200).json({ user: foundUser.toObject(),token:token });
};
const updateResult = async (req, res, next) => {
    const { score,status } = req.body;
    const userId = req.params.uid;

    let foundUser;
    try {
        foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new HttpError('User not found', 404);
        }
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }


    foundUser.score = score;
    foundUser.status = status;

    try {
        await foundUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    let token;
    token = jwt.sign({user:foundUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    // Respond with the updated user object
    res.status(200).json({ user: foundUser.toObject(),token:token });
};


const updateAddress = async (req, res, next) => {
    const { address } = req.body;
    const userId = req.params.uid;

    let foundUser;
    try {
        foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new HttpError('User not found', 404);
        }
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }


    foundUser.address = address;

    try {
        await foundUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    let token;
    token = jwt.sign({user:foundUser},process.env.TOKEN_KEY,{expiresIn:'1h'});

    // Respond with the updated user object
    res.status(200).json({ user: foundUser.toObject(),token:token });
};

exports.signup = signup;
exports.login = login;
exports.updateId = updateId;
exports.updateName = updateName;
exports.updateEmail = updateEmail;
exports.updateNumber = updateNumber;
exports.updateAddress = updateAddress;
exports.updateResult = updateResult;
