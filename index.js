const express = require('express');
const app =  express();

app.get('/', (req,res) => {
    res.send('The Api is live')
});

require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));