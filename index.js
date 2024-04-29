const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(fileUpload());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));

app.get("/", (req, res) => {
  res.json({
    msg:'Okay',
    status:200
  }) 
});


const dotenv = require("dotenv");
require("./mongoConfig");
dotenv.config();
const morgan = require('morgan')
app.use(morgan('dev')); 
app.use(express.json());
// app.use(bodyParser.urlencoded());


app.use("/player", require("./routes/playerDataRoutes"));
app.use("/user", require("./routes/userRoutes"));

const path = require('path');

app.get("/", (req, res) => {
  res.json({
    msg:'Okay',
    status:200
  })
});

const PORT =  process?.env?.PORT

app.listen(PORT, () => console.log("Server is running at port : " + PORT));