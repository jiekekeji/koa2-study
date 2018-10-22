const Koa = require('koa')
const registerRouter  = require('./routes')
const app = new Koa()

app.use(registerRouter())

app.listen(8080)
console.log("demo in run")

