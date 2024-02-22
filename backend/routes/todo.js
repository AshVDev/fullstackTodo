// app.js

const express = require("express");
// const mongoose = require("mongoose");
const {
  handelSignIn,
  handleSignup,
  handleTodoCreation,
  handleGetAllTodos,
  handleCookieValidation,
} = require("../controllers/handle");
// Assuming userTodoModel.js is in the same directory
const router = express.Router();
// Sign Up route
router.post("/signup", handleSignup);

// Sign In route
router.post("/signin", handelSignIn);

router.post("/createtodo", handleTodoCreation);

router.post("/validation", handleCookieValidation);

router.get("/todos", handleGetAllTodos);

module.exports = router;
