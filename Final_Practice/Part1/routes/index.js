var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test db connection
router.get('/ping',function (req,res,next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('pong');
    }
  });
});

router.post('/search', function (req, res, next) {

  // part 1, receive the request body information including -- size, date, rating, facilities
  const reqParams = {
    size: req.body.size,
    date: req.body.date,
    rating: req.body.rating,
    facilities: req.body.facilities,
  };

  const req_flag = req.query.flag;

  // part 2, format the date
  if (reqParams.date) {

    let tmp = new Date(reqParams.date);

    reqParams.date = `${tmp.getFullYear()}-${tmp.getMonth()}-${tmp.getDate()}`; // 2021-06-16

  }

  // part 3, check the parameters received from part 1 is not empty
  let have_params = false;
  let params_count = 0;
  for (const key in reqParams) {
    if (reqParams[key] && reqParams[key] !== '') {
      have_params = true;
      params_count++;
    }
  }

  // part 4, create a db connection from req.pool
  req.pool.getConnection(function (err, connection) {

    // error handling
    if (err) {
      res.status(500).send(err);
    }

    // part 5, construct 3 different type of sql -- OR query, ANd query, Fetch all,

    // OR query
    const orQuery = `

        select b.room_id,size,facilities,name,description,rl.street_address,u.username as booked_by
        from room
         left join booking b on room.room_id = b.room_id
         left join user u on b.user_id = u.user_id
         inner join room_location rl on room.location = rl.location_id
         ${reqParams.size ? 'where room.size = ' + reqParams.size : 'where 1=2'}
         ${reqParams.date ? 'or DATE(' + reqParams.date + ') not between b.start_date and b.end_date' : ''}
         ${reqParams.rating ? 'or rating =' + reqParams.rating : ''}
         ${reqParams.facilities ? "or facilities like '%" + reqParams.facilities + "%'" : ''};
    
    `;

    // AND query

    const andQuery = `

        select b.room_id,size,facilities,name,description,rl.street_address,u.username as booked_by
        from room
         left join booking b on room.room_id = b.room_id
         left join user u on b.user_id = u.user_id
         inner join room_location rl on room.location = rl.location_id
         ${reqParams.size ? 'where room.size = ' + reqParams.size : 'where 1=1'}
         ${reqParams.date ? 'and DATE(' + reqParams.date + ') not between b.start_date and b.end_date' : ''}
         ${reqParams.rating ? 'and rating =' + reqParams.rating : ''}
         ${reqParams.facilities ? "and facilities like '%" + reqParams.facilities + "%'" : ''};
    
    `;

    let allQuery = `
      select room.room_id,size,facilities,name,description,r.street_address,u.username as booked_by
      from room
             left join booking b on room.room_id = b.room_id
             left join user u on b.user_id = u.user_id
             inner join room_location r on room.location = r.location_id
    `;



    // part 6, pick the sql from part 5 depends on parameters and request body

    let query;
    // have_params --> if the request body not empty
    if (have_params === true) {
      if (req_flag) {
        query = andQuery;
      } else {
        query = orQuery;
      }
    } else {
      query = allQuery;
    }

    // part 7, execution of sql and serialized the database response and send back to frontend

    connection.query(query, function (error, rows, fields) {
      connection.release();

      if (error) {
        res.status(500).send(error);
      }

      console.log(this.sql);
      // console.log(rows);
      res.send(rows);

    });



  });



});

module.exports = router;
