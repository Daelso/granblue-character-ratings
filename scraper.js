const port = process.env.PORT || 3000;

const jsonPort = process.env.jsonPort || 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const fs = require("fs");

const scrapedURL = "https://gbf.wiki/Character_Tier_List/Gamewith/Ratings";

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my Granblue Character Tier API");
});

app.get("/characters", (req, res) => {
  axios.get(scrapedURL).then((response) => {
    try {
      const html = response.data;
      const package = cheerio.load(html);
      let id = 0;
      let characterarray = [];

      package(
        "table.wikitable:nth-child(17) > tbody:nth-child(1) > tr:not(:first-child)",
        html
      ).each(function () {

        const rating = package(this).find("td:nth-child(4)").text();
        const imgTitle = package(this).find("a").attr("title");

        id += 1;
        characters = {
          id: id,
          name: imgTitle,
          rating: rating,
        };

        characterarray.push(characters);

      });

      let JSONarray = JSON.stringify( {character:characterarray} , null, 2);

      res.json({character:characterarray}) //returns it in the browser

      //Populates the file for us
      fs.writeFile("db.json", JSONarray, function (err, result) {
        if (err) {
          console.log(err);
        }
      });

    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/characters/:selection", (req, res) => {
  axios.get('https://granblue-rating-api.herokuapp.com/characters')
    .then((response) => {
        const hero = req.params.selection
        const characters = response.data
        // const search = characters.character.find(character => character.name == hero);

        const options = characters.character
      
      const test = (text) => options.filter(({ name }) => name.includes(text));
      
      const result = test(hero[0].toUpperCase() + hero.substring(1));
      
      console.log(result.length)
      

        if(result.length < 1){
          res.json(`No results found for ${hero} - CASE SENSITIVE`)
        }
        else{
          res.json(result)
        }
    })
});
 


app.listen(port, () => console.log(`server running on PORT ${port}`));

