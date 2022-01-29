const bcrypt = require ("bcryptjs")

const getPassword = async (password) =>{
  return bcrypt.hashSync(password, 12);
}

const verifyPassword= async (enteredPassword, savedPassword) => {
  return bcrypt.compareSync(enteredPassword, savedPassword);
}


module.exports = {getPassword , verifyPassword}