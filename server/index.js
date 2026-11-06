
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const users = require("./users");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);

const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Login endpoint
app.post("/api/v1/sessions", (req, res) => {
  const { email, password } = req.body || {};

  // Validate input
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({
      error: "Email and password are required.",
    });
  }

  // Find user
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  // Check password
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({
      error: "Invalid email or password.",
    });
  }

  // Create authentication token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Return successful login
  res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Not logged in.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Not logged in.",
      });
    }

    req.user = decoded;
    next();
  });
}

// Get logged-in user
app.get("/api/v1/users/me", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(401).json({
      error: "Not logged in.",
    });
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
