const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");

router.get("/posts", async (req, res) => {
    const allPosts = await Posts.find();
    allPosts.sort(
        function (prev, next) {
            if (prev.date > next.date) { return -1 }
            else if (prev.date == next.date) { return 0 }
            else if (prev.date < next.date) { return 1 }
        }
    )

    if (!allPosts.length) {
        return res.status(200).json({
            "message": "게시글 없음"
        })
    } else {
        return res.status(200).json({ "posts": allPosts })
    }
});

// 게시글 1개 가져오기
router.get("/posts/:postid", async (req, res) => {
    const { postid } = req.params
    const postfind = await Posts.findOne({ "_id": postid });
    if (postfind) {
        return res.status(200).json(
            { "선택": postfind }
        )
    }


});

router.post("/posts", async (req, res) => {
    var { user, password, title, content } = req.body;

    if (user, password, title, content) {
        var date = new Date()

        await Posts.create({ user, password, title, content, date })
        return res.status(201).json({ "message": "게시글이 작성되었습니다." })
    }
})

router.put("/posts/:postid", async (req, res) => {
    var { postid } = req.params;
    var { user, password, title, content } = req.body;
    const existPost = await Posts.find({ "_id": postid, "password": password });
    if (existPost.length) {
        var date = new Date();
        await Posts.updateOne({ user, password, title, content, date });
        return res.status(200).json({
            "message": "수정 완료!"
        })
    } else {
        return res.status(400).json({
            "error message": "비밀번호 불일치!"
        });
    }
})

router.delete("/posts/:postid", async (req, res) => {
    var { postid } = req.params;
    var { password } = req.body;
    const existPost = await Posts.find({ "_id": postid, "password": password });
    if (existPost.length) {
        await Posts.deleteOne({ "_id": postid, "password": password });
        return res.status(200).json({
            "message": "삭제 완료!"
        })
    } else {
        return res.status(400).json({
            "error message": "비밀번호 불일치!"
        })
    }
})


module.exports = router;