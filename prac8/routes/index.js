var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/result', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    } else {
      res.send("ok");
    }
  });
});

router.get('/actor', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }

    let query = "select first_name,last_name from actor;";

    connection.query(query, function (error, rows, fields) {
      connection.release();

      if (err) {
        res.status(500).send(error);
        return;
      }
      res.send(rows);
    });

  });
});


router.post('/actor', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }

    const reqActor = {
      first_name : req.body.first_name,
      last_name: req.body.last_name
    };

    let query = "INSERT INTO actor (first_name, last_name) VALUES ( ? , ? );";

    connection.query(query, [reqActor.first_name, reqActor.last_name],function (error, rows, fields) {
      connection.release();

      if (err) {
        res.status(500).send(error);
        return;
      }
      res.send(rows);
    });

  });
});

module.exports = router;
