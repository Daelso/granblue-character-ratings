const port = process.env.PORT || 3000;

const serverless = require("serverless-http");

const express = require("express");
const app = express();

const gbRoutes = require("./api/granblue");
app.use("/granblue", gbRoutes);

const hsrRoutes = require("./api/honkai");
app.use("/honkai", hsrRoutes);

app.listen(port, () => console.log(`server running on PORT ${port}`));

module.exports.handler = serverless(app);
