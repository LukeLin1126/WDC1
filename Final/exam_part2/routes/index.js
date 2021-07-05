var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {

  if('user' in req.session){
      // console.log(req.session.user);
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

          // console.log(this.sql);


          for(let row of rows){
            row.tags = row.tags.split(',');
        }
        res.json(rows); //send response
      });
  });

});


router.post('/addpost', function(req, res, next) {

    if( "title" in req.body && req.body.title !== null &&
        "content" in req.body && req.body.content !== null &&
        "tags" in req.body && req.session.user) {
        req.body.author = req.session.user;

        req.pool.getConnection( function(err,connection) {
            if (err) {
              res.sendStatus(500);
              // console.log(err);
              return;
            }
            var query = `INSERT INTO questions (author,title,content,timestamp) VALUES (?,?,?,NOW());`;
            connection.query(query, [req.body.author.u_id,req.body.title,req.body.content], function(err, rows, fields) {
                if (err) {
                    res.sendStatus(500);
                    // console.log(err);
                    connection.release(); // release connection if error
                    return;
                }

                // console.log(this.sql);


                // If successful, add tags
                // Build & run query
                // let tags = '';
                // for(const tag of req.body.tags){
                //     tags += `('${tag}',LAST_INSERT_ID()),`;
                // }
                // tags = tags.replace(/,$/,'');
                // var query = 'INSERT INTO question_tags (tagname,question) VALUES '+tags+';';

                const baseQuery = 'INSERT INTO question_tags (tagname,question) VALUES';

                const sqlBuilder = (tags) => {
                    let conditions = [];
                    let values = [];
                    let result = {
                        insertStatement: '',
                        value: values
                    };

                    for (const tag of tags) {
                        conditions.push(`(?,LAST_INSERT_ID())`);
                        values.push(tag);
                    }

                    conditions.length ? result.insertStatement = conditions.join(', ') : result.insertStatement = `('',LAST_INSERT_ID())`;

                    return result;
                };

                const buildSql = sqlBuilder(req.body.tags);

                let query = baseQuery + buildSql.insertStatement;


                connection.query(query,buildSql.value, function (err, rows, fields) {
                    connection.release(); // release connection

                    // console.log(this.sql);

                    if (err) {
                        res.sendStatus(500);
                        // console.log(err);
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
