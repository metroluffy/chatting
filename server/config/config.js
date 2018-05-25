const APP = {
  HOST: 'http://localhost:8080'
}
const database = {
  database: 'chatting',
  username: 'root',
  password: 'root',
  host: '127.0.0.1',
  port: 3306
}

const crypto_config = {
  salt: 'chatting',
  update: 'I love chatting'
}

const MAIL = {
  HOST: 'smtp.163.com',
  ACCOUNT: 'liut0078@163.com',
  PASSWORD: 'liusw..4753',
  PORT: 465,
  SSL: true
}

module.exports = {
  database,
  crypto_config,
  MAIL,
  APP
}
