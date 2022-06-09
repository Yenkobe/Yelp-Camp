const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/YelpCamp')
// NOT LONGER NECESSARY 
//The mongoose package just recently updated to version 6.x after years, 
//and the useCreateIndex/useNewUrlParser /useUnifiedTopology property is no longer required to dismiss some warnings.
//      {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// logic to check if there is an error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))




app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})