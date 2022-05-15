const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: String
	},
	gender: { type: String },
	type: { type: String },
	Image: { data: Buffer, contentType: String }
});
const RegisteredUser = mongoose.model('RegisteredUser', userSchema);
module.exports = RegisteredUser;
