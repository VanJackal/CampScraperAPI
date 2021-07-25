const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const fs = require('fs');

router.get('/', async (req,res,next) =>{
    var run = spawn('python3',["./run.py"],{cwd:"./python"});
    run.on('close',(code) =>{
        writeDateToFile();
		console.log(code);
    });
    console.log('starting data collecion');
    res.json({started:true})
});
router.get('/updated',async (req,res,next) => {
	res.json({date:readDateFromFile()});
});

function writeDateToFile(){
    var now = {date:new Date()};
    fs.writeFileSync('updated.json',JSON.stringify(now) + "\n", (err) => {
        console.log(err);
    });
}

function readDateFromFile(){
    return require('./updated.json').date;
}

module.exports = router;