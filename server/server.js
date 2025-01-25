// packages

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()


// initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// import routes
// const {userRoutes}= require("./routes/userRoutes")4


// middleware
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_ORIGIN, // Update this to your frontend URL deployed on Render
    credentials: true, // Allow cookies to be sent
  })
);

// Routes
// app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Nothing to see here. Move along');
  });

  app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
  });


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  
  });