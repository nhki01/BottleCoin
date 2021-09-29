const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    const num = req.query.num;
    const type = req.query.type;
    const count = req.query.count;
    
    if(count>0){
        var sql1 = 'UPDATE machine SET now_bottle=(now_bottle+?), storable_bottle=(storable_bottle-?) WHERE machine_num=?;';
        var item1 = [count, count, num];
        sql1 = mysql.format(sql1, item1);
        var sql2 = '';
        var point = 0;
        if(type == 0){
            point = 130 * count;
            sql2 = 'INSERT INTO bottle(returner_id, bottle_type, bottle_count, bottle_point) VALUES((SELECT id FROM machine WHERE machine_num=?), 0, ?, ?);';
        }else if(type == 1){
            point = 100 * count;
            sql2 = 'INSERT INTO bottle(returner_id, bottle_type, bottle_count, bottle_point) VALUES((SELECT id FROM machine WHERE machine_num=?), 1, ?, ?);';
        }
        var item2 = [num, count, point];
        sql2 = mysql.format(sql2, item2);
        var sql3 = 'INSERT INTO `point`(returner_id, point_in_out, point_where, point_point) VALUES((SELECT id FROM machine WHERE machine_num=?), TRUE, 0, ?);';
        var item3 = [num, point];
        sql3 = mysql.format(sql3, item3);
        var sql4 = 'UPDATE `user` SET `point` = `point`+? WHERE id=(SELECT id FROM machine WHERE machine_num=?);';
        var item4 = [point, num];
        sql4 = mysql.format(sql4, item4);
        
        maria.query(sql1+sql2+sql3+sql4, function(err, rows) {
            if(!err) {
                console.log(rows);
                res.send("1");
            } else {
                res.send("0");
            }
        });
    }else{
        res.send("0");
    }
    
});

module.exports = router;