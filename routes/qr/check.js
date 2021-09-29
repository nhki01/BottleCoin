const express = require('express');
const router = express.Router();
const maria = require('../../maria');

router.get('/:num', function(req, res, next) {
    const num = req.params.num;
    const sql = 'SELECT * FROM machine WHERE machine_num=? AND id IS NOT NULL';
    maria.query(sql, num, function(err, rows) {
        if(!err) {
            console.log(rows);
            if(rows.length > 0){
                res.send("1");
            }else{
                res.send("0");
            }
        } else {
            res.send("0");
        }
    });
});

module.exports = router;