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


// task 4-2

(() => {

  let count = 0;


  const color_array = ['red', 'yellow', 'green', 'blue'];

  router.get('/color.txt', function (req, res, next) {



    if (count === color_array.length) {
      count = 0;
    }

    res.send(color_array[count]);

    count ++;


  });

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


// task 4-5

(() => {

  // flag for check did /accept has been access before or not.
  let flag = false;

  router.get('/accept', function (req, res, next) {

    flag = true;
    res.status(200);
    res.send();

  });

  router.get('/content.ajax', function (req, res, next) {

    if (flag === false) {
      res.status(403);
      res.send();
    } else {
      res.send(`
        <p>paragraph 1</p>
        <p>paragraph 2</p>
      `);
    }

  });


})();

// task 4-6

(() => {

  const images = [
    { uri:'photo-1539154444419-e31272d30a31.jpg', description:'medium-coated black-and-white dog near grass during daytime' },
    { uri:'photo-1553882809-a4f57e59501d.jpg',    description:'black and tan Belgian dog' },
    { uri:'photo-1554196721-b507d7e86ee9.jpg',    description:'gray dog standing on grass' },
    { uri:'photo-1555661059-7e755c1c3c1d.jpg',    description:'black dog behind plants' },
    { uri:'photo-1555991415-1b04a71f18c5.jpg',    description:'adult white Samoyed beside man and woman' },
    { uri:'photo-1558121591-b684092bb548.jpg',    description:'white and black dog lying on sofa' },
    { uri:'photo-1559440165-065646588e9a.jpg',    description:'person holding dog leash short-coat black and white dog' },
    { uri:'photo-1560160643-7c9c6cb07a8b.jpg',    description:'short-coated brown and white dog' },
    { uri:'photo-1562220058-1a0a019ab606.jpg',    description:'pet dog laying on sofa' },
    { uri:'photo-1565194481104-39d1ee1b8bcc.jpg', description:'short-coated gray dog' }
  ];

  let index = -1;
  router.get('/images.json', function (req, res, next) {

    index++;

    if (index === images.length) {
      index = 0;
    }

    res.send(images[index]);
  });

})();



module.exports = router;
