const authRoutes= require('./routes/auth')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-Parser')
const cors = require('cors')
const {readdirSync} = require("fs");
require('dotenv').config()


//app code

const app = express()

// dbcode

mongoose.connect(process.env.DATABASE , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(console.log("Connexão estabelecida!"))
.catch((err) => console.log("DB error (connection)",err))

//middleware code

app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


//port code

const envport = process.env.PORT || 8000;

app.listen(envport, ( ) => console.log(`servidor rodando em ${envport}`));
