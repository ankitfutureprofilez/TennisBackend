const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const morgan = require('morgan');
const mongoConfig = require("./mongoConfig");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
// Middleware
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); 

// Routes
app.get("/", (req, res) => {
  res.json({
    msg: 'Okay',
    status: 200
  });
});

app.use("/player", require("./routes/playerDataRoutes"));
app.use("/user", require("./routes/userRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
