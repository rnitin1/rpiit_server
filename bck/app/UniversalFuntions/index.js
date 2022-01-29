// const fs = require('fs');


// const files = fs.readdirSync(__dirname).filter(file => file != 'index.js');

// files.map(file => {
//     const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
//     module.exports[`${fileName}`] = require(`./${file}`);
// });

module.exports = {
    JwtAuth:require("./jwtAuth"),
    Password:require("./password")
}