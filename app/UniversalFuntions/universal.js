
var fs = require('fs');

exports.tryCatch = async ( req,res,code ) =>{
    try {
        code
    } catch (err) {
        res.status(401).send(err);
        return console.log("ERROR", err);
    }
}


exports.deleteFile=(filePath)=>{
    filePath = "public"+filePath.split("https://api.appformersrpiit.co.in/")[1]
    console.log({filePath});
    fs.unlinkSync(filePath);
} 