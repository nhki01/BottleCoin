const express = require('express');
const passport = require('passport');
const router = express.Router();
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    // if(req.isAuthenticated()){
        const sql = 'select * from machine';
        maria.query(sql, function(err, rows) {
            if(!err) {
                res.json(rows);
            } else {
                res.send("0");
            }
        });
    //   }else{
    //     // res.send('서버연결');
    //     res.render('sign/login');
    //   }
});

router.get('/:num', function(req, res, next) {
    const num = req.params.num;
    const sql = 'select * from machine where machine_num=?';
    maria.query(sql, [num], function(err, rows) {
        if(!err) {
            console.log(rows[0]);

            res.json(rows[0]);
        } else {
            res.send("0");
        }
    });
});

module.exports = router;