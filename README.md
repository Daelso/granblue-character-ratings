# Title: Granblue Character Scraper

![badge](https://img.shields.io/badge/license-MIT-darkred) [![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


## Description:

This is a WIP, at the moment it scrapes character names and ratings into a JSON object, the data is scraped from here: https://gbf.wiki/Character_Tier_List/Gamewith/Ratings -- A big thanks to the wiki contributers for keeping great up to date data. Currently you can access this in API form here: https://granblue-rating-api.herokuapp.com/characters - If you need to regenerate or update the JSON, clone this and uncomment the scraper portion to regnerate the file.

## Sample Data
{
      "id": 2,
      "name": "Abby",
      "rating": "9.2"
    },
    {
      "id": 3,
      "name": "Abby (Promo)",
      "rating": "7.0"
    },
    {
      "id": 4,
      "name": "Agielba",
      "rating": "8.5"
    },
  Full data can be found the JSON file. 


## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation Instructions:

This requires express.js, node.js, cheerio, nodemon and axios. Open the terminal and begin with ```npm init``` followed by ```npm i``` to hopefully automatically install all required dependencies.

Run the program by opening your terminal in the main folder and typing ```npm start``` which requires nodemon (you should probably globally install it). You may want to run ```nodemon --ignore 'db.json'``` to stop nodemon restarting constantly due to the writefile.

## Usage:

To create a JSON object of granblue characters and their associated rating. Will eventually be turned into an API for discord bot to query.

## Contributing:

Want to contriubte? Here's the guidelines: None at the moment!


## License:

This application is covered under the MIT license. 

## My Github Account:

  Click here: https://github.com/Daelso

## Questions:

  Feel free to DM me here
  
