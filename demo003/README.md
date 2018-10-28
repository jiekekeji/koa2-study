## koa-body 获取请求参数及实现文件上传

koa-body 可以替代 koa-bodyparser，安装koa-body之后不需要安装koa-bodyparser

#### 一、安装koa-body，并在app.js中引入
```
cnpm install koa-body --save
```
app.js，注意app.use (koa-body,....),要放在路由app.use(registerRouter())之前：
```
const koaBody = require('koa-body');

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
}));

// 放在koa-body之后
app.use(registerRouter())
```

#### 二、获取GET方式传递的参数:

###### 1、普通方式传参数，

路径如:http://localhost:8088/api/user/query?username=jack&id=123212&aihao=%E7%AF%AE%E7%90%83&aihao=%E8%B6%B3%E7%90%83
   
获取方式:  ctx.request.query
```
router.get('/query',(ctx, next)=>{
    let query =  ctx.request.query;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
打印query:
```
{ username: 'jack', id: '123212', aihao: [ '篮球', '足球' ] }
```

###### 2、获取动态路由参数

路径如:http://localhost:8088/api/user/query/123132/jack

获取方式:
```
router.get('/query/:id/:username',(ctx, next)=>{
    let query =  ctx.params;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
打印query:
```
 id: '123132', username: 'jack' }
```
#### 二、获取POST方式传递的参数:
###### 1、参数以键值对key-value形式传递，获取参数方式:
```
router.post('/add',(ctx, next)=>{
    let query =  ctx.request.body;
    ctx.body = 'query' + JSON.stringify(ctx.request.body);
})
```
###### 2、参数以json字符串形式传递，获取参数方式:
```
router.post('/update',(ctx, next)=>{
    let query =  ctx.request.body;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
#### 三、文件上传
上传的文件通过: const file = ctx.request.files.file  获取文件，
表单数据通过: const file = ctx.request.body 获取参数
###### 1、上传单个文件:
```
router.post('/upload', (ctx, next)=>{
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
}
```
前端代码:
```
<form action="/api/user/uploads" method="post" enctype="multipart/form-data">
    <input type="file" name="file" value="" multiple="multiple"/>
    <input type="submit" value="提交"/>
</form>

```
###### 2、上传多个文件:
```
router.post('/uploads', (ctx, next)=>{
    const files = ctx.request.files.file; // 获取上传文件
    files.forEach((file)=>{
        try {
            const reader = fs.createReadStream(file.path); // 创建可读流
            let filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`; // 保存的文件路径
            const upStream = fs.createWriteStream(filePath); // 创建可写流
            reader.pipe(upStream); // 可读流通过管道写入可写流
        }catch (e) {
            return ctx.body = "上传失败！";
        }
    })
    return ctx.body = "上传成功！";
})
```
前端代码:
```
<form action="/api/user/uploads" method="post" enctype="multipart/form-data">
    <input type="file" name="file" value="" multiple="multiple"/>
    <input type="file" name="file" value="" multiple="multiple"/>
    <input type="file" name="file" value="" multiple="multiple"/>
    <input type="submit" value="提交"/>
</form>
```