const express    = require('express');
const mongoose   = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const enroll = require('./routes/enroll');
const search = require('./routes/search');
const download = require('./routes/download');
const statistics = require('./routes/statistics');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json({ type: "application/json", limit: '1.5MB' }));
mongoose.connect(process.env.DATABASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).catch(error => console.log("Connection Error: ", error)); // Handle initail connection error.

const db = mongoose.connection;
db.on('open', () => {
  app.use('/enroll', enroll);
  app.use('/search', search);
  app.use('/download', download);
  app.use('/statistics', statistics);
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Handle errors after initial connection.
db.on('error', error => console.log("Connection Error: ", error));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
