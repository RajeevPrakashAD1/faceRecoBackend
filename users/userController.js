const mongoose = require('mongoose');
const {promisify} = require('util');

const User = require('./userSchema');
const jwt = require('jsonwebtoken');
const AppError = require('../util/errorCreating');

const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

exports.createUser = catchAsync(async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
        passwordChangedAt:req.body.passwordChangedAt,
		confirmPassword: req.body.confirmPassword
	});
	const token = jwt.sign({ id: newUser._id }, 'my-secret-dskfjkdasl', {
		expiresIn: '90d'
	});
	res.status(200).send({
		status: 'successful',
		data: {
			user: newUser,
			
		},
        token
	});
});

exports.getAllUsers = async (req, res) => {
	try {
		const allUser = await User.find();
		res.status(200).send({ status: 'successful', data: allUser });
	} catch (err) {
		res.status(500).send({ status: fail, error: err });
	}
};
