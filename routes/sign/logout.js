const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    req.logout();
    req.session.save(() => {
        res.redirect('/');
    })
    // if(req.session.user){
        
    //     req.session.destroy(function(err){
    //         if(err) throw err;
    //         res.clearCookie('connect.sid');
    //         res.redirect('/');
    //         // res.render('sign/login', { authoried: false });
    //     });
    // }else{
    //     console.log('로그인 되어 있지 않음');
    //     res.redirect('login');
    // }
});

module.exports = router;