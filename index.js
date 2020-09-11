const express = require('express');
const app = express();
const countryRoutes = require('./queries');
const cors = require('cors');
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.static("./frontend/build"));

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

app.use("/",countryRoutes);

app.get("*"), (request,response) => {
  response.sendFile(path.join(__dirname, "frontend/build/index.html"));
}

const server = http.createServer(app);
server.listen(PORT, () => {
console.log(`App running on port ${PORT}.`)
})