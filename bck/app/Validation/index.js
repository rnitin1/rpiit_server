// const fs = require('fs');


// const files = fs.readdirSync(__dirname).filter(file => file != 'index.js');

// files.map(file => {
//     const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
//     module.exports[`${fileName}`] = require(`./${file}`);
// });

module.exports = {
  Mentee: require("./mentee"),
  UserValidation: require("./userValidation"),
  Event: require("./event"),
  Blog: require("./blog"),
};