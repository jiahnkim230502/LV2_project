const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    nickname: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type : Date
    },
    __v: {
        type: Number,
        select: false
    }
});

module.exports = mongoose.model("Users", userSchema);