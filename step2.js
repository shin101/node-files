const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path,'utf8',(err,data)=>{
        if(err){
            console.log("ERROR:", err);
            process.kill(1)
        }

        console.log("DATA...",data)
    });
}

// cat(process.argv[2])

async function webCat(url){
   try {
    let resp = await axios.get(url);
    console.log(resp.data);
   } catch (err){
    console.log("Error:",err);
    process.kill(1)
   }
};

let path = process.argv[2];

if (path.startsWith('http')){
    webCat(path);
} else{
    cat(path);
}