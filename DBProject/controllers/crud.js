const db = require("../routes/db-config");

exports.save = (req, res) => {
    const title = req.body.title;
    const category = req.body.category;
    const address = req.body.address;
    const contents = req.body.contents;
    const userid = req.body.userid;

    db.query('INSERT INTO post SET ?',
    { title: title, category: category, address: address, contents: contents, userid: userid }
    , (error, results) => {
        if(error){
            console.log(error);
        } else {
            res.redirect('community');
        }
    }) 
}

exports.update = (req, res) => {
    const postid = req.body.postid;
    const title = req.body.title;
    const category = req.body.category;
    const address = req.body.address;
    const contents = req.body.contents;
    db.query('UPDATE post SET ? WHERE postid= ?', [{ title:title, category:category, address:address, contents:contents }, postid]
    , (error, results) =>{
    if(error){
        console.log(error);
    } else {
        res.redirect('/community');
    }
    })
}
