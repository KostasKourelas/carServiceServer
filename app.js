// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
const carRoutes = require('./routes/carRoutes');
app.use('/api', carRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/`);
});
