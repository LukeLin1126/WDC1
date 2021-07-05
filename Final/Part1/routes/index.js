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

const sqlBuilder = (params,flag) => {

  let conditions = [];
  let values = [];
  let result = {
    where: '',
    value: values
  };

  if (params.category && params.category !== '') {
    conditions.push("c.category_name like ?");
    values.push(`%${params.category}%`);
  }

  if (params.platform && params.platform !== '') {
    conditions.push("p.platform_name like ?");
    values.push(`%${params.platform}%`);
  }

  if (params.features && params.features !== '') {
    conditions.push("features like ?");
    values.push(`%${params.features}%`);
  }

  if (params.price_start && params.price_start !== '' && params.price_end && params.price_end !== '') {
    conditions.push('price between ? and ?');
    values.push(params.price_start);
    values.push(params.price_end);
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
    category: req.body.category,
    platform: req.body.platform,
    features: req.body.features,
    price_start: req.body.price_start,
    price_end: req.body.price_end,
  };

  const req_flag = req.query.flag;

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


    // sample sql :
    // select game_id, game_name, category, platform, features, price, category_name, category_description, platform_name, platform_description
    // from game
    // inner join category c on game.category = c.category_id
    // inner join platform p on game.platform = p.platform_id
    // where c.category_name like '%action%'
    // and p.platform_name like '%PC%'
    // and features LIKE '%featrues%'
    // and price between '20' and '40'
    // ;


    let baseQuery = `
        select game_id, game_name, category, platform, features, price, category_name, category_description, platform_name, platform_description
        from game
        inner join category c on game.category = c.category_id
        inner join platform p on game.platform = p.platform_id
        where 
    `;


    // part 6, pick the sql from part 5 depends on parameters and request body

    const sqlResult = sqlBuilder(reqParams, req_flag);

    const query = baseQuery + sqlResult.where;

    // part 7, execution of sql and serialized the database response and send back to frontend

    connection.query(query,sqlResult.value, function (error, rows, fields) {
      connection.release();

      if (error) {
        // console.log(error);
        res.status(500).send(error);
      }
      // console.log(this.sql);
      // console.log(rows);
      res.send({
        data : rows,
        total : rows.length
      });

    });

  });



});

module.exports = router;
