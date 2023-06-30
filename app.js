const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');
const userRouter = require("./routes/users.js");
require("dotenv").config();

const connect = require('./schemas');

connect();

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!");
});

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api", [postsRouter, commentsRouter, userRouter]);

app.get('/', (req, res) => {
    res.send("페이지 시작");
});