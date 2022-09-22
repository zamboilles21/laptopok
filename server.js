const express = require("express");
const req = require("express/lib/request");
const { type } = require("express/lib/response");
const res = require("express/lib/response");
const app=express();
const port=5000;
var mysql=require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : '2/14szft_elso'
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

app.post('/ujlaptop', (req, res)=>{
    let adatok={
        "brand":req.body.brandname,
        "type":req.body.type,
        "des":req.body.des,
        "price":req.body.price

    }
    pool.query(`INSERT INTO laptopok VALUES(null,'${adatok.brand}',${adatok.type}',${adatok.des}',${adatok.price}')`,(err,result)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
});

app.get('/',(req,res)=>{
    res.status(200).send('Gyakorlás');
});

app.listen(port,()=>{
    console.log(`Életjel ${port}`)
});

