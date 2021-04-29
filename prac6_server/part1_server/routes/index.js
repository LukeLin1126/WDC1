var express = require('express');
var router = express.Router();

// Initial items and current Item ID
var currid = 6;
var items = [
    { id:1, name:'Apples', description:'One a day keeps the doctor away.', image:'/images/apple-256268__340.jpg', price:3.99, quantity:10 },
    { id:2, name:'Tangerines', description:'The most delicious of citrus.', image:'/images/tangerines-1721590__340.jpg', price:5.49, quantity:30 },
    { id:3, name:'Strawberries', description:'More like RAWBERRY.', image:'/images/strawberries-3359755__340.jpg', price:4.99, quantity:20 },
    { id:4, name:'Bananas', description:'Boat.', image:'/images/bananas-1119790__340.jpg', price:6.99, quantity:50 },
    { id:5, name:'Apricots', description:'Makes great Jam.', image:'/images/apricots-2523272__340.jpg', price:4.49, quantity:40 },
    { id:6, name:'Blueberries', description:'Something something superfood.', image:'/images/blueberries-690072__340.jpg', price:5.49, quantity:60 },
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/items', function(req, res, next) {
    
    // Check if URL parameter present
    if ('q' in req.query){
        
        // If so, search the titles and descriptions of items for a match
        var results = [];
        var q = req.query.q.toLowerCase();
        for (var i=0; i<items.length; i++) {
            if(items[i].name.toLowerCase().includes(q) || items[i].description.toLowerCase().includes(q)){
                results.push(items[i]);
            }
        }
        
        // Send matching items
        res.json(results);
        
    } else {
        
        // Otherwise send all items
        res.json(items);
        
    }
    
});

router.post('/items/add', function(req, res, next) {
    
    // Increment the current Item ID
    currid++;
    
    // Add new item to items array
    items.push({ id:currid,
                 name:req.body.name,
                 description:req.body.description,
                 image:req.body.image,
                 price:req.body.price,
                 quantity:req.body.quantity });
    
    // Send 200 response
    res.end();
    
});

router.post('/items/edit/:id', function(req, res, next) {
    
    // Iterate over items array
    for (var i=0; i<items.length; i++) {

        // If id matches, update any included parts of the item.
        if(items[i].id == req.params.id){
            if ('name'          in req.body){ items[i].name         = req.body.name; }
            if ('description'   in req.body){ items[i].description  = req.body.description; }
            if ('image'         in req.body){ items[i].image        = req.body.image; }
            if ('price'         in req.body){ items[i].price        = req.body.price; }
            if ('quantity'      in req.body){ items[i].quantity     = req.body.quantity; }
        }
        
    }
    res.end();
    
});

module.exports = router;
