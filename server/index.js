const express = require('express');
const app = express();
const config = require('./config/config');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.json('hello');
});

//-------------------------------------------------------------------------------------
app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}...`);
});