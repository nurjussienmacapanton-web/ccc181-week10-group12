
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 3000;

const JWT_SECRET =
  process.env.JWT_SECRET || 'campusconnect-demo-secret-key';

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


const demoUser = {
  id: 1,
  name: 'Demo Student',
  email: 'student@campusconnect.test',
  passwordHash: bcrypt.hashSync('Campus26', 10),
};


app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});


app.post('/api/v1/sessions', (req, res) => {
  const { email, password } = req.body || {};


  if (
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({
      error: 'Email and password are required.',
    });
  }

 
  const user = demoUser.email === email.trim().toLowerCase()
    ? demoUser
    : null;


  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({
      error: 'Invalid email or password.',
    });
  }


  const token = jwt.sign(
    { sub: user.id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

 
  return res.status(200).json({
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

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Not logged in.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.sub !== demoUser.id) {
      return res.status(401).json({
        error: 'Not logged in.',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Not logged in.',
    });
  }
}


app.get('/api/v1/users/me', authenticateToken, (req, res) => {
  return res.status(200).json({
    id: demoUser.id,
    name: demoUser.name,
    email: demoUser.email,
  });
});


app.listen(PORT, () => {
  console.log(`CampusConnect API running at http://localhost:${PORT}`);
});