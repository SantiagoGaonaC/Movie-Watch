const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");

router.get("/search", async (req, res) => {
  const query = req.query.query;
  res.sendFile(path.join(__dirname, "../views/search.html"), { query });
});

router.get("/api/search", auth, async (req, res) => {
  try {
    const query = req.query.query;
    const apiKey = process.env.MOVIE_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-CO&page=1&include_adult=false&query=${query}`
    );

    if (!response.ok) {
      res.status(response.status).send(response.statusText);
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).send("Error searching movies");
  }
});

module.exports = router;
