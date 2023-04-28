const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require('path');
const auth = require('../middleware/auth');

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=es-CO&page=1`;

router.get('/popular',async (req, res) => {
    res.sendFile(path.join(__dirname, '../views/movie.html'));
  });


router.get("/api/popular", auth, async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data.results;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;