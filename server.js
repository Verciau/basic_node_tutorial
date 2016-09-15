// server.js
"use strict";
/* jshint node: true */
/* jshint loopfunc:true */

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./app/models/bear');

mongoose.connect('mongodb://node:node@ds029496.mlab.com:29496/tutorialdb');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next){
    //do logging
    console.log('middleware works!');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json("test working222");   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    
    //create a bear | POST at /api/bears
    .post(function(req, res){

        var bear = new Bear();      // create a new instance of the Bear model

        // START: hardcoded go get values for testing


        // END: hardcoded go get values for testing
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.color = req.body.color;    // sets the bears color

        // save the bear and check for erros
        bear.save(function(err){
            if (err)
                res.send(err);

            res.json(bear);
        });

    })

    .get(function(req, res){
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);
            
            res.json(bears);
        });
    })

    // delete all bears
    .delete(function(req, res){

        Bear.find(function(err, bears) {
            if (err)
                res.send(err);
            
             
            // loop each bear and remove them
            for (let bear of bears){
                console.log(bear.bear_id);
                Bear.remove({
                    _id: bear.bear_id
                }, function(err){
                if(err)
                    res.send(err);
             });
            }

            res.json({ message: 'Successfully delete all bears'});
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id | GET /api/bears/:bear_id
    .get(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
            if (err)
                res.send(err);

            res.json(bear);
        });
    })

    // update the bear with this id | PUT /api/bears/:bear_id
    .put(function(req, res){

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear){

            if(err)
                res.send(err);

            bear.name = req.body.name;      // update the bears info

            // save the bear
            bear.save(function(err){
                if(err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });
        });
    })

    // delete the bear with this id | DELETE /api/bears/:bear_id
    .delete(function(req, res){
        Bear.remove({
            _id: req.params.bear_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted'});
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);