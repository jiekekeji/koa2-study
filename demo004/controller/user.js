const Router = require('koa-router')
const path = require('path')
const xlsx = require('node-xlsx').default;
const fs = require('fs')
const router = new Router()

let prefix = path.basename(__filename)
router.prefix('/api/' + prefix.substring(0, prefix.indexOf('.')))

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

router.get('/excelout1',(ctx,next)=>{
    const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const buffer = xlsx.build([{name: "mySheetName", data: data}]);
    ctx.set('Content-Type','text/javascript;charset=UTF-8');
    ctx.set('Content-disposition','attachment;filename='+encodeURIComponent('20181010订单报表.xlsx'));
    ctx.body = buffer
})

router.get('/excelout2',(ctx,next)=>{
    const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
    const option = {'!merges': [ range ]};

    const buffer = xlsx.build([{name: "mySheetName", data: data}], option);
    ctx.set('Content-Type','text/javascript;charset=UTF-8');
    ctx.set('Content-disposition','attachment;filename='+encodeURIComponent('20181010订单报表.xlsx'));
    ctx.body = buffer
})

module.exports = router
