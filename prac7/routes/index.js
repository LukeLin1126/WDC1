var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
