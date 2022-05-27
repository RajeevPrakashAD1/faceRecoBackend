const mongoose = require('mongoose');
const validator = require('validator');

const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	phoneNumber: {
		type: String,

		unique: true
	},
	age: {
		type: String
	},
	gender: { type: String },
	type: { type: String },
	Image: { type: Buffer }
});
const RegisteredUser = mongoose.model('RegisteredUser', userSchema);
module.exports = RegisteredUser;
