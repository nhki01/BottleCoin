const express = require('express');
const router = express.Router();

const maria = require('../../maria');

router.get('/', function(req, res, next) {
    console.log(req.session);
    // if(req.session.user.user.user_state == 3){
        const sql = 'SELECT `user`.*, r.`rank` FROM `user`, (SELECT returner_id, SUM(bottle_count) AS sum_count, RANK() over(ORDER BY sum_count desc) AS rank FROM bottle GROUP BY returner_id) r WHERE `user`.id = r.returner_id';
        maria.query(sql, function(err, rows) {
            if(!err) {
                console.log(rows);
                res.render('admin/user_list', { rows: rows });
            } else {
                res.send("0");
            }
        });
        
    // }else{
    //     console.log('관리자가 아닙니다');
    //     res.redirect('/');
    // }
});

module.exports = router;