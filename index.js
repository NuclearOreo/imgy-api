const express = require('express');
const app =  express();

require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));