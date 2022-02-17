const express = require("express");
require('dotenv').config();
const connectDB = require("./db/connect");
const app = express();
const task = require("./routes/task");
const notFound = require('./middleware/notFound');

app.use(express.json());
app.use('/api/v1/tasks', task );

app.use("*",notFound);

let port = process.env.PORT || 5000;


const start = async() => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connect to DB");
    await app.listen(port, function() {
      console.log("Server started successfully");
     });
  } catch (error) {
    console.log(error);
  }
}


start();