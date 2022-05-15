const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},

	password: { type: String, required: true, minlength: 8,select:false },
	confirmPassword: {
		type: String,
		required: true,
		minlength: 8,
        select:false,
		validate: {
			validator: function(er) {
				return er == this.password;
			},
			message: 'password dosent match'
		}
	},

	email: { type: String, required: true, validate: [ validator.isEmail, 'please provide a valid email' ] },

	photo: String,
    passwordChangedAt:{ type:Date,required:false},
    passwordResetToken:String,
    passwordResetExpires:Date
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.confirmPassword = undefined;
	next();
});

userSchema.methods.correctPassword = async function(userPassword,givenPassword) {
    return await bcrypt.compare(userPassword,givenPassword)
}


userSchema.methods.changePassword = async function(jwttimestamp) {
    if(this.passwordChangedAt){
        console.log('change password',this.passwordChangedAt);
        const TimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        console.log("timestamp ", jwttimestamp);

        return TimeStamp > jwttimestamp;

       
        
    }

    return false;

    
}


userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("resset tokenn crypto",resetToken);


    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    console.log(this.passwordResetToken,"pass r t hased");
    this.passwordResetExpires = new Date() + 10 * 60 * 60;


    return resetToken;

}









const User = mongoose.model('User', userSchema);

module.exports = User;
