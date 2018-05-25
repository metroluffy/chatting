/* jshint indent: 2 */

const DB = require('./database')
const DataTypes = require('sequelize')

const UserGroup = DB.define('user_group', {
  userID: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  groupID: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  }
}, {
  tableName: 'user_group',
  timestamps: false
});

module.exports = UserGroup
