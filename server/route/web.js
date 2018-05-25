// routes/auth.js
const router = require('koa-router')()
const Auth = require('../controllers/authController')
const User = require('../controllers/userController')

router.post('/login',Auth.login)
router.post('/register',Auth.register)
router.post('/resetpass/sendmail',Auth.sendResetMail)
router.get('/resetpass/:code',Auth.showResetPassPage)
router.post('/resetpass',Auth.ResetPass)

router.get('/user/:id',User.findUserByID)
router.get('/user/:id/friends',User.findContacts)
router.get('/user/search/:key',User.search)
router.get('/user/:userID/addFriend/:friendID',User.addFriend)




module.exports = router
