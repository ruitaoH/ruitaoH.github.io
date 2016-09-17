var Fontmin = require('fontmin');

var srcPath = 'fonts/w5.otf'; // 字体源文件
var destPath = 'fonts/build';    // 输出路径
var text = '永远乘风破浪,永远在路上 点击加入 报名时间: 3.6-3.11启航传承(iknow,大软坊)梦想(二手街等15家创业公司)想象(然后,飞啦,rebellious)聚焦(校园通,华科脱单,土豪网)改变世界';

// 初始化
var fontmin = new Fontmin()
    .src(srcPath)               // 输入配置
    .use(Fontmin.glyph({        // 字型提取插件
        text: text              // 所需文字
    }))
    .use(Fontmin.ttf2eot())     // eot 转换插件
    .use(Fontmin.ttf2woff())    // woff 转换插件     
    .use(Fontmin.ttf2svg())     // svg 转换插件
    .use(Fontmin.css())         // css 生成插件
    .dest(destPath);            // 输出配置
console.log(text);

// 执行
fontmin.run(function (err, files, stream) {

    if (err) {                  // 异常捕捉
        console.error(err);
    }

    console.log('done');        // 成功
});