const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        lastName: {
            type: String,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function validate(email) {
                    if (!validator.isEmail(email)) {
                        throw new Error('Email not valid');
                    }
                },
                message: "Email Not Valid"
            }

        },
        password: {
            type: String,
            required: true,
            validate(password) {
                if (!validator.isStrongPassword(password)) {
                    throw new Error('Password Requirements Not met');
                }
            },
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
