const express = require("express");
const path = require("path");
const urllib = require("urllib");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.get("/sanity", function (req, res) {
  console.log("OK");
  res.send("ok");
});
app.get("/recipes/:ingredient", function (request, response) {
  urllib.request(
    `https://recipes-goodness.herokuapp.com/recipes/${request.params.ingredient}`,
    function (err, data, res) {
      const apidata = JSON.parse(data);
      response.send(getRecipes(apidata));
    }
  );
});
function getRecipes(apidata) {
  const results = [];

  for (let index = 0; index < apidata.results.length; index++) {
    let apiresult = apidata.results[index];
    let Results = {};
    Results.ingredients = apiresult.ingredients;
    Results.title = apiresult.title;
    Results.thumbnail = apiresult.thumbnail;
    Results.href = apiresult.href;
    results.push(Results);
  }
  return results;
}
const port = 8080;
app.listen(port, function () {
  console.log("Listening on port:" + port);
});
