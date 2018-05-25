/* jshint indent: 2 */

const DB = require('./database')
const DataTypes = require('sequelize')

const passReset = DB.define('password_reset', {
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'password_reset',
  timestamps: false
});

module.exports = passReset
