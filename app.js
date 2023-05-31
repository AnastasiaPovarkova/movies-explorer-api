const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT = 3001, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(require('./routes/index'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, Base path: ${BASE_PATH}`);
});
