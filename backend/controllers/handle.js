const userTodoModel = require("../models/schema");
const jwt = require("jsonwebtoken");

async function handleSignup(req, res) {
  try {
    const { user, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await userTodoModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = await userTodoModel.create({
      user,
      email,
      password,
    });

    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    if (newUser.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Authentication successful, generate JWT token
    const token = jwt.sign({ userId: newUser._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({
        message: "User is Created and Authentication successful",
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handelSignIn(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userTodoModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Authentication successful, generate JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    // Set the token in session or send it in response, depending on your session management strategy
    // For example, you can set it as a cookie or in the response body
    // Here's an example of setting it as a cookie
    res.cookie("sessionToken", token, { maxAge: 3600000 }); // Max age is in milliseconds (1 hour in this case)

    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handleTodoCreation(req, res) {
  try {
    // Extract the JWT token from the request cookies
    const token = req.cookies.sessionToken;

    // Verify the token to authenticate the user
    const decodedToken = jwt.verify(token, "your_secret_key");

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Find the user based on the user ID
    const user = await userTodoModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is found, create a todo entry
    const { todoString } = req.body;

    const newTodo = {
      todoString,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.todos.push(newTodo);

    // Save the updated user document with the new todo entry
    await user.save();

    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.error(error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetAllTodos(req, res) {
  try {
    // Extract the JWT token from the request cookies
    const token = req.cookies.sessionToken;

    // Verify the token to authenticate the user
    const decodedToken = jwt.verify(token, "your_secret_key");

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Find the user based on the user ID
    const user = await userTodoModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is found, retrieve all todos associated with that user
    const todos = user.todos;

    res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
async function handleCookieValidation(req, res) {
  const token = req.cookie;

  // Verify the token to authenticate the user
  const decodedToken = jwt.verify(token, "your_secret_key");

  // Extract the user ID from the decoded token
  const userId = decodedToken.userId;

  // Find the user based on the user ID
  const user = await userTodoModel.findById(userId);
  console.log(user);
}

module.exports = {
  handelSignIn,
  handleSignup,
  handleTodoCreation,
  handleGetAllTodos,
  handleCookieValidation,
};
