//models/user

const User = require('../database/users')
const passReset = require('../database/password_reset')
const sequelize = require('../database/database')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto')
const crypto_config = require('../config/config').crypto_config;

async function findUserByID(id,pwd = true){
  if(pwd){
    return await User.findOne({
      where: {
        id: id
      }
    })
  }else{
    return await User.findOne({
      attributes:{ exclude: ['password'] },
      where: {
        id: id
      }
    })
  }
}

async function findUserByEmail(email){
  return await User.findOne({
    where: {
      email: email
    }
  })
}

async function findContacts(id){
  let friends =  await sequelize.query('SELECT a.id, a.nickname, b.remark,a.email, a.avatar, a.description, a.created_at, a.updated_at  from users as a LEFT JOIN user_friend as b on a.id = b.friendID WHERE id in (SELECT friendID from user_friend WHERE userID = '+id+') and b.userID = '+id,{ type:Sequelize.QueryTypes.SELECT})
  let groups = await sequelize.query('SELECT a.*,b.remark from groups as a LEFT JOIN user_group as b on a.id = b.groupID WHERE id in (SELECT groupID from user_group WHERE userID = '+id+') and b.userID = '+id,{ type:Sequelize.QueryTypes.SELECT})
  return {
    friends: friends,
    groups: groups
  }
}

async function createUser(nickname,email,pass){
  const secret = crypto.createHmac('sha256', pass)
    .update(crypto_config.update)
    .digest('hex')
  let avatar = [
    'https://cdn-img.easyicon.net/png/12029/1202943.gif',
    'https://cdn-img.easyicon.net/png/12029/1202943.gif',
    'https://cdn-img.easyicon.net/png/12014/1201441.gif',
    'https://cdn-img.easyicon.net/png/12048/1204894.gif'
  ]
  try{
    return await User.create({
      nickname: nickname,
      email:email,
      password: secret,
      avatar: avatar[Math.floor(Math.random()*avatar.length)],
      created_at: Date.now(),
      updated_at: Date.now(),
    })
  }catch (e) {
    console.log(e)
    return false
  }

}

async function searchUser(key){
  return await User.findOne({
    attributes:{ exclude: ['password'] },
    where:{
      [Op.or]: [
        {
          nickname: {
            [Op.like]: '%'+key+'%'
          }
        },
        {
          email: {
            [Op.like]: key
          }
        }
      ]
    }
  })
}

async function updatePassword(email,password) {
  const secret = crypto.createHmac('sha256', password)
    .update(crypto_config.update)
    .digest('hex')
  return await User.update({
    password: secret
  },{
    where: {
      email: email
    }
  })
}

async function addFriend(userID,friendID){
  try{
    return await sequelize.query('INSERT INTO `user_friend` (userID,friendID) VALUES('+userID+','+friendID+'),('+friendID+','+userID+')',{ type:Sequelize.QueryTypes.INSERT})
  }catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  findUserByID,
  findUserByEmail,
  findContacts,
  createUser,
  searchUser,
  addFriend,
  updatePassword
}
