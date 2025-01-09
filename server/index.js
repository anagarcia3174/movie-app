const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv").config();
const tmdbApiUrls = require("./config/tmdbApiUrls");
const mongoose = require("mongoose");
const Comment = require("./models/commentModel");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3030;
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const { ObjectId } = mongoose.Types;
const connectDB = require('./db/db')

connectDB();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors({
  origin: `${process.env.VERCEL_CLIENT_URL}`,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());


const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if(!token){
    return res.status(401).json({ error: 'Unauthorized'})
  }

  try{
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  }catch (error){ 
    return res.status(401).json({ error: 'Invalid token'})
  }
}

const verifyCommentOwnership = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (comment.userId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

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
    const movie = await axios.get(tmdbApiUrls.getMovieUrl(movieID));
    if(!movie){
      return res.status(404).json({ error: 'Movie not found'})
    }
    const comments = await Comment.find({ movieId: movieID.toString() });

    const commentsWithUserData = await Promise.all(
      comments.map(comment => 
        admin.auth().getUser(comment.userId).then(userRecord => ({
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          ...comment._doc
        }))
      )
    )

    res.json({
      movie: movie.data,
      comments: commentsWithUserData,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to get movie data." });
  }
});

app.post("/comments", verifyAuth, async (req, res) => {
  try {
    const { movieId, content, timestamp } = req.body;
    const comment = new Comment({
      userId: req.user.uid,
      movieId,
      content,
      timestamp,
    });
    await comment.save();
    res.status(201).json({ message: "Comment successfully posted!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to post comment." });
  }
});

app.delete("/comments/:id", verifyAuth, verifyCommentOwnership, async (req, res) => {
  try{
    const result = await Comment.deleteOne({ _id: new ObjectId(req.params.id)})

    return res.status(200).send({ message: 'Comment deleted successfully!'})

  }catch (error){
    res.status(400).json({ error: "Failed to delete comment." });
  }
})

app.get("/movie/title/:title", async (req,  res) => {
try{
  const searchUrl = tmdbApiUrls.getSearchUrl(req.params.title);
  const searchResponse = await axios.get(searchUrl);

  const movie = searchResponse.data.results[0];
  if(!movie){
    return res.status(404).json({ error: 'Movie not found'})
  }

  const movieResponse = await axios.get(tmdbApiUrls.getMovieUrl(movie.id));
  const movieData = movieResponse.data;

  const comments = await Comment.find({ movieId: movie.id.toString() });
    
    const commentsWithUserData = await Promise.all(
      comments.map(comment => 
        admin.auth().getUser(comment.userId).then(userRecord => ({
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          ...comment._doc
        }))
      )
    );

    res.json({
      movie: movieData,
      comments: commentsWithUserData
    });
} catch (error){
  res.status(400).json({ error: "Failed to get movie data" });
}
});


module.exports = app;