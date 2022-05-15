const mongoose = require('mongoose');
const { promisify } = require('util');

const User = require('./../users/userSchema');
const jwt = require('jsonwebtoken');
const AppError = require('../util/errorCreating');
// const sendEmail = require('../util/sendEmail');

const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) return next(new AppError('please provide email and password'));

	try {
		const user = await User.findOne({ email: email }).select('+password');

		if (user) {
			const correct = user.correctPassword(user.password, password);

			if (!user || !correct) {
				return next(new AppError('Inorrect email or password', 401));
			} else {
				const check_password = await user.correctPassword(password, user.password);

				if (check_password) {
					const token = jwt.sign({ id: user._id }, 'my-secret-dskfjkdasl', {
						expiresIn: '90d'
					});
					return res.status(200).send({
						email,
						password,
						token
					});
				} else {
					res.status(400).send({ error: ' password doesnt match' });
				}
			}
		} else {
			return res.status(400).send({ error: 'No user exist' });
		}
	} catch (err) {
		res.send({
			status: 'fail',
			error: err
		});
	}
};

exports.protect = async (req, res, next) => {
	let token;

	//console.log(req.headers);

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	//console.log(token);

	if (!token) {
		return new AppError('not authorised');
	}

	console.log(process.env.JWT_SECRET);

	const decoded = await promisify(jwt.verify)(token, 'my-secret-dskfjkdasl');

	console.log(decoded, 'decoded');

	const freshUser = await User.findOne({ _id: decoded.id });
	console.log('freshUser', freshUser);

	if (!freshUser) {
		return new AppError('User no longer exist', 401);
	}

	const changed = await freshUser.changePassword(decoded.iat);
	console.log('changed', changed);
	if (changed) {
		return new AppError('passsword changed plz login again');
	}

	console.log('password not changed');

	next();
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError(' sorry user didnt exist'));
	}

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });
	next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	console.log('reset password called');
	next();
});
