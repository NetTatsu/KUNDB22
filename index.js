const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const { time } = require("console");
const moment = require("moment");
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.urlencoded({extended:false})); //게시판 crud
app.use(express.json());
app.use('/read/public/images',express.static(path.join(__dirname,'/public/images'))); // 게시판 이미지
app.use('/edit/public/images',express.static(path.join(__dirname,'/public/images'))); // 게시판 이미지 수정
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth")); 


io.on("connection", (socket) => {
    socket.on("chatting", (data) => {
        const { name, msg } = data;
        io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss A")
        })
    })
})

// app.listen(PORT);
server.listen(PORT,()=> console.log(`server is running ${PORT}`))