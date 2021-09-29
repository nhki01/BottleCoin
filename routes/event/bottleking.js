const express = require('express');
const router = express.Router();
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    const sql = 'SELECT `user`.`id`, `user`.`name`, r.`rank`, r.`sum_count` FROM `user`, (SELECT returner_id, SUM(bottle_count) AS sum_count, DENSE_RANK() over(ORDER BY sum_count desc) AS `rank` FROM bottle GROUP BY returner_id) r WHERE `user`.id = r.returner_id ORDER BY rank';
    maria.query(sql, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        } else {
            res.send("0");
        }
    });
});

module.exports = router;