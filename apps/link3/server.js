var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var got     = require('got');
var http = require('http');
var url = require('url');

app.engine('html', require('ejs').renderFile);

app.use( '/scripts', express.static('scripts'));
app.use( '/styles', express.static('styles'));
app.use( '/images', express.static('images'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Comment for git testing again
app.get('/', function (req, res)
{
  // Colour should be defined in an ENV, if not default to yellow
  var colour = process.env["COLOUR"];

  if( colour == null ) 
  {
    colour = "yellow";
  }

  console.log( "Request received, serving " + colour + "...");
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.write(colour);
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