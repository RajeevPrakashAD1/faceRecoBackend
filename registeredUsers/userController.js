const mongoose = require('mongoose');
const { promisify } = require('util');

const RegisteredUser = require('./userSchema');
const upload = require('../util/multer');

const AppError = require('../util/errorCreating');

const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

exports.createUser = catchAsync(async (req, res, next) => {
	console.log(req.file);
	const newUser = await RegisteredUser.create({
		name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		age: req.body.age,
		gender: req.body.gender,
		type: req.body.type,
		Image: {
			data: req.file.filename,
			contentType: 'image/png'
		}
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
