const express = require('express');
const router = express.Router();
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        const sql = 'SELECT * FROM `bottle` WHERE returner_id=?';
        maria.query(sql, [req.user.id], function(err, rows) {
            if(!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send("0");
            }
        });
    } else {
        console.log('세션이 종료되었습니다.');
        res.redirect('/');
    }
    
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const sql = 'SELECT * FROM `bottle` WHERE returner_id=?';
    maria.query(sql, id, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        } else {
            res.send("0");
        }
    });
});

module.exports = router;