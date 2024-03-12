const mongoose = require('mongoose');
var mongooseURL = 'mongodb://localhost:27017/Shelf'

mongoose.connect(mongooseURL);

const db = mongoose.connection;

//event listner

db.on('connected',() => {
    console.log("Connected to mongodb database");
});
db.on('error', (err) => {
    console.log('mongodb connection error',err )
});
db.on("disconnected",() => {
    console.log("MongoDB disconnected");
});

module.exports=db;