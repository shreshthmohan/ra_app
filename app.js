var express      = require('express');
var connect      = require('connect');
var bodyparser = require('body-parser');
var http         = require('http');
var path         = require('path');
var logger       = require('morgan');
var errorHandler = require('errorhandler');

var dish         = require('./routes/dish');

var app = express();

app.set('port', process.env.port || 8080);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'))

var db       = require('./models');

app.use(bodyparser.urlencoded());

app.get('/api', function(req, res) {
  res.send('API server is running');
});

/*app.post('/api/dishes', dish.create);*/

app.get('/create_dish', dish.create_form);

app.get('/dishes/all', dish.all_by_category);

app.get('/dishes/:id', dish.by_id);

//app.get(''

app.post('/api/url_enc/dishes', dish.create);

if ('development' === app.get('env')) {
  app.use(errorHandler())
}

db
  .sequelize  // authenticates and connects with mysql
  .sync(/*{ force: true }*/) // force: true drops tables before recreating
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
