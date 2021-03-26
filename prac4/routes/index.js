var express = require('express');
var router = express.Router();
let path = require('path');

// jQuery for server
const cheerio = require('cheerio');
let fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// test 3-1
(() => {
  let date;

  router.get('/last.txt', function (req, res, next) {


    res.send(date);


    date = new Date().toString();


  });
})();

// test 3-2

(() => {

  let count = 0;

  // use index as template

  let $ = cheerio.load(fs.readFileSync('./public/index.html'));

  let color_array = ['red', 'yellow', 'green', 'blue'];

  router.get('/color.html', function (req, res, next) {


    $('h1').css('color', color_array[count]);

    count ++;

    if (count === color_array.length) {
      count = 0;
    }

    res.send($.html());


  });

})();


//task 3-3
//
// (() => {
//
//
//
// })();



module.exports = router;
