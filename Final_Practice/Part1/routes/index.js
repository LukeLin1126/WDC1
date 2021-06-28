var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    } else {
      res.send("pong");
    }
  });
});

router.post('/search', function (req, res, next) {
  const reqParams = {
    size: req.body.size,
    date: req.body.date,
    rating: req.body.rating,
    facilities : req.body.facilities,
    flag : req.query.flag
  };

  if (reqParams.date) {
    let tmp = new Date(reqParams.date);
    reqParams.date = `${tmp.getFullYear()}-${tmp.getMonth()}-${tmp.getDate()}`;
  }

  let have_params = false;
  let params_count = 0;
  for (const reqParam in reqParams) {
    if (reqParams[reqParam] && reqParams[reqParam] !== '') {
      have_params = true;
      params_count ++;
      console.log(reqParam);
      break;
    }
  }

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    }

    let orQuery = `
      select b.room_id,size,facilities,name,description,r.street_address,u.username as booked_by
      from room
             left join booking b on room.room_id = b.room_id
             left join user u on b.user_id = u.user_id
             inner join room_location r on room.location = r.location_id
        ${reqParams.size ? 'where room.size =' + reqParams.size : 'where 1=2'}
        ${reqParams.date ? 'or DATE('+reqParams.date+') NOT BETWEEN b.start_date AND b.end_date' : ''}
        ${reqParams.rating ? 'or rating = ' + reqParams.rating : ''}
        ${reqParams.facilities ? "or facilities like '%" + reqParams.facilities + "%'" : ''} 
      ;
    `;

    let andQuery = `
      select b.room_id,size,facilities,name,description,r.street_address,u.username as booked_by
      from room
             left join booking b on room.room_id = b.room_id
             left join user u on b.user_id = u.user_id
             inner join room_location r on room.location = r.location_id
        ${reqParams.size ? 'where room.size =' + reqParams.size : 'where 1=1'}
        ${reqParams.date ? 'and DATE('+reqParams.date+') NOT BETWEEN b.start_date AND b.end_date' : ''}
        ${reqParams.rating ? 'and rating = ' + reqParams.rating : ''}
        ${reqParams.facilities ? "and facilities like '%" + reqParams.facilities + "%'" : ''} 
      ;
    `;

    let allQuery = `
      select room.room_id,size,facilities,name,description,r.street_address,u.username as booked_by
      from room
             left join booking b on room.room_id = b.room_id
             left join user u on b.user_id = u.user_id
             inner join room_location r on room.location = r.location_id
    `;




    let query;
    if (have_params === true) {
      if (reqParams.flag) {
        query = andQuery;
      } else {
        query = orQuery;
      }
    } else {
      query = allQuery;
    }


    connection.query(query, function (error, rows, fields) {
      connection.release();

      if (err) {
        // console.log(this.sql);
        res.status(500).send(error);
        return;
      }
      console.log(this.sql);
      res.send(rows);
    });


  });




});

module.exports = router;
