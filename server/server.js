const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../client/public'));


//home page: need boxes name and boxes image to render on page!
app.get('/shop', async (req, res) => {
    try{
        const results = await db.query("select * from boxes;");
        res.status(200).json({
            status: "success",     
            boxes: results.rows,
        });
    } catch(err) {
        console.log('Error found in get method to /shop',err); 
    }
});



//post request to signup page: get the username and email and pass sure they are not in the database yet!
app.post('/signup', async (req, res, next) => {
    try{
        let username = req.body.username;
        let email = req.body.email;

        const result1 = await db.query('select * from users where username = $1', [username]);

        const result2 = await db.query('select * from users where email = $1', [email]);

        //if both is not in the database, store both
        if (result1.rows.length === 0 && result2.rows.length === 0) {
            const results = await db.query("INSERT INTO users (firstname, lastname, username, pass, email) values ($1, $2, $3, $4, $5) returning *;", [req.body.firstname, req.body.lastname, req.body.username, req.body.pass, req.body.email]);
            res.status(200).redirect('/shop');
        //something already exists in the database:
        } else {
            if (result1.rows.length !== 0 && result2.rows.length !== 0) {
                res.status(200).json({
                    data: {
                        username: false,
                        email: false
                    },
                });
            }
            else if (result1.rows.length !== 0) {
                res.status(200).json({
                    data: {
                        username: false,
                        email: true
                    },
                });
            } else if (result2.rows.length !== 0) {
                res.status(200).json({
                    data: {
                        username: true,
                        email: false
                    },
                });
            }
        };
    } catch(err) {
        console.log('Error found in post request to /signup', err); 
    }
});



//post request to login page: get the username and email and pass sure they are in the database or else they need to sign up!!
app.post('/login', async (req, res, next) => {
    try{
        let username = req.body.username;
        let password = req.body.pass

        const result1 = await db.query('select * from users where username = $1', [username]);

        const result2 = await db.query('select pass from users where username = $1', [username]);

        //if username is in database, get password to be checked;
        if (result1.rows.length !== 0) {
            if (password === result2.rows[0]) {
                res.status(200).redirect('/shop');
            } else {
                res.status(200).json({
                    data: {username: true,
                    pass: false}
                });
            }
            //if username is not in database, then user is never signed up, ask user to sign up!
        } else {
            res.status(200).json({
                data: {
                    username: false,
                    pass: false
                },
            });
        }
    } catch(err) {
        console.log('Error found in post request to /login', err); 
    }
});



//to get japanese box and its items to show up on the page, when you click on it!
app.get('shop/:japanese-box', async (req, res) => {
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
app.get('shop/:korean-box', async (req, res) => {
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
app.get('/shop/:chinese-box', async (req, res) => {
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
app.get('shop/:mixed-box', async (req, res) => {
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



//to insert into the sales table when user checks out:
