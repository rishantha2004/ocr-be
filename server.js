const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ocrRouter = require('./routes/ocr.routes');

app.use('/api/ocr', ocrRouter);

app.listen(8000, () => { 
    console.log('Server is listening on port 8000')
});