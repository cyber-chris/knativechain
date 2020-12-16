var express = require('express');
var app     = express();
var eps     = require('ejs');
var http = require('http');
var url = require('url');
var os = require('os');

app.engine('html', require('ejs').renderFile);

app.use( '/scripts', express.static('scripts'));
app.use( '/styles', express.static('styles'));
app.use( '/images', express.static('images'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Comment for git testing again
app.get('/', function (req, res)
{
  console.log( "Request received, serving BLUE....");
  
  res.write( "blue");
  res.end();
  return;
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);