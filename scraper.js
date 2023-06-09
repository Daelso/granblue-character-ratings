const port = process.env.PORT || 3000;

const express = require("express");
const app = express();

const apiRoutes = require("./api/granblue");
app.use("/api", apiRoutes);

app.listen(port, () => console.log(`server running on PORT ${port}`));
