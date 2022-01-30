const async = require("async");
const Admin = require("../Model/admin");
const bcrypt = require("bcryptjs");

exports.bootstrapAdmin = async function (callback) {
  let hashPassword = await bcrypt.hash("123456", 10);
  const adminPassword = await bcrypt.hash("superadmin@99922", 10);
  let adminData1 = {
    email: "superadmin@rpiit.com",
    password: adminPassword,
    name: "Admin",
    actionType:"ALL",
    roleId: 1
  };


  let adminData2 = {
    email: "superadmin@gmail.com",
    password: adminPassword,
    name: "Admin",
    actionType:"ALL",
    roleId: 1
  };

  let adminData3 = {
    email: "sports@rpiit.com",
    password: hashPassword,
    name: "sports",
    actionType:"sports"

  };
  let adminData4 = {
    email: "social@rpiit.com",
    password: hashPassword,
    name: "Social",
    actionType:"social"

  };
  let adminData5 = {
    email: "cultural@rpiit.com",
    password: hashPassword,
    name: "Cultural",
    actionType:"cultural"
  };

  let adminData6 = {
    email: "trips@rpiit.com",
    password: hashPassword,
    name: "trips",
    actionType:"trips"
  };
  let adminData7 = {
    email: "company@rpiit.com",
    password: hashPassword,
    name: "company",
    actionType:"company"
  };

  let adminData8 = {
    email: "announcement@rpiit.com",
    password: hashPassword,
    name: "announcement",
    actionType:"announcement"
  };
  //  ""
  async.parallel(
    [
      function (cb) {
        insertData(adminData1.email, adminData1, cb);
      },

      function (cb) {
        insertData(adminData2.email, adminData2, cb);
      },
      function (cb) {
        insertData(adminData3.email, adminData3, cb);
      },

      function (cb) {
        insertData(adminData4.email, adminData4, cb);
      },
      function (cb) {
        insertData(adminData5.email, adminData5, cb);
      },

      function (cb) {
        insertData(adminData6.email, adminData6, cb);
      },
      function (cb) {
        insertData(adminData7.email, adminData7, cb);
      },

      function (cb) {
        insertData(adminData8.email, adminData8, cb);
      },
    ],
    function (err, done) {
      // callback(err, 'Bootstrapping finished');
    }
  );
};

function insertData(email, adminData, callback) {
  let needToCreate = true;
  async.series(
    [
      function (cb) {
        let criteria = {
          email: email,
        };
        Admin.findOne(criteria, (err, data) => {
          if (data) {
            needToCreate = false;
          }
          cb();
        });
      },
      function (cb) {
        if (needToCreate) {
          const admin = new Admin(adminData);
          admin
            .save()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } else {
          cb();
        }
      },
    ],
    function (err, data) {
      console.log("Bootstrapping finished for " + email);
      //callback(err, 'Bootstrapping finished')
    }
  );
}


