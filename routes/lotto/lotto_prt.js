const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    const id = req.query.id;
    const num = req.query.num;
    if(!id || !num){
        const sql = 'select * from lotto_result where `1st_winner` IS NOT NULL order by `round` desc';
        maria.query(sql, function(err, rows) {
            if(!err) {
                console.log(rows);
                // res.render('lotto/lotto_list', { rows:rows });
                res.json(rows);
            } else {
                res.send("0");
            }
        });
    }else{
        var sql1 = 'insert into lotto_prt select ?, ? from dual where curdate() < (select lotto_date from lotto_result where round = ?);';
        var item1 = [id, num, num];
        sql1 = mysql.format(sql1, item1);
        var sql2 = 'UPDATE lotto_result SET total_prize = total_prize + 3000 WHERE `round`= ?;';
        sql2 = mysql.format(sql2, num);
        var sql3 = 'INSERT INTO `point`(returner_id, point_in_out, point_where, point_point) VALUES(?, FALSE, 1, -3000);';
        sql3 = mysql.format(sql3, id);
        var sql4 = 'UPDATE `user` SET `point` = `point`-3000 WHERE id=?;';
        sql4 = mysql.format(sql4, id);
        maria.query(sql1+sql2+sql3+sql4, function(err, rows) {
            if(!err) {
                console.log(rows[0]);
                if(rows[0].affectedRows == 0){
                    console.log('지난 이벤트');
                    res.send("0");
                }else if(rows[0].affectedRows > 0){
                    console.log(num+"회차 참여 완료");
                    res.send("1");
                }
                
            } else {
                console.log('이미 참여한 회원');
                res.send("0");
            }
        });
    }
})

// router.get('/', function(req, res, next) {
//     if(req.isAuthenticated()){
//         const sql = 'select * from lotto_result order by `round` desc';
//         maria.query(sql, function(err, rows) {
//             if(!err) {
//                 console.log(rows);
//                 // res.render('lotto/lotto_list', { rows:rows });
//                 res.json(rows);
//             } else {
//                 res.send("0");
//             }
//         });
//     }else{
//         console.log('로그인 되어 있지 않음');
//         res.redirect('/');
//     }
// });
// router.get('/:num', function(req, res, next) {
//     const num = req.params.num;
//     if(req.isAuthenticated()){
//         const sql = 'insert into lotto_prt select ?, ? from dual where curdate() < (select lotto_date from lotto_result where round = ?)';
//         maria.query(sql, [req.user.id, num, num], function(err, rows) {
//             if(!err) {
//                 console.log(num+"회차 참여 완료");
//                 res.redirect('/');
//             } else {
//                 console.log('이미 참여한 회원');
//                 res.redirect('/lotto');
//             }
//         })
//     }else{
//         console.log('로그인 되어 있지 않음');
//         res.redirect('/');
//     }
// });

module.exports = router;