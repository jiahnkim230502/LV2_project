const mongoose = require("mongoose");

const commentScheama = new mongoose.Schema({
    password: {
        type: String,
        select: false,
    },

    content: {
        type: String
    },

    updatedAt: {
        type: Date,
    },

    postId: {
        type: String,
    },

    userId: {
        type: String,
    },
    __v: {
        type: Number,
        select: false
    }
})

module.exports = mongoose.model("Comments", commentScheama)