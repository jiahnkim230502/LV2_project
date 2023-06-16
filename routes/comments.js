const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment.js");

router.get("/comments/:postid", async (req, res) => {
    var { postid } = req.params
    const allComments = await Comments.find({ "postid": postid });
    allComments.sort(
        function (prev, next) {
            if (prev.date > next.date) { return -1 }
            else if (prev.date == next.date) { return 0 }
            else if (prev.date < next.date) { return 1 }
        }
    )

    if (!allComments.length) {
        return res.status(200).json({
            "message": "댓글 없음"
        })
    } else {
        return res.status(200).json({ "posts": allComments })
    }
});


router.post("/comments/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password, content } = req.body;
    var date = new Date()
    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "댓글을 작성해 주세요."
        })
    } else {
        await Comments.create({ user, password, content, date, postid })
        return res.status(201).json({ "message": "댓글이 작성되었습니다." })
    }
})

router.put("/comments/:postid", async (req, res) => {
    var { postid } = req.params;
    var { user, password, content } = req.body;
    var date = new Date();


    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "수정할 댓글 내용을 입력해주세요."
        })
    } else {
        await Comments.updateOne({ user, password, content, date, postid })
        return res.status(201).json({ "message": "댓글이 수정되었습니다." })
    }
})

router.delete("/comments/:postid", async (req, res) => {
    var { postid } = req.params;
    var { user, password } = req.body;
    if (Comments.find({ "postid": postid, "user": user, "password": password })) {
        await Comments.deleteOne({ "user": user, "password": password })
        return res.status(200).json({
            "message": "댓글이 삭제되었습니다."
        })
    }
})


module.exports = router;