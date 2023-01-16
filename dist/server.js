"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const https = require('https');
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const appid = process.env.APIKEY;
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (request, response) => {
    const htmlFile = path_1.default.join(__dirname, '..', 'src/index.html');
    response.sendFile(htmlFile);
});
app.post('/', (request, response) => {
    const query = request.body.query;
    const unit = 'metric';
    const lang = 'th';
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${endpoint}?q=${query}&units=${unit}&lang=${lang}&appid=${appid}`;
    https.get(url, (res) => {
        res.on('data', (data) => {
            const jsonData = JSON.parse(data);
            response.write(`<!DOCTYPE html>
           <html lang="en">
           <head>
               <meta charset="UTF-8">
               <meta http-equiv="X-UA-Compatible" content="IE=edge">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>My First Webapp</title>
           </head><body>`);
            if (jsonData.cod !== 200) {
                response.write(`<h1>search(city): ${query}</h1>`);
                response.write(`<h2>${jsonData.messege}</h2>`);
            }
            else {
                response.write(`<h1>The weather in : ${jsonData.name}</h1>`);
                response.write(`<h2>Could : ${jsonData.weather[0].main}</h2>`);
                response.write(`<h3>Weather : ${jsonData.weather[0].description}</h3>`);
                response.write(`<h3>Temp : ${jsonData.main.temp} °C</h3>`);
            }
            response.write(`<a href="/">back</a>`);
            response.write(`<body>`);
            console.log(jsonData);
            response.send();
        });
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map