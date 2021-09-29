var express = require('express');
var session = require('express-session');
var path = require('path');
var router = express.Router();

const maria = require('../maria'); // 작성한 maria.js를 불러온다.
// connection 은 서버가 켜질 때 app.js 에서 수행되었다.

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    console.log('로그인 성공');
    res.render('index', {user:req.user});
  }else{
    // res.send('서버연결');
    res.render('sign/login');
  }
  // maria.query('select * from user', function(err, rows, fields) { 
  //   if(!err) { // 에러가 없다면
  //         if(req.session.user){
  //           console.log(req.session.user);
  //           res.render('index', req.session.user);
  //         }else{
  //           // res.send('서버연결');
  //           res.render('sign/login');
  //         }
  //       } else { // 에러가 있다면?
  //         console.log("err : " + err);
  //         res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
  //       }
  // })
});

module.exports = router;