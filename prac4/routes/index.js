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

  const $ = cheerio.load(fs.readFileSync('./public/index.html'));

  const color_array = ['red', 'yellow', 'green', 'blue'];

  router.get('/color.html', function (req, res, next) {

    let heading = $('h1');

    heading
        .css('color', color_array[count])
        .text(color_array[count].toString());

    count ++;

    if (count === color_array.length) {
      count = 0;
    }

    res.send($.html());


  });

})();


// task 3-3

(() => {

  const $ = cheerio.load(fs.readFileSync('./public/blank.html'));

  // create outer ul and set it class to container
  let newUl = $('<ul>').addClass('container');

  $('body').append(newUl);

  router.get('/log.html', function (req, res, next) {

    //create inner li which contains timestamps
    let newLi = $('<li>');

    newLi.text(new Date().toString());

    $('.container').append(newLi);

    res.send($.html());

  });

})();

// task 3-4
(() => {

  // flag for did first page visited or not,
  // if false, first page node visited.

  let flag = false;


  // first handler

  (() => {
    const $ = cheerio.load(fs.readFileSync('./public/blank.html'));


    $('body').append($('<a>').attr('href', '/main.html')
        .append($('<h1>').addClass('heading').text('Welcome')));


    router.get('/first.html', function (req, res, next) {

      if (flag === false) {
        res.send($.html());
      } else {
        res.redirect('/main.html');
      }

      flag = true;

    });
  })();


  // main handler
  (() => {
    const $ = cheerio.load(fs.readFileSync('./public/blank.html'));

    $('body').append(`<h1>My main site</h1>`);

    router.get('/main.html', function (req, res, next) {

      if (flag === false) {
        res.redirect('/first.html');
      }else {

        // delete all post
        $('p').remove();

        // random text
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

        $('body').append(`<p> ${Math.random().toString(36).substring(7)} </p>`);


        res.send($.html());
      }

    });

  })();




})();

// task 4-3

(() => {

  let json = [];

  router.get('/log-ro.json', function (req, res, next) {

    res.send(json);

  });

  router.get('/log.json', function (req, res, next) {
    json.push(new Date().toString());
    res.send(json);
  });

})();


// task 4-4

(() => {


  router.get('/contact.ajax', function (req, res, next) {

    res.send(`<a href = "mailto: a1743748@student.adelaide.edu.au">Send Email</a>`);

  });


  router.get('/search.ajax', function (req, res, next) {

    res.send(`<input type="text"><button>search</button>`);

  });



})();




module.exports = router;
