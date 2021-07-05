var argon2 = require('argon2');
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {

     if( 'user' in req.body && req.body.user != null &&
        'pass' in req.body && req.body.pass != null) {

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `SELECT u_id,given_name,family_name,username,email,password_hash
                            FROM users WHERE username = ?`;
            connection.query(query,[req.body.user], async function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){

                  let valid = await argon2.verify(rows[0].password_hash, req.body.pass);

                  if (valid) {
                      delete rows[0].password_hash;
                      req.session.user = rows[0];
                      res.json(rows[0]);
                  } else {
                      return res.sendStatus(401);
                  }

              } else {
                  res.sendStatus(401);
              }
            });
        });


    } else {
        res.sendStatus(400);
    }

});



router.post('/signup', async function(req, res, next) {

    if( 'user' in req.body && req.body.user != null &&
        'pass' in req.body && req.body.pass != null &&
        'email' in req.body &&
        'given_name' in req.body &&
        'family_name' in req.body) {


        let hash = await argon2.hash(req.body.pass);
        console.log(hash);

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `INSERT INTO users (given_name,family_name,username,password_hash,email)
                            VALUES (?,?,?,?,?);`;
            connection.query(query,[
                req.body.given_name,
                req.body.family_name,
                req.body.user,
                hash,
                req.body.email], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              res.end();
            });
        });



    } else {
        res.sendStatus(400);
    }

});


router.use(function(req, res, next) {
    if('user' in req.session){
        next();
    } else {
        res.sendStatus(401);
    }
});


router.post('/logout', function(req, res, next) {

    delete req.session.user;
    res.send();

});






module.exports = router;
