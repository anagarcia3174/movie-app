const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv").config();
const tmdbApiUrls = require("./config/tmdbApiUrls");
const mongoose = require("mongoose");
const Movie = require("./models/movieModel");
const Comment = require("./models/commentModel");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3030;
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const { ObjectId } = mongoose.Types;
const connectDB = require('./db/db')

connectDB();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

app.use(express.json());
app.use(
  cors({ origin: `${proces.env.VERCEL_CLIENT_URL}`,
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],})
);



async function updateOrGetMovie(movieId) {
  try {
    let movie = await Movie.findOne({ apiId: movieId });

    if (!movie || Date.now() - movie.lastUpdated > 24 * 60 * 60 * 1000) {
      const apiResponse = await axios.get(tmdbApiUrls.getMovieUrl(movieId));
      const movieData = apiResponse.data;

      if (!movie) {
        movie = new Movie({
          title: `${
            movieData.title || movieData.name || movieData.original_title
          }`,
          apiId: movieData.id.toString(),
          runtime: movieData.runtime,
          release_date: movieData.release_date,
          poster_path: movieData.poster_path,
          backdrop_path: movieData.backdrop_path,
          overview: movieData.overview,
        });
      } else {
        movie.title = `${
          movieData.title || movieData.name || movieData.original_title
        }`;
        movie.apiId = movieData.id.toString();
        movie.runtime = movieData.runtime;
        movie.release_date = movieData.release_date;
        movie.poster_path = movieData.poster_path;
        movie.backdrop_path = movieData.backdrop_path;
        movie.overview = movieData.overview;
      }

      await movie.save();
    }

    return movie;
  } catch (error) {
    throw error;
  }
}

//Route used to get list of movies (based on Genre) for main screen
app.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;
  const apiUrl = tmdbApiUrls.getListUrl(genre);
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch data" });
  }
});

app.get('/', (req, res) => {
  res.send('server is running')
})

//Route used for searching for movies
app.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res
      .status(400)
      .json({ error: "Keyword query parameter is required" });
  }

  const searchUrl = tmdbApiUrls.getSearchUrl(keyword);

  try {
    const response = await axios.get(searchUrl);
    res.json(
      response.data.results.filter((item) => item.media_type !== "person")
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

//Route used to get a specific movie's info for media screen
app.get("/movie/:id", async (req, res) => {
  const movieID = req.params.id;
  try {
    const movie = await updateOrGetMovie(movieID);
    const comments = await Comment.find({ movie: movie._id });

    const userPromises = comments.map(comment => 
      admin.auth().getUser(comment.userId).then(userRecord => ({
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        ...comment._doc
      }))
    )

    const commentsWithUserData = await Promise.all(userPromises);

    res.json({
      movie,
      comments: commentsWithUserData,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed  to get movie." });
  }
});

app.post("/comments", async (req, res) => {
  try {
    const { userId, movieId, content, timestamp } = req.body;
    const comment = new Comment({
      userId,
      movie: movieId,
      content,
      timestamp,
    });
    await comment.save();
    res.status(201).json({ message: "Comment successfully posted!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to post comment." });
  }
});

app.delete("/comments/:id", async (req, res) => {
  try{
    const id = req.params.id;

    const result = await Comment.deleteOne({ _id: new ObjectId(`${id}`)})

    if(!result){
      return res.status(404).json({ message: 'Comment not found'})
    }

    return res.status(200).send({ message: 'Comment deleted successfully!'})

  }catch (error){
    res.status(400).json({ error: "Failed to delete comment." });
  }
})



module.exports = app;