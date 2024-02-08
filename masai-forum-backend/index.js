
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const {connection} = require('./dbconnect');
const mongoose = require('mongoose');
const {adminRoutes} = require('./routes/auth.routes');
const {postRouter} = require('./routes/post.routes');
const {userRouter} = require('./routes/user.routes');
// const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// app.use("/api",(req,res)=>{
//     res.status(200).send("gbs post app")
//    // console.log("m post app")
// })

app.use('/api', adminRoutes);
app.use('/api', postRouter);
app.use('/api', userRouter);

// Error handling middleware
// app.use(errorHandlingMiddleware.handleErrors);
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
      await connection;
      console.log("Database connected");
    } catch {
      console.log("Database connect Failed");
    }
  
    app.listen(PORT,() => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log("Server Started");
    });
  }
  
  startServer();