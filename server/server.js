const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require('dotenv').config();
const path = require('path')
const PORT = 3000;
// const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
express.static(path.resolve(__dirname, '../client'))


app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.js'))
})

app.get('/', async (req, res) => {
    try {
        console.log('send me the html please')
        await res.sendFile(path.join(__dirname, '../client/public/index.html'))
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
})

//home page: need boxes name and boxes image to render on page!
app.get('/home', async (req, res) => {
    try{
        const results = await db.query("select * from boxes;");
        res.status(200).json({
            status: "success",     
            boxes: results.rows,
        });
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
});

//signup page: needs to store user info in database, NEED TO BE FIXED

app.get('/signup', async (req, res, next) => {
    try{
        const results = await db.query("select * from users WHERE ;");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            user: results.rows,
        });
    } catch(err) {
        console.log(err); 
    }
});


app.post('/signup', async (req, res) => {
    try{
        const results = await db.query("INSERT INTO users (firstname, lastname, username, pass, email) values ($1, $2, $3, $4, $5) returning *;", [req.body.firstname, req.body.lastname, req.body.username, req.body.pass, req.body.email]);
        res.status(200).json({
            status: "success",     
            user: results.rows[0],
        });
    } catch(err) {
        console.log('Error found in get method to /signup',err); 
    }
});


//login page: need to check that the user's email and password is correct???
app.get('/login', async (req, res) => {
    try{
        const results = await db.query("select * from users;");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            },
        });
    } catch(err) {
        console.log(err); 
    }
});

app.get('/restaurant/:id', async (req, res) => {
    try {
        const restaurant = await db.query("select * from restaurant where id = $1;", [req.params.id]);

        const reviews = await db.query("select * from review where restaurant_id = $1;", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        });
    } catch(err) {
        console.log(err);
    }
});


//to get japanese box and its items to show up on the page, when you click on it!
app.get('home/:japanese-box', async (req, res) => {
    try{
        const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.japaness-box]);
        res.status(200).json({
            status: "success",     
            items: results.rows,
        });
    } catch(err) {
        console.log('Error found in get method to home/japanese-box', err); 
    }
});

//to get korean box and its items to show up on the page, when you click on it!
app.get('home/:korean-box', async (req, res) => {
    try{
        const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.korean-box]);
        res.status(200).json({
            status: "success",     
            items: results.rows,
        });
    } catch(err) {
        console.log('Error found in get method to home/korean-box', err); 
    }
});

//to get chinese box and its items to show up on the page, when you click on it!
app.get('/home/:chinese-box', async (req, res) => {
    try{
        const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.chinese-box]);
        res.status(200).json({
            status: "success",     
            items: results.rows,
        });
    } catch(err) {
        console.log('Error found in get method to home/chinese-box', err); 
    }
});

//to get mixed box and its items to show up on the page, when you click on it!
app.get('home/:mixed-box', async (req, res) => {
    try{
        const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.mixed-box]);
        res.status(200).json({
            status: "success",     
            items: results.rows,
        });
    } catch(err) {
        console.log('Error found in get method to home/mixed-box', err); 
    }
});

app.listen(PORT, () => console.log('listening in on '))