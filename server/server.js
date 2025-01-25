// packages

const express = require('express')

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// import routes
const userRoutes= require("./routes/userRoutes")

// middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  
  });