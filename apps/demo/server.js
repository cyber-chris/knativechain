//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var ejs     = require('ejs');
var got     = require('got');

//app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
app.use( '/scripts', express.static('scripts'));
app.use( '/styles', express.static('styles'));
app.use( '/images', express.static('images'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Comment for git testing again
app.get('/', function (req, res)
{
  // Get the links from ENV on every call to make it updateable
  link1 = process.env.LINK1URL;
  link2 = process.env.LINK2URL;
  link3 = process.env.LINK3URL;
  link4 = process.env.LINK4URL;

  console.log( "Request received....");
  res.render('pages/index', {
    LINK1: link1,
    LINK2: link2,
    LINK3: link3,
    LINK4: link4
  });
});

app.get( '/envs', function (req,res) {
  res.send( getEnvs() );
});

app.get( '/env', function (req,res) {
  // Do I have a request variable?
  var input = req.query.name;

  if( input == null )
  {
    res.send( "\"No name parameter provided\"");
  }

  // Do I have an ENV with that name?
  var envoutput = process.env[input];

  if( envoutput == null )
  {
    res.send( "No env variable with name " + input + " found.");
  }
  else
  {
    res.send( input + ":" + envoutput ); 
  }
});

app.get( '/nasa', function (req,res) {
  var targetURL = "";
  var targetExplanation = "";
  got('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }).then(response => {
    console.log(response.body.url);
    console.log(response.body.explanation);

    targetURL = response.body.url;
    targetExplanation = response.body.explanation;
    res.send( "<img src=\"" + targetURL + "\" width=\"500px\"><br/><br/>" + targetExplanation );
  }).catch(error => {
    console.log(error.response.body);
    
    targetURL = "No URL returned";
    targetExplanation = "No explanation returned";
  });
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);

function getEnvs()
{
  output = "";
  output += "<b>Environment Variables resident on host (generated from node.js)</b><br/>";
  output += "<hr width=100% size=1/>";

  names = getEnv();

  for( name in names )
  {
    target = names[name];
    output += "<b>" + target + "</b> " + process.env[target] + "<br/>";
  }

  return output;
}

function showObject(obj) {
  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += p + " , " + obj[p] + "\n";
    } 
  }              
  return result;
}

function getEnv()
{
  var envNames = [];

  for( name in process.env )
  {
    envNames.push( name );
  }

  envNames.sort();

  return envNames;
}
