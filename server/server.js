const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require('dotenv').config();
const path = require('path')
const PORT = 3000;
const nodemailer = require('nodemailer');
const db = require('./models');
// import { StaticRouter } from "react-router";


const app = express();
app.use(cors());
app.use(express.json());
express.static(path.resolve(__dirname, '../client'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 100000000000}));

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

app.get('/magicscroll.js', async (req, res) => {
    try {
        await res.sendFile(path.join(__dirname, '../client/public/magicscroll.js'))
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
})

app.get('/magicscroll.css', async (req, res) => {
    try {
        await res.sendFile(path.join(__dirname, '../client/public/magicscroll.css'))
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
})

app.get('/confirmation', async (req, res) => {
    try {
        console.log('send me the html please')
        await res.sendFile(path.join(__dirname, '../client/public/index.html'))
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
})

app.get('/shop', async (req, res) => {
    try {
        console.log('send me the html please')
        await res.sendFile(path.join(__dirname, '../client/public/index.html'))
    } catch(err) {
        console.log('Error found in get method to /home',err); 
    }
})

//post request to signup page: get the username and email and pass sure they are not in the database yet!
app.post('/signup', async (req, res, next) => {
    try{
        
        let username = req.body.username;
        let email = req.body.email;
        console.log(username, email)
        const result1 = await db.query('select * from users where username = $1', [username]);
        const result2 = await db.query('select * from users where email = $1', [email]);

        //if both is not in the database, store both
        if (result1.rows.length === 0 && result2.rows.length === 0) {
            const results = await db.query("INSERT INTO users (firstname, lastname, username, pass, email) values ($1, $2, $3, $4, $5) returning *;", [req.body.firstname, req.body.lastname, req.body.username, req.body.pass, req.body.email]);

            //create shopping cart for user upon sign up

            const newCart = await db.query("INSERT INTO carts (price, smallcbox, mediumcbox, largecbox, smalljbox, mediumjbox, largejbox, smallkbox, mediumkbox, largekbox, smallmbox, mediummbox, largembox, username) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *;", ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, username]));

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


            if (password === result2.rows[0].pass) {
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
app.get('/smalljbox', async (req, res) => {
    try{
        const results = await db.query("select * from boxes WHERE boxname = $1;", ['smalljbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/smalljbox', err); 
    }
});


app.get('/mediumjbox', async (req, res) => {
    try{

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['mediumjbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/mediumjbox', err); 
    }
});

app.get('/largejbox', async (req, res) => {
    try{

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['largejbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/largejbox', err); 
    }
});


app.get('/smallkbox', async (req, res) => {
    try{

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['smallkbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/smallkbox', err); 
    }
});


app.get('/mediumkbox', async (req, res) => {
    try{
        const results = await db.query("select * from boxes WHERE boxname = $1;", ['mediumkbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/mediumkbox', err); 
    }
});


app.get('/largekbox', async (req, res) => {
    try{
        const results = await db.query("select * from boxes WHERE boxname = $1;", ['largekbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/largekbox', err); 
    }
});


app.get('/smallcbox', async (req, res) => {
    try{
        const results = await db.query("select * from boxes WHERE boxname = $1;", ['smallcbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/smallcbox', err); 
    }
});


app.get('/mediumcbox', async (req, res) => {
    try{

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['mediumcbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/mediumcbox', err); 
    }
});


app.get('/largecbox', async (req, res) => {
    try{
        // const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.japaness-box]);

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['largecbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/largecbox', err); 
    }
});

app.get('/smallmbox', async (req, res) => {
    try{
        // const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.japaness-box]);

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['smallmbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/smallmbox', err); 
    }
});


app.get('/mediummbox', async (req, res) => {
    try{
        // const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.japaness-box]);

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['mediummbox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/mediummbox', err); 
    }
});

app.get('/largembox', async (req, res) => {
    try{
        // const results = await db.query("select * from boxes RIGHT JOIN items on boxes.boxID = items.BoxID WHERE boxes.boxName = $1;",[req.params.japaness-box]);

        const results = await db.query("select * from boxes WHERE boxname = $1;", ['largembox']);
        res.status(200).json(results.rows[0])
    } catch(err) {
        console.log('Error found in get method to shop/largembox', err); 
    }
});



//post to checkout page, to add into the sales table in database
app.post('shop/checkout', async (req, res) => {
    try{

        const email = req.body.email;
        const username = req.body.username; 
        const total = req.body.total;



        const results = await db.query("INSERT INTO sales (userid, smalljbox, mediumjbox, largejbox, smallkbox, mediumkbox, largekbox, smallcbox, mediumcbox, largecbox, smallmbox, mediummbox, largembox, progress, price) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *;", [req.body.userid, req.body.smalljbox, req.body.mediumjbox, req.body.largejbox, req.body.smallkbox, req.body.mediumkbox, req.body.largekbox, req.body.smallcbox, req.body.mediumcbox, req.body.largecbox, req.body.smallmbox, req.body.mediummbox, req.body.largembox, 'order received', req.body.price]);

        // Then clear the cart;
        const clearCart = await db.query("UPDATE carts SET smallcbox=$1, mediumcbox=$2, largecbox=$3, smalljbox=$4, mediumjbox=$5, largejbox=$6, smallkbox=$7, mediumkbox=$8, largekbox=$9, smallmbox=$10, mediummbox=$11, largembox=$12 WHERE username=$13 returning *;",[0,0,0,0,0,0,0,0,0,0,0,0,username]);
        res.status(200).json(clearCart.rows[0])

        //then send mail:
        const options = {
            from: "katsbox118@outlook.com",
            to: email,
            subject: `Thank you for your purchase ${username}! A follow up email will be send when your order is processed.`,
            text: `
            Here is your receipt:
            `
        };
        
        transporter.sendMail(options, function(err, info) {
            if (err) {
                console.log(err);
                return;
            } console.log("Sent", info.response)
        });
        //
        res.status(201).redirect('/confirmation');
    } catch(err) {
        console.log(err);
    }
});


// get cart when click on the bag icon: 
app.get('/getCart/:username', async (req, res) => {
    try{
            console.log('im getting cart',req.params.username)
            const results = await db.query("select * from carts WHERE username = $1;", [req.params.username.slice(1)]);
            console.log(results)
            res.status(200).json(results.rows[0])
        } catch(err) {
            console.log('Error found in get method to shop/bag', err); 
        }
});


app.post('/KoreanBox', async (req, res) => {

    let obj = Object.keys(req.body);
    let boxSize;
    let quantity;
    let username;
    if(obj.length === 4) {
        if(obj[0] === '1') {
            console.log('its 1')
            boxSize = 1
        } else {
            console.log('its 3')
            boxSize = 3
        }
        quantity = req.body[obj[2]];
        username = req.body[obj[3]];
    
    } else if (obj.length !== 4){
        console.log('its 2')
        boxSize = 2
        quantity = req.body[obj[1]];
        username = req.body[obj[2]];
    }
    console.log(req.body, obj)
    console.log(boxSize,quantity,username)

    try{
        if(boxSize === 1) {
            const results = await db.query("UPDATE carts SET smallkbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            res.status(200)
        } else if (boxSize === 2) {
            const results = await db.query("UPDATE carts SET mediumkbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            res.status(200)
        } else if (boxSize === 3) {
            const results = await db.query("UPDATE carts SET largekbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            res.status(200)
        }
    } catch(err) {
        console.log('Error found in put method to /shop/KoreanBox', err); 
    }
});



//to get korean box and its items to show up on the page, when you click on it!
app.post('/JapaneseBox', async (req, res) => {
    let obj = Object.keys(req.body);
    let boxSize;
    let quantity;
    let username;
    if(obj.length === 4) {
        if(obj[0] === '1') {
            console.log('its 1')
            boxSize = 1
        } else {
            console.log('its 3')
            boxSize = 3
        }
        quantity = req.body[obj[2]];
        username = req.body[obj[3]];
    
    } else if (obj.length !== 4){
        console.log('its 2')
        boxSize = 2
        quantity = req.body[obj[1]];
        username = req.body[obj[2]];
    }
    console.log(req.body, obj)
    console.log(boxSize,quantity,username)

    try{
        if(boxSize === 1) {
            const results = await db.query("UPDATE carts SET smalljbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            console.log(results)
            res.status(200)
        } else if (boxSize === 2) {
            console.log('im in medium jbox')
            const results = await db.query("UPDATE carts SET mediumjbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            console.log(results)
            res.status(200)
        } else if (boxSize === 3) {
            const results = await db.query("UPDATE carts SET largejbox = $2 WHERE username = $3 returning *;", [quantity, username]);
            console.log(results)
            res.status(200)
        }
    } catch(err) {
        console.log('Error found in put method to /shop/JapaneseBox', err); 
    }
});


app.post('/ChineseBox', async (req, res) => {

    let obj = Object.keys(req.body);
    let boxSize;
    let quantity;
    let username;
    if(obj.length === 4) {
        if(obj[0] === '1') {
            console.log('its 1')
            boxSize = 1
        } else {
            console.log('its 3')
            boxSize = 3
        }
        quantity = req.body[obj[2]];
        username = req.body[obj[3]];
    
    } else if (obj.length !== 4){
        console.log('its 2')
        boxSize = 2
        quantity = req.body[obj[1]];
        username = req.body[obj[2]];
    }
    console.log(req.body, obj)
    console.log(boxSize,quantity,username)

    try{
        if(boxSize === 1) {
            const results = await db.query("UPDATE carts SET smallcbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            res.status(200)
        } else if (boxSize === 2) {
            const results = await db.query("UPDATE carts SET mediumcbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            res.status(200)
        } else if (boxSize === 3) {
            const results = await db.query("UPDATE carts SET largecbox = $1 WHERE username = $2 returning *;", [quantity, username]);
            res.status(200)
        }
    } catch(err) {
        console.log('Error found in get method to /shop/ChineseBox', err); 
    }
});

app.post('/MixedBox', async (req, res) => {

    let obj = Object.keys(req.body);
    let boxSize;
    let quantity;
    let username;
    if(obj.length === 4) {
        if(obj[0] === '1') {
            console.log('its 1')
            boxSize = 1
        } else {
            console.log('its 3')
            boxSize = 3
        }
        quantity = req.body[obj[2]];
        username = req.body[obj[3]];
    
    } else if (obj.length !== 4){
        console.log('its 2')
        boxSize = 2
        quantity = req.body[obj[1]];
        username = req.body[obj[2]];
    }
    console.log(req.body, obj)
    console.log(boxSize,quantity,username)

    try{
        if(boxSize === 1) {
            const results = await db.query("UPDATE carts SET smallmbox = $2 WHERE username = $3 returning *;", [quantity, username]);
            res.status(200)
        } else if (boxSize === 2) {
            const results = await db.query("UPDATE carts SET mediummbox = $2 WHERE username = $3 returning *;", [quantity, username]);
            res.status(200)
        } else if (boxSize === 3) {
            const results = await db.query("UPDATE carts SET largembox = $2 WHERE username = $3 returning *;", [quantity, username]);
            res.status(200)
        }
    } catch(err) {
        console.log('Error found in get method to /shop/MixedBox', err); 
    }
});

app.listen(PORT,  ()=> {
    console.log(`listening on port, ${PORT}`)
});