/* jshint indent: 2 */

const DB = require('./database')
const DataTypes = require('sequelize')

const UserFriend = DB.define('user_friend', {
  userID: {
    type: DataTypes.INTEGER(11),
    allowNull: true
  },
  friendID: {
    type: DataTypes.INTEGER(11),
    allowNull: true
  }
}, {
  tableName: 'user_friend',
  timestamps: false
});

module.exports = UserFriend
