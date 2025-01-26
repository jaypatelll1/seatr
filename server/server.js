// packages

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()



// initialize app
const app = express();
const PORT = process.env.PORT || 5001;



// import routes
const userRoutes= require("./routes/user.routes")
const restaurantRoutes = require("./routes/restaurantRoutes")
const passwordResetRoutes = require("./routes/passwordreset.routes");
const tablesRoutes = require('./routes/tableRoutes')
const bookingRoutes = require('./routes/booking.routes')
const tokenRoutes = require('./routes/tokenRoutes')
const email = require('./routes/email.routes')

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cookieParser());

// Use CORS middleware
app.use(cors());

// Optional: Configure CORS options
const corsOptions = {
   // Allow all origins
   origin: ['*', 'http://localhost:5173'], // Allow all origins and http://localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions))

// Routes
app.use('/api/users', userRoutes);
app.use("/api/token", tokenRoutes)
app.use('/api/passwordreset', passwordResetRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api', tablesRoutes);
app.use('/api/bookings',bookingRoutes)
app.use('/api/email', email);



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