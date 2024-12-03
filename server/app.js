const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const playerRouter = require("./routes/playerRoute")
const bodyParser = require('body-parser');
require('dotenv').config()

const matchRouter = require("./routes/matchRoute")

const uri = `mongodb+srv://23maiolol:${process.env.MONGODB_PASSWORD}@fantatoxiccluster.9mquw.mongodb.net/${process.env.COLLECTION}`;
mongoose.connect(uri, {});
const db = mongoose.connection;

db.once("open", ()=>{console.log("Connected to MongoDB!")});

const app = express();
const port = 3005;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.use("/match", matchRouter)
app.use("/player", playerRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});