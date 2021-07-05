var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {

  if('user' in req.session){
      console.log(req.session.user);
  }


  req.pool.getConnection( function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var query = `SELECT  q_tags.tags,
                          users.given_name AS author,
                          questions.title,
                          questions.content,
                          questions.timestamp,
                          questions.q_id,
                          IFNULL(q_up.tally,0) AS upvotes
                  FROM questions INNER JOIN users ON questions.author = users.u_id
                  LEFT JOIN q_tags ON q_tags.question = questions.q_id
                  LEFT JOIN q_up ON q_up.question = questions.q_id;`;
      connection.query(query, function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          return;
        }
        for(let row of rows){
            row.tags = row.tags.split(',');
        }
        res.json(rows); //send response
      });
  });

});


router.post('/addpost', function(req, res, next) {

    if( "title" in req.body && req.body.title != null &&
        "content" in req.body && req.body.content != null &&
        "tags" in req.body ) {
        req.body.author = req.session.user;

        req.pool.getConnection( function(err,connection) {
            if (err) {
              res.sendStatus(500);
              return;
            }
            var query = `INSERT INTO questions (author,title,content,timestamp) VALUES (?,?,?,NOW());`;
            connection.query(query, [req.body.author,req.body.title,req.body.content], function(err, rows, fields) {
                if (err) {
                    res.sendStatus(500);
                    connection.release(); // release connection if error
                    return;
                }

                // If successful, add tags
                // Build & run query
                let tags = '';
                for(tag of req.body.tags){
                    tags += `('${tag}',LAST_INSERT_ID()),`
                }
                tags = tags.replace(/,$/,'');
                var query = 'INSERT INTO question_tags (tagname,question) VALUES '+tags+';';
                connection.query(query, [req.body.author,req.body.title,req.body.content], function(err, rows, fields) {
                    connection.release(); // release connection
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    res.end(); //send response
                });
            });
        });

    } else {
        res.sendStatus(400);
    }


});


module.exports = router;
