const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const router = require('./routes/User');
app.use('/api/v1',router);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log( `APP is listening at ${PORT}`));

const db = require('./config/database');
db.dbConnect();