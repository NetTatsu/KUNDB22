const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { id, psword: Napssword, confirmpsword, nickname, tel, email  } = req.body
    if (!id || !Napssword) return res.json({ status: "error", error: "아이디나 비밀번호를 입력해주세요" })
    if ( Napssword !== confirmpsword ) return res.json({ status: "error", error: "비밀번호가 일치하지 않습니다" })
    else {
        db.query('SELECT userid FROM member WHERE userid = ?', [id], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "중복되는 아이디 입니다"})
            else {
                const psword = await bcrypt.hash(Napssword, 8);
                db.query('INSERT INTO member SET ?', { userid: id, password: psword, name: nickname, phone: tel, email: email }, (error, results) => {
                    if (err) throw err;
                    return res.json({ status: "success", success: "회원가입이 완료 됐습니다" })
                })
            }
        })
    }
}
module.exports = register;