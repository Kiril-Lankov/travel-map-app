const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require:true,
            
        },
        title: {
            type:String,
            require: true,
            min: 3,

        },
        password: {
            type:String,
            required: true,
            min: 6,
        },

        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        lat: {
            type: Number,
            require: true
        },
        long: {
            type: Number,
            require: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);