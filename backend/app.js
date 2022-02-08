const express = require("express");
const db = require("./config/db");
const app = express();
const userRoutes = require("./routes/user");
const path =  require("path");
const helmet = require("helmet"); // securité HTTP Cross-Site-Scripting (XSS), clickjacking
app.use(express.json());
app.use(helmet());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth',userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;