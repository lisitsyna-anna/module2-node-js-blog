const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const { postsRouter } = require('./src/routers/postsRouter');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
	console.log(`Server works on port ${PORT}`);
});
