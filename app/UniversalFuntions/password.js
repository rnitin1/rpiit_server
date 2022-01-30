const bcrypt = require ("bcryptjs")

const getPassword = async (password) =>{
  return bcrypt.hashSync(password, 12);
}
const getPasswordAsync = async (password) => {
  const salt = await bcrypt.genSalt(12)
  return await bcrypt.hash(password, salt)
}

const verifyPassword= async (enteredPassword, savedPassword) => {
  return bcrypt.compareSync(enteredPassword, savedPassword);
}


module.exports = {getPassword , verifyPassword, getPasswordAsync}