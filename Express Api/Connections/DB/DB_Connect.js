const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();




mongoose.connect( process.env.DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((o) => {
    console.log("DB connected sucessfully !!!!");
  })
  .catch((error) => {
    console.error(error);
  });
