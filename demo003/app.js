const Koa = require('koa')
const registerRouter  = require('./routes')
const bodyParser = require('koa-bodyparser');
const app = new Koa()

app.use(bodyParser());
app.use(registerRouter())

app.listen(8080)
console.log("demo in run")

