const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");
const path = require("path");
const { ActiveToken } = require("../models/activeToken");
const app = require("../app");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/register", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;