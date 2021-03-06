const express = require('express');
const router = express.Router();

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

// https://stackoverflow.com/a/31823325/14207562

const sqlBuilder = (params,flag) => {

  let conditions = [];
  let values = [];
  let result = {
    where: '',
    value: values
  };

  if (params.size && params.size !== '') {
    conditions.push("room.size = ?");
    values.push(params.size);
  }

  if (params.date && params.date !== '') {
    conditions.push(`room.room_id NOT IN (
            select room_id
            from booking 
                     where ? between start_date and end_date
        )`);
    values.push(params.date);
  }

  if (params.rating && params.rating !== '') {
    conditions.push('rating = ?');
    values.push(params.rating);
  }

  if (params.facilities && params.facilities !== '') {
    conditions.push('facilities like ?');
    values.push(`%${params.facilities}%`);
  }

  // have_params --> if the request body not empty

  if (flag === "true") {

    conditions.length ? result.where = conditions.join(' AND ') : result.where = '1';

  } else {

    conditions.length ? result.where = conditions.join(' OR ') : result.where = '1';

  }

  return result;

};

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
    // getMonth : An integer number, between 0 and 11, representing the month in the given date according to local time. 0 corresponds to January, 1 to February, and so on.
    reqParams.date = `${tmp.getFullYear()}-${tmp.getMonth()+1}-${tmp.getDate()}`; // 2021-06-16

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

    let baseQuery = `
        select room.room_id,size,facilities,name,description,rl.street_address
        from room
        inner join room_location rl on room.location = rl.location_id
        where 
    `;


    // part 6, pick the sql from part 5 depends on parameters and request body

    const sqlResult = sqlBuilder(reqParams, req_flag);

    const query = baseQuery + sqlResult.where;

    // part 7, execution of sql and serialized the database response and send back to frontend

    connection.query(query,sqlResult.value, function (error, rows, fields) {
      connection.release();

      if (error) {
        res.status(500).send(error);
      }
      console.log(error);
      console.log(this.sql);
      // console.log(rows);
      res.send(rows);

    });

  });



});

module.exports = router;
