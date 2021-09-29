const express = require('express');
const router = express.Router();
const maria = require('../../maria');

router.get('/:num/:id', function(req, res, next) {
    const num = req.params.num;
    const id = req.params.id;
    const sql = 'UPDATE machine SET id=? WHERE machine_num=?'
    maria.query(sql, [id, num], function(err, rows) {
        if(!err) {
            console.log(rows);
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

router.get('/:num', function(req, res, next) {
    const num = req.params.num;
    const sql = 'UPDATE machine SET id=null WHERE machine_num=?'
    maria.query(sql, num, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

module.exports = router;