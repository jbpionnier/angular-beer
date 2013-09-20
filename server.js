'use strict';

var express = require('express'),
    path = require('path'),
    api = require('./routes');

var app = module.exports = express();

// Configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  app.use(express.bodyParser());
  app.use(express.favicon(__dirname + '/public/css/favicon.ico'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.static(path.join(__dirname, '/bower_components')));
  app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


// Routes

app.get('/api/beers', api.queryBeer);
app.post('/api/beers', api.addBeer);

app.get('/api/beers/:id', api.findBeer);
app.post('/api/beers/:id', api.updateBeer);
app.delete('/api/beers/:id', api.deleteBeer);


// Start server

app.listen(app.get('port'), function() {
  console.log("Started App in", app.settings.env, "on port", this.address().port);
});