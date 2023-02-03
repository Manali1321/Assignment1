// Import required modules
const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require("mongodb");

//Mongo config stuff
const dbUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(dbUrl);

// set up express app and port number
const app = express();
const port = process.env.PORT || 8888;

// define important folders
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// define public folder
app.use(express.static(path.join(__dirname, 'public')));

// //convert form data to JSON for easier use
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// page routes
app.get('/', (request, response) => {
    // response.status(200).send('test page');
    response.render('index', { title: 'Home' });
});

// set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

// MONGO Function
// function to connect to DB and return the 'show' database
async function connection() {
    await client.connect();
    db = client.db('show');
    return db;
}

// function to select all documents from menuLinks
// async function getLinks() {
//     db = await connection();
//     var results = db.collection('card').find({});
//     res
// }