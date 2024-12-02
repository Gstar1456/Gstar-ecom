const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./router/brandRouter');
const invRouter = require('./router/inventory2Router');
const analysisRouter = require('./router/analysisRouter')
const manual_inv_check= require('./router/manual_inv_check');
const calculationRouter= require('./router/calculationRouter');
const path = require('path');

db();
require('dotenv').config();
const app = express();
const port = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use(cors({
    origin:'*'
}));

app.use(express.json());
app.use('/api/', router);
app.use('/api/inv', invRouter);
app.use('/api/analysis', analysisRouter);
app.use('/api/mic', manual_inv_check);
app.use('/api/calculation', calculationRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});