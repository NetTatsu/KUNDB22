const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const router = express.Router();
// 게시판 CRUD
const db = require("../routes/db-config");

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

router.get('/read/:postid', (req, res) => {
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

const crud = require("../controllers/crud");
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;