// packages

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()



// initialize app
const app = express();
const PORT = process.env.PORT || 5000;



// import routes
const userRoutes= require("./routes/user.routes")
const restaurantRoutes = require("./routes/restaurantRoutes")
const passwordResetRoutes = require("./routes/passwordreset.routes");

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cookieParser());

// Use CORS middleware
app.use(cors());

// Optional: Configure CORS options
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions))

// Routes
app.use('/api/users', userRoutes);
app.use('/api/passwordreset', passwordResetRoutes);
// app.use('/api/')
// Restaurants Routes
app.use('/api/restaurants', restaurantRoutes);


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