// Import required modules
const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require("mongodb");

//Mongo config stuff
const dbUrl = "mongodb+srv://Manali1321:Arman1321@cluster0.mlyhn4b.mongodb.net/Mehdi_art?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl);

// set up express app and port number
const app = express();
const port = process.env.PORT || 8888;

// define important folders
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// define public folder
app.use(express.static(path.join(__dirname, 'public')));

//convert form data to JSON for easier use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// page routes
app.get("/", async (request, response) => {
    const datas = await homeData();
    response.render('index', { content: datas });
});
app.get("/login", async (request, response) => {
    const datas = await getData();
    response.render("login", { content: datas });
});
app.get("/gallery", async (request, response) => {
    const datas = await getData();
    response.render("gallery", { content: datas });
});
// Form processing path
app.post("/login/submit", async (request, response) => {
    console.log(request.body)
    let newdata = {
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        offer: request.body.offer,
        mywork: request.body.youwork,
        location: request.body.location
    };
    await addData(newdata);
    response.redirect('/gallery');
});

// set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

// MONGO Function
// function to connect to DB and return the 'show' database
async function connection() {
    await client.connect();
    var db = client.db('Mehdi_art');
    return db;
}

// function to select all documents from menuLinks
async function homeData() {
    var db = await connection();
    var collection = db.collection('seller_data')
    var results = await collection.find({}).limit(4).toArray();
    return results;
}
async function getData() {
    var db = await connection();
    var collection = db.collection('seller_data')
    var results = await collection.find({}).toArray();
    return results;
}
async function addData(newdata) {
    var db = await connection();
    var collection = db.collection("seller_data");
    var result = await collection.insertOne(newdata);
    console.log('link added');
}