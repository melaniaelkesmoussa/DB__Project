const express = require("express");
const mongoose = require("mongoose");

let app = express();

var cors = require("cors");
app.use(cors());

//connect express server to a local mongodb server

mongoose.connect("mongodb://localhost:27017/movies", (err) => {
   if (!err) console.log("DB is now connected");
   else console.log("u got an error");
});

//creating schema

const movieSchema = new mongoose.Schema({
   title: String,
   year: Number,
   rated: String,
   runtime: Number,
   countries: String,
   genres: Array,
   actors: Array,
   poster: String,
});

//Convert schema to model (class)

const movieModel = new mongoose.model("movies", movieSchema);

// fetch all users

app.get("/movies", async (req, res) => {
   let allMovies = await movieModel.find();
   res.status(200);
   console.log(allMovies.length);
   res.json(allMovies);
});

app.get("/", (req, res) => {
   res.send("Welcome to our Movies website");
});

app.listen(3000, function () {
   console.log("server is now open");
});
