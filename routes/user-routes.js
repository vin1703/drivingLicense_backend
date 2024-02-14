const express = require('express');

const router = express.Router();

const fileUpload = require('../middleware/file-upload');

const userControllers =require( '../controllers/users-controllers')

router.post('/signup',userControllers.signup);

router.post('/login',userControllers.login);

router.patch('/ids/:uid',fileUpload.array('images',3),userControllers.updateId);

router.patch('/name/:uid',userControllers.updateName);

router.patch('/number/:uid',userControllers.updateNumber);

router.patch('/result/:uid',userControllers.updateResult);

router.patch('/email/:uid',userControllers.updateEmail);

router.patch('/address/:uid',userControllers.updateAddress);

module.exports = router;