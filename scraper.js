const PORT = process.env.port || 8000;

const jsonPort = process.env.jsonPort || 3000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const fs = require("fs");
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(jsonPort)

const scrapedURL = "https://gbf.wiki/Character_Tier_List/Gamewith/Ratings";

const app = express();

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

function scrape() {
  let characters = {
    name: "",
    rating: "",
  };

  let characterarray = [];

  axios(scrapedURL).then((response) => {
    try {
      const html = response.data;
      const package = cheerio.load(html);
      let id = 0;
      package(
        "table.wikitable:nth-child(17) > tbody:nth-child(1) > tr",
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

      let JSONarray = JSON.stringify({ data: characterarray }, null, 2);
      fs.writeFile("db.json", JSONarray, function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

scrape();
