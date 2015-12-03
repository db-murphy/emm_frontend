## 开发文档
* author: cdhuangxiaolong@jd.com
* time: 2015/11/02
* description: 项目说明，以及注意事项

### 目录说明

```
|----demos(静态页面)
|    |
|    |----index.html     (闪购首页)
|    |----goods_list.html(闪购详情页面)
|
|----dist(正式发布文件)
|    |
|    |----css(项目依赖样式文件)
|    |    |
|    |    |----common.min.css    (公共样式)
|    |    |----index.min.css     (首页样式)
|    |    |----goods_list.min.css(详情页样式)
|    |
|    |----images(图片资源)
|    |----javascript(js文件)
|    |    |
|    |    |----
```

### 项目构建

1. 安装`nodejs`以及`npm`
2. 进入此`package.json`所在文件夹执行`npm install`
3. 执行`npm install gulp -g`安装`gulp`
3. 执行`gulp watch`

此时`gulp`会watch你的工作目录，如有文件变化，触发`ctrl+s`时，`gulp`将自动为你压缩文件
