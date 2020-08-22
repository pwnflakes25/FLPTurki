const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require('compression');
const app = express();
const path = require('path');

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}


app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(compression());



// Start the app by listening on the default Heroku port
app.listen( process.env.PORT || 8080);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/FLPTurki'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/FLPTurki/index.html'));
});
