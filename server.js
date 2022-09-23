require('dotenv').config()
const express = require("express");
const req = require("express/lib/request");
const { type } = require("express/lib/response");
const res = require("express/lib/response");
const app=express();
const port=process.env.PORT;
var mysql=require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
  });

app.use(express.urlencoded({extended:true}));

app.get('/laptopok',(req,res)=>{
    pool.query(`SELECT * FROM laptopok`,(err,result)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.get('/laptopok/:id',(req,res)=>{
    let laptokID=req.params.id;
    pool.query(`SELECT * FROM laptopok WHERE ID=${laptokID}`, (err,result)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.post('/laptoptorles/:id', (req, res) => {
    let laptopID = req.params.id;
    pool.query(`DELETE FROM laptopok WHERE ID=${laptopID}`, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

app.get('/osszeslaptoptorles', (req, res) => {
    pool.query(`DELETE FROM laptopok`, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

app.post('/ujlaptop', (req, res) => {
    let adatok = {
        "brand": req.body.brandname,
        "type": req.body.type,
        "des": req.body.des,
        "price": req.body.price
    }
    pool.query(`INSERT INTO laptopok VALUES(null, '${adatok.brand}', '${adatok.type}', '${adatok.des}', ${adatok.price})`, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});
app.post('/laptopmod/:id', (req, res) => {
    let laptopID = req.params.id;
    let adatok = {
        "brand": req.body.brandname,
        "type": req.body.type,
        "des": req.body.des,
        "price": req.body.price
    }
    pool.query(`UPDATE laptopok SET brand='${adatok.brand}', type='${adatok.type}', des='${adatok.des}', price=${adatok.price} WHERE ID=${laptopID}`, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});
app.get('/',(req,res)=>{
    res.status(200).send('Gyakorlás');
});

app.listen(port,()=>{
    console.log(`Életjel ${port}`)
});

