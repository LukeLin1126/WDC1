var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// task 1.1
(()=>{
  router.get('/brew',function (req, res, next) {

    const teaResponse = "A delicious cup of tea!";

    if (req.query.drink === "tea") {
      res.send(teaResponse);
    }else if (req.query.drink === "coffee") {
      res.status(418).send();
    } else {
      res.status(400).send();
    }

  });
})();


// task 1.2
(()=>{

  let message = [];
  let index = 0;

  router.post('/pass-it-on', function (req, res, next) {


    console.log(req.body.message);

    if (req.body.message === "" || req.body.message === undefined || req.body.message === null) {
      res.status(400).send();
    } else {

      message.push(req.body.message);

      if (index === 0) {
        res.send("first");
      } else {
        res.send(message[index-1]);
      }

      index++;

    }


  });
})();

// task 1.3

(()=>{
  router.post('/combine', function (req, res, next) {

    // console.log(req.body.lines);

    let resString = '';

    for (const line of req.body.lines) {
      resString += (line + req.body.suffix + '\n');
    }

    res.send(resString);
  });
})();


//task 1.4

(()=>{

  let userArray = [];

  router.post('/users/addpost', function (req, res, next) {
    userArray.push(req.body);
    res.send();
  });

  router.get('/users/getposts', function (req, res, next) {

    const numbers = req.query.n;

    let tempArray = [];

    // console.log(numbers);

    // task 1.5
    if (req.query.n) {
      for (let i = 0; i < parseInt(numbers) && i < userArray.length; i++) {
        tempArray.push(userArray[i]);
      }
      res.send(tempArray);
    } else {
      res.send(userArray);
    }

    // res.send(userArray);



  });

  router.get('/users/getposts/id/:id', function (req, res, next) {

    const id = req.params.id;
    if (id && id < userArray.length) {
      res.send(userArray[id]);
    } else {
      res.send(userArray);
    }
  });

})();

module.exports = router;
