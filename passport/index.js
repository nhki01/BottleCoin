const LocalStrategy = require('passport-local').Strategy;
const maria = require('../maria');

exports.config = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('serialize');
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('deserialize');
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        passReqToCallback: true
    }, (req, id, pw, done) => {
        if(!id || !pw){
            return done(null, false, { message: "All fields are required."});
        }
        const sql = 'SELECT `user`.*, r.`rank` FROM `user`, (SELECT returner_id, SUM(bottle_count) AS sum_count, RANK() over(ORDER BY sum_count desc) AS rank FROM bottle GROUP BY returner_id) r WHERE `user`.id = r.returner_id AND `user`.id=? AND `user`.pw=?';
        maria.query(sql, [id,pw], function(err, rows, fields) {
            console.log(rows);
            var dbpw = rows[0].pw;
            if(!rows.length){
                done(null, false, { message: "가입되지 않은 회원" });
            }else{
                if(dbpw === pw) {
                    done(null, rows[0]);
                } else {
                    done(null, false, { message: "비밀번호 틀림" });
                }
            }
        })
    
    }));
};