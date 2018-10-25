## node-xlsx 实现excel(xlsx)导入和导出

#### 一、安装node-xlsx
```
cnpm install node-xlsx --save
```

### 二、导入excel(xlsx),导入还需要中间件 koa-body，接收导入的文件并解析:
```
router.post('/excelin',(ctx,next)=>{
    try{
        const file = ctx.request.files.file; // 获取上传文件
        const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(file.path));
        workSheetsFromBuffer.forEach((item)=>{
            item.data.forEach((row)=>{
                console.log(row)
            })
        })
        return ctx.body = "上传成功！";
    }catch (e) {
        return ctx.body = "上传失败！" + e;
    }
})
```
前端上传代码:
```
<form action="/api/user/excelin" method="post" enctype="multipart/form-data">
    <input type="file" name="file" value="" multiple="multiple"/>
    <input type="submit" value="提交"/>
</form>
```

### 三、简单的导出：
```
router.get('/excelout1',(ctx,next)=>{
    const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const buffer = xlsx.build([{name: "mySheetName", data: data}]);
    ctx.set('Content-Type','text/javascript;charset=UTF-8');
    ctx.set('Content-disposition','attachment;filename='+encodeURIComponent('20181010订单报表.xlsx'));
    ctx.body = buffer
})
```
### 四、有单元格合并等的导出：
```
router.get('/excelout2',(ctx,next)=>{
    const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
    const option = {'!merges': [ range ]};

    const buffer = xlsx.build([{name: "mySheetName", data: data}], option);
    ctx.set('Content-Type','text/javascript;charset=UTF-8');
    ctx.set('Content-disposition','attachment;filename='+encodeURIComponent('20181010订单报表.xlsx'));
    ctx.body = buffer
})
```
