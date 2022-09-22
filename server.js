const express = require("express")
const app=express();
const port=5000;

app.get('/',(req,res)=>{
    res.status(200).send('Gyakorlás');
});

app.listen(port,()=>{
    console.log(`Életjel ${port}`)
});

