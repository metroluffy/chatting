const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const json = require('koa-json')
const logger = require('koa-logger')
// const server = require('http').createServer(app)
// const io = require('socket.io')(server)
const port = process.env.PORT || 3000

// import route config
const web = require('./server/route/web.js')

// app.use(cors())
app.use(koaBody())
app.use(json())
app.use(logger())


app.on('error', function(err, ctx){
  console.log('server error', err)
})


router.use(web.routes())

app.use(router.routes())

// //websocket
// io.on('connection', function (socket) {
//   socket.on('send message',function (data) {
//     // echo globally (all clients) that a person send a message
//     console.log(data)
//     let message = data.message
//     let receiver = message.receiver
//     socket.broadcast.emit(receiver, {
//       message: message
//     })
//   })
//   socket.on('disconnect', function(data){
//     console.log('user disconnected')
//   })
// })

app.listen(port,() => {
  console.log('Koa is listening in '+port)
})
