const mongoose = require("mongoose");

const commentScheama = new mongoose.Schema({
    user: {
        type: String
    },

    password: {
        type: String,
        select: false,
    },

    content: {
        type: String
    },

    date: {
        type: Date,
    },

    postid: {
        type: String,
    },
    __v: {
        type: Number,
        select: false
    }
})

module.exports = mongoose.model("Comments", commentScheama)