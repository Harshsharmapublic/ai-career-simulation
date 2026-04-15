const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/userroutes');
const app = express();
connectDB();

// Manual CORS middleware – allows the Vite dev server (port 5173) to call this API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('AI Career Simulator API is running!');
});

app.listen(5000, () => console.log('Server is running on port 5000'));

