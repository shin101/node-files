const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { text } = require('stream/consumers');

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


function handleOutput(text,out){
    if(out){
        fs.writeFile(path,text,"utf8",function(err){
            if(err){
                console.error('error!')
                process.exit(1); 
            }
        });
    } else{
        console.log(text);
    }
    
}

if (process.argv[2]==='--out'){
    out = process.argv[3];
    path = process.argv[4];
} else{
    path = process.argv[2];
}


if (path.startsWith('http')){
    webCat(path);
} else{
    cat(path);
}