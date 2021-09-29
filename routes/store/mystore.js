const express = require('express');
const passport = require('passport');
const router = express.Router();
const maria = require('../../maria');

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        console.log(req.user);
        const sql = 'SELECT item.item_name, item_history.item_state FROM item, item_history WHERE item.item_code = item_history.item_history_code and item_history.returner_id=?';
        maria.query(sql, req.user.id, function(err, rows) {
            if(!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send("0");
            }
        });
      }else{
        // res.send('서버연결');
        res.render('sign/login');
      }
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    
    console.log(req.user);
    const sql = "SELECT item.item_name, item.item_price, date_format(item_history.item_date,'%Y-%m-%d') AS item_date, item_history.item_state FROM item, item_history WHERE item.item_code = item_history.item_history_code and item_history.returner_id=?";
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