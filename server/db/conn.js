const mongoose = require('mongoose')

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndes: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log("No connection");
  });