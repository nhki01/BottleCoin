const express = require('express');
const passport = require('passport');
// const session = require('express-session');
const router = express.Router();

const maria = require('../../maria');

router.get('/', function(req, res, next) {
    // let ses = req.session;
    // res.render('sign/login', {
    //     session : ses
    // });
    // res.render('sign/login');
    // res.redirect('/myinfo');
    if(req.isAuthenticated() && req.user){
        return res.json({ user: req.user });
        // return res.render('index', { user: req.user });
    }
    return res.json({ user: null });
    // }else {
    //     res.render('sign/login');
    // }
});

router.post('/', function(req, res, next) {
    if(req.isAuthenticated()){
        // req.session.save(function(){
        //     return res.redirect('/');
        // })
        return res.redirect('/');
    }
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.json(info);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.json({ user });
            // res.render('index', { user });
        });
    })(req, res, next);
    // const user = require('../../model/user/loginUser')(req.body);
    
    // const sql = 'SELECT `user`.*, r.`rank` FROM `user`, (SELECT returner_id, SUM(bottle_count) AS sum_count, RANK() over(ORDER BY sum_count desc) AS rank FROM bottle GROUP BY returner_id) r WHERE `user`.id = r.returner_id AND `user`.id=? AND `user`.pw=?';
    // console.log(req.session);
    // if(req.session.user){
    //     console.log('이미 로그인되어 있음');
    //     res.redirect('/myinfo');
    // }else{
    //     maria.query(sql, [user.id,user.pw], function(err, rows, fields) {
    //         // console.log(fields);
    //         if(!err) {
    //             if(rows.length === 0){
    //                 console.log('가입되지 않은 회원임');
    //                 res.send("0");
    //             }else{
    //                 const login_user = require('../../model/user/loginUser')(rows[0]);
    //                 // const id = JSON.stringify(rows[0].id).replace(/\"/g, "");
    //                 // const pw = JSON.stringify(rows[0].pw).replace(/\"/g, "");
    //                 req.session.user = {
    //                     user: login_user,
    //                     authoried: true
    //                 };
    //                 console.log(req.session.user);
    //                 console.log(rows);
    //                 // res.redirect('/');
    //                 res.render('index', req.session.user);
    //                 // res.json(rows[0]);
    //             }
    //         } else {
    //             console.log('에러 발생');
    //             res.render('sign/login');
    //         }
    //     })
    // }
});

module.exports = router;