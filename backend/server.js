// Get the packages we need
require("dotenv").config();
var express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  secrets =
    process.env.DATABASE_URL || require("./config/secrets.js").mongo_connection,
  bodyParser = require("body-parser"),
  AccessToken = require("twilio").jwt.AccessToken,
  VideoGrant = AccessToken.VideoGrant;

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port =  4000;

// Connect to a Mongo DB
mongoose.connect(secrets, { useNewUrlParser: true });

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

app.get("/token", function(request, response) {
  var identity = "father";

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

// Use the body-parser package in our application
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require("./routes")(app, router);

// Start the server
app.listen(port);
console.log("Server running on port " + port);
