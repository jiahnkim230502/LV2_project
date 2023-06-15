const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    title : {
        type: String,
    },
    content : {
        type: String,
    },
    date:{
        type : Date
    },
    __v: {
        type: Number,
        select: false
    }
});

module.exports = mongoose.model("Posts", postSchema);