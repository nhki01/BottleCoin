const express = require('express');
const passport = require('passport');
const mysql = require('mysql');
const router = express.Router();
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    const id = req.query.id;
    const code = req.query.code;

    if(!id && !code){
        const sql = 'SELECT * FROM item';
        maria.query(sql, function(err, rows) {
            if(!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send("0");
            }
        });
    }else if(!code){
        const sql = 'SELECT * FROM item;SELECT * FROM user WHERE id=?;';
        maria.query(sql, id, function(err, rows) {
            if(!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send("0");
            }
        });
    }else{
        var sql1 = 'INSERT INTO item_history(returner_id, item_code) VALUES(?, ?);';
        var item1 = [id, code];
        sql1 = mysql.format(sql1, item1);
        var sql2 = 'INSERT INTO `point`(returner_id, point_in_out, point_where, point_point) VALUES(?, FALSE, 2, (-1)*(SELECT `item_price` FROM `item` WHERE `item_code` = ?));';
        sql2 = mysql.format(sql2, item1);
        var sql3 = 'UPDATE item SET item_count = item_count-1 WHERE item_code = ?;';
        sql3 = mysql.format(sql3, code);
        var sql4 = 'UPDATE `user` SET `point` = `point`-(SELECT `item_price` FROM `item` WHERE `item_code` = ?) WHERE id=?;';
        var item2 = [code, id];
        sql4 = mysql.format(sql4, item2);

        maria.query(sql1+sql2+sql3+sql4, function(err, rows) {
            if(!err) {
                console.log(rows);
                console.log('상품 교환 완료');
                res.send("1");
            } else {
                res.send("0");
            }
        });
    }  
});


module.exports = router;