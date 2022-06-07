const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { id, psword } = req.body; 
    if (!id || !psword) return res.json({ status: "error", error: "아이디나 비밀번호를 입력해주세요" });
    else {
        db.query('SELECT * FROM member WHERE userid= ?', [id], async (Err, result) => {
            if (Err) throw Err;
            if ( !result.length || !await bcrypt.compare(psword, result[0].password)) return res.json({ status: "error",
            error: "아이디나 비밀번호를 확인해주세요"})
            else {
                const token = jwt.sign({ id: result[0].userid}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({status:"success", success:"로그인 되었습니다"})
            }
        })
    }
}

module.exports = login;