'use strict';

var express = require('express'),
    path = require('path'),
    api = require('./routes'),
    fs = require('fs'),
    reaccess = require('express-reaccess'),
    auth = require('basic-auth')
    ;

var app = module.exports = express();

// Configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  app.use(express.bodyParser());
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.static(path.join(__dirname, '/bower_components')));

  // Let's append user access file
  app.use(function(req, res, next) {
    //var username = btoa(req.get('Authorization')).split(':');
    var username = (auth(req) || {}).name;
    if(!username) {
      return next();
    }
    fs.readFile('./users/' + username + '.json', function(err, data) {
      if(err) {
          return next(err);
      }
      req._user = JSON.parse(data.toString());
      next();
    });
  });

  // Let's add reaccess in the chain
  app.use(reaccess({
    valuesProps: ['_user'],
    rightsProps: ['_user.rights'],
    accessErrorMessage: 'UNAUTHORIZED'
  }));

  // Let's append user access file
  app.use(function(err, req, res, next) {
    if("UNAUTHORIZED" == err.message) {
      res.header('WWW-Authenticate', 'Basic realm="WallyWorld"')
      res.send(401, '')
    }
    next(err);
  });

  app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/profile', function(req, res, next) {
  req._user.rights = req._user.rights.map(function(right) {
    var methods = [];
    if(right.methods&reaccess.GET) {
      methods.push('GET');
    }
    if(right.methods&reaccess.OPTIONS) {
      methods.push('OPTIONS');
    }
    if(right.methods&reaccess.POST) {
      methods.push('POST');
    }
    if(right.methods&reaccess.PUT) {
      methods.push('PUT');
    }
    if(right.methods&reaccess.PATCH) {
      methods.push('PATCH');
    }
    if(right.methods&reaccess.DELETE) {
      methods.push('DELETE');
    }
    right.methods = methods;
    return right;
  });
  res.send(req._user);
});

app.get('/api/beers', api.queryBeer);
app.post('/api/beers', api.addBeer);

app.get('/api/beers/:id', api.findBeer);
app.post('/api/beers/:id', api.updateBeer);
app.delete('/api/beers/:id', api.deleteBeer);


// Start server

app.listen(app.get('port'), function() {
  console.log("Started App in", app.settings.env, "on port", this.address().port);
});
