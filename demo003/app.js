const Koa = require('koa')
const path = require('path')
const registerRouter  = require('./routes')
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const static = require('koa-static');

const app = new Koa()


app.use(registerRouter())
app.use(static(
    path.join( __dirname, 'public')
))
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
}));
// app.use(bodyParser());

app.listen(8080)
console.log("demo in run")

