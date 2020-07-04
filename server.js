const express    = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <h1>A web based portal for election commission.</h1>
  `);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
