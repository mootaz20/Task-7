const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config()

mongoose.connect(process.env.CONN_LOCAL)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB', err)
})

const port = process.env.PORT || 3000 ;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})