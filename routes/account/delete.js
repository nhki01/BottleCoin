const express = require('express');
const router = express.Router();

const maria = require('../../maria');

router.get('/', function(req, res, next) {
    
    if(req.isAuthenticated()){
        const sql = `delete from user where id=?`;
        maria.query(sql, [req.user.id], function(err, rows) {
            if(!err) {
                console.log('탈퇴 완료');
                req.session.destroy(function(err){
                    if(err){
                        console.log(err);
                    }
                    res.clearCookie('connect.sid');
                    res.redirect('/');
                });
            } else {
                res.send("0");
            }
        });
    }else{
        console.log('세션이 종료됨');
        res.redirect('/');
    }
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    maria.query(sql, id, function(err, rows) {
        if(!err) {
            console.log('탈퇴 완료');
            res.redirect('/');
        } else {
            res.send("0");
        }
    });
    
});

module.exports = router;