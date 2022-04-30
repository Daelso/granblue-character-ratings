const PORT = 8000

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const scrapedURL = 'https://gbf.wiki/Character_Tier_List/Gamewith/Ratings'

const app = express();

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

let characters = {
    name: '',
    rating: ''
}

let characterarray = []

axios(scrapedURL)
    .then(response => {
        const html = response.data
        const package = cheerio.load(html)
        
        package('table.wikitable:nth-child(17) > tbody:nth-child(1) > tr',  html).each(function(){
            const rating = package(this).find('td:nth-child(4)').text()
            const imgTitle = package(this).find('a').attr('title')
            characters = {
                name: imgTitle,
                rating: rating
            }
            characterarray.push(characters)
        })
        

        let JSONarray = JSON.stringify(characterarray, null, 2)
        console.log(JSONarray)
    })

