/* 
    RESFULL API NODE JS
*/
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

// Konek ke mysql
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_manga'
})

require('events').EventEmitter.defaultMaxListeners=20;

// Create RestFULL
var app=express();
var publicDir=(__dirname+'/public/');
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get All Banner
app.get("/banner",(req,res,next)=>{
    con.query('SELECT * FROM banner',function(error,result,fields){
        con.on('error',function(err){
                console.log('[MY SQL ERROR]',err);
        });

        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else 
        {
            res.end(JSON.stringify("No comic here"));
        }
    });
});

//Get All Comic
app.get("/manga",(req,res,next)=>{
    con.query('SELECT * FROM manga',function(error,result,fields){
        con.on('error',function(err){
                console.log('[MY SQL ERROR]',err);
        });

        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else 
        {
            res.end(JSON.stringify("No comic here"));
        }
    });
});
//Get All Chapter
app.get("/chapter/:mangaid",(req,res,next)=>{
    con.query('SELECT * FROM chapter where MangaID=?',[req.params.mangaid],function(error,result,fields){
        con.on('error',function(err){
                console.log('[MY SQL ERROR]',err);
        });

        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else 
        {
            res.end(JSON.stringify("No chapter here"));
        }
    });
});

//Get Images Chapter ID
app.get("/links/:chapterid",(req,res,next)=>{
    con.query('SELECT * FROM link where ChapterId=?',[req.params.chapterid],function(error,result,fields){
        con.on('error',function(err){
                console.log('[MY SQL ERROR]',err);
        });

        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else 
        {
            res.end(JSON.stringify("No chapter here"));
        }
    });
});

//Start Server
app.listen(3000,()=>{
    console.log('Manga API running on Port 3000');
})