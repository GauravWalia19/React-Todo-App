const express = require('express');

const app = express();
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send('hello world');
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})