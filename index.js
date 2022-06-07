const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
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
app.listen(PORT);