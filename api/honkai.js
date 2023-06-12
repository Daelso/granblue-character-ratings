const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const express = require("express");
let router = express.Router();

//Route base/honkai

const scrapedURL = "https://genshin.gg/star-rail/tier-list/";

router.route("/").get((req, res) => {
  res.json("Welcome to my Honkai Star Rail API");
});

router.route("/scrape").get((req, res) => {
  axios.get(scrapedURL).then((response) => {
    try {
      const html = response.data;
      const scrapedPage = cheerio.load(html);

      let id = 0;
      let characterarray = [];

      scrapedPage(".dropzone-row", html).each(function () {
        scrapedPage(".tierlist-icon-wrapper", html).each(function () {
          const name = scrapedPage(this).find(".tierlist-name").text();
          id += 1;
          characters = {
            id: id,
            name: name,
          };
          characterarray.push(characters);
        });
      });

      JSON.stringify({ character: characterarray }, null, 2);

      res.json({ character: characterarray }); //returns it in the browser

      // //Populates the file for us
      // fs.writeFile("hsr.json", JSONarray, function (err, result) {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
