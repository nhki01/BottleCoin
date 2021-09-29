const express = require('express');
const multer = require('multer');
const router = express.Router();
const _storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: _storage });

const maria = require('../../maria');

// router.get('/:id', function(req, res, next) {
//     const id = req.params.id;
//     if(req.isAuthenticated()){
//         res.json(req.user);
//     } else {
//         console.log('세션이 종료됨');
//         res.redirect('/');
//     }
// });

router.post('/', upload.single('img'), function(req, res, next) {
    // res.json(req.file);
    // console.log(req.file);
    const user = require('../../model/user/updateUser')(req.body);
    user.id = req.user.id;
    user.profile_img = 'profile.png';
    console.log(user);
    const sql = `UPDATE user set pw=?, name=?, tel=? where id=?`;
    if(req.isAuthenticated()){
        maria.query(sql, [user.pw, user.name, user.tel, user.id], function(err, rows) {
            if(!err) {
                console.log(rows);
                req.user = user;
                res.json(user);
            } else {
                res.send("0");
            }
        })
    }else{
        console.log('세션이 종료됨');
        res.redirect('/');
    }
});

router.get('/:id', upload.single('img'), function(req, res, next) {
    const id = req.params.id;
    const pw = req.query.pw;
    const name = req.query.name;
    const tel = req.query.tel;
    
    const sql = `UPDATE user set pw=?, name=?, tel=? where id=?`;
    maria.query(sql, [pw, name, tel, id], function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json("1");
        } else {
            res.send("0");
        }
    })
});

module.exports = router;