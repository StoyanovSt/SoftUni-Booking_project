const express = require('express');
const app = express();
const config = require('./config/config');
const cors = require('cors');
const routes = require('./routes');
const mongooseConfig = require('./config/mongooseConfig');

app.use(cors());

mongooseConfig();

app.use(express.json());

app.use('/', routes);

//-------------------------------------------------------------------------------------
app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}...`);
});