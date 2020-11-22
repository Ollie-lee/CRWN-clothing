const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//return a function, expects secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
//heroku set the PORT
const port = process.env.PORT || 5000;

//body-parser
//for any of the requests coming in I want you to process their body
// and convert it to json so we can use it
app.use(express.json());
//make sure url not having space or symbol
app.use(bodyParser.urlencoded({ extended: true }));

//cross origin request and what this does ?
// e.g. our web server is being hosted from some origin
//origin means port
//So for example in development it's port 5000
// our front end is hosted on port 3000
//which is a different port and therefore a different origin.
//When our front end makes a request to our backend
// what cors does is it's on most web servers by default
//it checks to make sure the origin is the same
// if it's not the same then it denies the request
//which is a safety feature.
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // serve a certain file inside of this url that we pass to it
  app.use(express.static(path.join(__dirname, "client/build")));

  // for any route that is not covered by the future routes we're going to write.
  // I want you to do this as your response.
  app.get("*", function (req, res) {
    //HTML CSS JS
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`server running in port ${port}`);
});

//this route is the whole point, we need to process stripe in the backend
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    //the total charge cost that we're trying to make
    amount: req.body.amount,
    currency: "usd",
  };

  //use the body and pass it to stripe library
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    //error if there is one, or a response if it's successful
    if (stripeErr) {
      res.status(500).send({
        error: stripeErr,
      });
    } else {
      res.status(200).send({
        success: stripeRes,
      });
    }
  });
});
