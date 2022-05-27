const mongoose = require('mongoose');
const { promisify } = require('util');
const fs = require('fs');

const RegisteredUser = require('./userSchema');
const upload = require('../util/multer');

const AppError = require('../util/errorCreating');

const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

exports.createUser = catchAsync(async (req, res, next) => {
	// console.log(req.Image);
	// //console.log(req.body.image);
	// console.log('kyu nhi aa rhaa', req.body.phoneNumber, req.param);

	// var path = './uploads/' + req.body.phoneNumber + '/' + req.body.phoneNumber + '_profile.png';

	// var dir = './uploads/' + req.body.phoneNumber;
	// console.log(req.body.faceDesc);
	// if (!fs.existsSync(dir)) {
	// 	fs.mkdirSync(dir, { recursive: true });
	// }
	// fs.writeFile(path, req.body.image, (err) => {
	// 	console.log(err);
	// });
	const newUser = await RegisteredUser.create({
		name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		age: req.body.age,
		gender: req.body.gender,
		type: req.body.type,
		// Image: {
		// 	data: req.file,
		// 	contentType: 'image/png'
		// }
		Image: req.body.image
	});

	res.status(200).send({
		status: 'successful',
		data: {
			user: newUser
		}
	});
});

exports.getAllUsers = async (req, res) => {
	try {
		const allUser = await RegisteredUser.find();
		res.status(200).send({ status: 'successful', data: allUser });
	} catch (err) {
		res.status(500).send({ status: fail, error: err });
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
		res.status(200).send({ status: 'successful', data: user });
	} catch (err) {
		res.status(500).send({ status: fail, error: err });
	}
};
