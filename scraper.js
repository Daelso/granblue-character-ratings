const port = process.env.PORT || 3000;

const jsonPort = process.env.jsonPort || 8000;
const jsonServer = require('json-server');
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const fs = require("fs");

const SocketIO = require('socket.io');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();



server.use(middlewares);
server.use(router);
server.listen(port)



const scrapedURL = "https://gbf.wiki/Character_Tier_List/Gamewith/Ratings";

const app = express();

const expressServer = app.listen(jsonPort, () => console.log(`server running on PORT ${jsonPort}`));

const io = SocketIO(expressServer);

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

      let JSONarray = JSON.stringify({ character: characterarray }, null, 2);
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
