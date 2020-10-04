const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// afin d'afficher les images
app.use(express.static(__dirname+'/public'));
// midlewhare qui bloque l'accès aux pages html si les conditions ne sont pas verifié

const workingTime = (req, res, next) => {
  let openDay = new Date();

  if (
    openDay.getHours() > 8 &&
    openDay.getHours() < 18 &&
    openDay.getDay() > 0 &&
    openDay.getDay() < 6
  ) {
    next();
  } else {
    console.log("Our office is closed !!!");
    res.send("<h1> Our office is closed !! ");
  }
};

app.get("/",workingTime, function (req, res) {
    res.sendFile(__dirname + "/public/home.html");
  });
  app.get("/contact", workingTime, function (req, res) {
    res.sendFile(__dirname + "/public/contact.html");
  });
  app.get("/service", function (req, res) {
    res.sendFile(__dirname + "/public/ourServices.html");
  });

app.listen(3000, function () {
    console.log("welcome in localhost 3000 server");
  });