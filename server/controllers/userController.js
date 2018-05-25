//controllers/userController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const crypto_config = require('../config/config').crypto_config;
const User = require('../models/User')

async function findUserByID(ctx,next){
  if(verifyAuth(ctx)){
    let user = await User.findUserByID(ctx.params.id,false)
    ctx.body = {
      errorCode: 2000,
      message: '获取个人信息成功',
      user: user
    }
  }else{
    ctx.status = 401
    ctx.body = {
      errorCode: 2041,
      message: 'Protected resource, you need Authorization to get access.'
    }
  }

  return next()
}

async function findContacts(ctx,next){

  if(verifyAuth(ctx)){
    let contacts = await User.findContacts(ctx.params.id)
    ctx.body = {
      errorCode: 2000,
      message: '获取好友成功',
      contacts: contacts
    }
  }else{
    ctx.status = 401
    ctx.body = {
      errorCode: 2041,
      message: 'Protected resource, you need Authorization to get access.'
    }
  }
  return next()
}

async function search(ctx,next) {
  if(verifyAuth(ctx)){
    let re = await User.searchUser(ctx.params.key)
    ctx.body = {
      errorCode: 2000,
      message: '搜索朋友成功',
      contacts: re
    }
  }else{
    ctx.status = 401
    ctx.body = {
      errorCode: 2041,
      message: 'Protected resource, you need Authorization to get access.'
    }
  }
  return next()
}

async function addFriend(ctx,next) {
  if(verifyAuth(ctx)){
    console.log(ctx.params.userID)
    let re = await User.addFriend(ctx.params.userID,ctx.params.friendID)
    if(re){
      ctx.body = {
        errorCode: 2000,
        message: '添加朋友成功',
      }
    }else{
      ctx.body = {
        errorCode: 2005,
        message: 'emmmm,发生了一些错误，添加失败，抱歉~',
      }
    }
  }else{
    ctx.status = 401
    ctx.body = {
      errorCode: 2041,
      message: 'Protected resource, you need Authorization to get access.'
    }
  }
  return next()
}

function verifyAuth(ctx){
  const secret = crypto.createHmac('sha256', crypto_config.salt)
    .update(crypto_config.update)
    .digest('hex')
  if(!ctx.header.authorization){
    return false
  }
  let token = ctx.header.authorization.replace('Bearer ','')

  try {
    jwt.verify(token, secret)
    return true
  } catch(err) {
    return false
  }
}

module.exports = {
  findUserByID,
  findContacts,
  search,
  addFriend
}
