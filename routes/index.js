'use strict';

var BEERS = require('./beers.json'),
    _ = require('lodash');

exports.queryBeer = function(req, res) {
  res.json(BEERS);
};

exports.findBeer = function(req, res) {
  var id = parseInt(req.params.id, 10);
  var beer = _.find(BEERS, {id: id});

  if (!beer) {
    return res.json(404, {message: 'Beer ' + id + ' not found'});
  }

  res.json(beer);
};

/**
* Create a beer
*/
exports.addBeer = function (req, res) {
  var beer = req.body;
  beer.id = BEERS.length;

  BEERS.push(beer);
  return res.json(201, beer);
};

/**
* Update a beer
*/
exports.updateBeer = function (req, res) {  
  var beer = _.find(BEERS, {id: req.body.id});
  _.extend(beer, req.body);
  return res.json(200, beer);
};

/**
* Delete a beer
*/
exports.deleteBeer = function(req, res) {
  var id = parseInt(req.params.id, 10);
  BEERS = _.reject(BEERS, {id: id});
  res.json(true);
};