const express = require("express");
const req = require("express/lib/request");
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

app.get('/laptopok',(req,res)=>{
    pool.query(`SELECT * FROM laptopok`,(err,result)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.get('/',(req,res)=>{
    res.status(200).send('Gyakorlás');
});

app.listen(port,()=>{
    console.log(`Életjel ${port}`)
});

