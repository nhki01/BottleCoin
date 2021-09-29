const express = require('express');
const passpoart = require('passport');
const router = express.Router();

const maria = require('../../maria');

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        console.log(req.user);
        const sql = 'SELECT `user`.*, r.`rank` FROM `user`, (SELECT returner_id, SUM(bottle_count) AS sum_count, RANK() over(ORDER BY sum_count desc) AS rank FROM bottle GROUP BY returner_id) r WHERE `user`.id = r.returner_id AND `user`.id=?';
        maria.query(sql, [req.user.id], function(err, rows, fields) {
            if(!err) {
                console.log(rows);
                res.json(rows);
            
            } else {
                console.log();
                // console.log('에러 발생');
                // res.redirect('/');
            }
        });
    }else{
        console.log('세션이 종료됨');
        res.redirect('/');
    }
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
        
    const sql = 'SELECT `user`.*, r.`rank` FROM `user`, (SELECT returner_id, SUM(bottle_count) AS sum_count, DENSE_RANK() over(ORDER BY sum_count desc) AS rank FROM bottle GROUP BY returner_id) r WHERE `user`.id = r.returner_id AND `user`.id=?';
    maria.query(sql, [id], function(err, rows, fields) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        
        } else {
            console.log();
            // console.log('에러 발생');
            // res.redirect('/');
        }
    });
    
});

module.exports = router;