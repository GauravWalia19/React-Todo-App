const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// exclusing dotenv config from production
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// CORS Middleware
app.use(cors());

// express middleware handling the body parsing 
app.use(express.json());

// express middleware handling the form parsing
app.use(express.urlencoded({extended: false}));

// handling api routes
app.use('/api/v1/todos',require('./routes/api/v1/todos'));
app.use('/api/v1/users', require('./routes/api/v1/users'));

// create static assets from react code for production only
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})