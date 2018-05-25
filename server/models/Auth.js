/* Auth Model */
const passReset = require('../database/password_reset')
const sequelize = require('../database/database')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function setPassResetRecord(mail,token){
  try{
    return await sequelize.query('INSERT INTO `password_reset` (email,token,created_at) VALUES("'+mail+'","'+token+'",now())',{ type:Sequelize.QueryTypes.INSERT})
  }catch (e) {
    console.log(e)
    return false
  }
}

async function validatePassResetCode(token){
  try{
    return await sequelize.query('SELECT email,created_at FROM `password_reset` WHERE token = "'+token+'" LIMIT 1',{ type:Sequelize.QueryTypes.SELECT})
  }catch (e) {
    console.log(e)
    return false
  }
}

async function deletePassResetCode(email){
  try{
    return await sequelize.query('DELETE FROM `password_reset` WHERE email = "'+email+'"',{ type:Sequelize.QueryTypes.DELETE})
  }catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  setPassResetRecord,
  validatePassResetCode,
  deletePassResetCode
}
