// const fs = require('fs');



// const files = fs.readdirSync(__dirname).filter(file => file != 'index.js');

// files.map(file => {
//     const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
//     module.exports[`${fileName}`] = require(`./${file}`);
// });

module.exports = {
  Admin: require("./admin"),
  Blogs: require("./blogs"),
  Event: require("./event"),
  Resume: require("./resume"),
  Student: require("./student"),
  Emagzines: require("./emagzines"),
  Complaint: require("./complaint"),
  Suggestion: require("./suggestion"),
  Alumini: require("./alumini"),
  Announcement: require("./annoucement"),
  YearBook: require("./yearBookProfile"),
};