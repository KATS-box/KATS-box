const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require('dotenv').config();
const path = require('path')
const PORT = 3000;
const nodemailer = require('nodemailer');
const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
express.static(path.resolve(__dirname, '../client'))

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.js'))
})

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "katsbox118@outlook.com",
        pass: "Luhansehun520"
    }
});


app.get('/', async (req, res) => {
    try {
        console.log('send me the html please')
        await res.sendFile(path.join(__dirname, '../client/public/index.html'))
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
})

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
            res.status(200).cookie('username', req.body.username).redirect('/shop');
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
                res.status(200).cookie('username', req.body.username).redirect('/shop');
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
app.get('/shop/:smalljbox', async (req, res) => {
    try{
        // const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.japaness-box]);

        const results = await db.query("select * from boxes WHERE boxid = 5;")
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/small-j-box', err); 
    }
});



//to get korean box and its items to show up on the page, when you click on it!
app.get('/shop/:medium-j-box', async (req, res) => {
    try{
        const results = await db.query("select * from boxes WHERE boxname = $1;",[req.params.medium-j-box]);
        res.status(200).json({
            status: "success",     
            items: results.rows[0],
        });
    } catch(err) {
        console.log('Error found in get method to shop/medium-j-box', err); 
    }
});

app.get('/shop/:large-j-box', async (req, res) => {
    try{
        const results = await db.query("select * from boxes WHERE boxname = $1;",[req.params.large-j-box]);
        res.status(200).json({
            status: "success",     
            items: results.rows[0],
        });
    } catch(err) {
        console.log('Error found in get method to shop/large-j-box', err); 
    }
});


// app.get('/shop/:lar-j-box', async (req, res) => {
//     try{
//         const results = await db.query("select * from boxes WHERE boxname = $1;",[req.params.large-j-box]);
//         res.status(200).json({
//             status: "success",     
//             items: results.rows[0],
//         });
//     } catch(err) {
//         console.log('Error found in get method to shop/large-j-box', err); 
//     }
// });

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
app.get('/shop/:mixed-box', async (req, res) => {
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

//post to checkout page, to add into the sales table in database
app.post('/checkout', async (req, res) => {
    try{
        const results = await db.query("INSERT INTO sales (userid, boxid1, boxid2, boxid3, boxid4, progress, price) values ($1, $2, $3, $4, $5, $6, $7) returning *;", [req.body.userid, req.body.boxid1, req.body.boxid2, req.body.boxid3, req.body.boxid4, 'order received', req.body.price]);

        const deleteCart = await db.query("DELETE FROM cart WHERE userid = $1", [req.body.userid]);

        // Then clear the cart
        res.status(201).redirect('/confirmation');
    } catch(err) {
        console.log(err);
    }
});


//to insert into the sales table when user checks out:

app.listen(PORT,  ()=> {
    console.log(`listening on port, ${PORT}`)
});