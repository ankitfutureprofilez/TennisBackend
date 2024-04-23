const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors(corsOptions));
const dotenv = require("dotenv");
require("./mongoConfig");
dotenv.config();
const morgan = require('morgan')
app.use(morgan('dev')); 
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json({ limit: "10mb" }));

app.use("/pdf", require("./routes/pdfRoutes"));
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
 