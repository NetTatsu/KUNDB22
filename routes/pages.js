const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const router = express.Router();
// 게시판 CRUD
const db = require("../routes/db-config");
// 이미지 파일
const multer = require("multer");

router.get("/", loggedIn, (req, res) => {
    if (req.user) {
        res.render("index", { status:"loggedIn", user: req.user });
    } else {
        res.render("index", { status: "no", user: "nothing" });
    }
});
// router.get("/community", loggedIn, (req, res) => {
//     if (req.user) {
//         res.render("community", { status:"loggedIn", user: req.user });
//     } else {
//         res.render("community", { status: "no", user: "nothing" });
//     }
// });
router.get("/profile", loggedIn, (req, res) => {
    if (req.user) {
        res.render("profile", { status:"loggedIn", user: req.user });
    } else {
        res.render("profile", { status: "no", user: "nothing" });
    }
});

router.get("/editProfile", loggedIn, (req, res) => {
    if (req.user) {
        res.render("editProfile", { status:"loggedIn", user: req.user });
    } else {
        res.render("editProfile", { status: "no", user: "nothing" });
    }
});

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public" });
});
router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public/" });
});

router.get("/logout", logout)

// 게시판 CRUD
router.get("/community", loggedIn, (req, res) => {
    db.query('SELECT * FROM post', (error, results) => {
        if(error) {
            throw error;
        } else if(req.user) {
            res.render('community', {results:results, status:"loggedIn", user: req.user});
        } else {
            res.render('community', {results:results, status: "no", user: "nothing"});
        }
    })
});

router.get("/create", loggedIn, (req, res) => {
    db.query('SELECT * FROM post', (error, results) => {
        if(error) {
            throw error;
        } else if(req.user) {
            res.render('create', {results:results, status:"loggedIn", user: req.user});
        } else {
            res.render('create', {results:results, status: "no", user: "nothing"});
        }
    })
});

router.get('/edit/:postid', (req, res) => {
    const postid = req.params.postid;
    db.query('SELECT * FROM post WHERE postid=?', [postid], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('edit', {post:results[0], status:"loggedIn", user: req.user});
       } 
    })
})

router.get('/delete/:postid', (req, res) => {
    const postid = req.params.postid;
    db.query('DELETE FROM post WHERE postid = ?', [postid], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/community');
       } 
    }) 
})
// 게시글 상태
router.get('/state/:postid', (req, res) => {
    const postid = req.params.postid;
    const state = "구인완료"
    const userid = req.body.nickname;
    db.query('UPDATE post SET ? WHERE postid= ?', [{ state: state }, [postid]], (error, results) => {
        db.query('UPDATE member point = point+1 WHERE=?', [userid], (error, results) =>{
            console.log(userid);
        })
        if (error) {
            throw error;
        } else {
            res.redirect('/community');
       } 
    }) 
})

router.get('/read/:postid', loggedIn, (req, res) => {
    const postid = req.params.postid;
    db.query('SELECT * FROM post WHERE postid = ?', [postid], (error, results) => {
        if (error) {
            throw error;
        } else if(req.user) {
            res.render('read', {post:results[0], status:"loggedIn", user: req.user});
       } else {
        res.render('read', {post:results[0], status: "no", user: "nothing"});
      }
    })
})

// 채팅방 

router.get('/chat/:postid', loggedIn, (req, res) => {
    const postid = req.params.postid;
    db.query('SELECT * FROM post WHERE postid=?;' + 'SELECT * FROM chatroom;' ,[postid, []] ,(error, results) => {
        const [postid , chatroom] = results
        if (error) {
            throw error;
        } else if(req.user) {
            res.render('chat', {chatroom:chatroom, post:postid[0], status:"loggedIn", user: req.user});
       } else {
        res.render('chat', {chatroom:chatroom, post:postid[0], status: "no", user: "nothing"});
      }
   })
    
})

router.get("/chatroom", loggedIn, (req, res) => {
    db.query('SELECT * FROM chatroom', (error, results) => {
        if(error) {
            throw error;
        } else if(req.user) {
            res.send(results)
        } else {
            res.send(results)
        }
    })
});

// 이미지

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg' : '.jpeg',
            'image/jpg' : '.jpg',
            'image/png' : '.png',
            'image/gif' : '.gif',
        }
      cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
  })

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cd) => {
        if(file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif') {
            cd(null, true);
        } else {
            cd(null, false);
            req.fileError = '파일 형식이 유효하지 않습니다';
        }
    }
})

const crud = require("../controllers/crud");
router.post('/save', upload.single('image'), crud.save);
router.post('/update', upload.single('image'), crud.update);
//채팅방
router.post('/chatsave', crud.chatsave);

module.exports = router;