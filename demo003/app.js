const Koa = require('koa')
const registerRouter  = require('./routes')
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const app = new Koa()

app.use(bodyParser());
app.use(registerRouter())
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
}));


app.listen(8080)
console.log("demo in run")

