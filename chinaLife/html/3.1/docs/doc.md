## 京东闪购移动端文档🍓

+ **author:** *cdhuangxiaolong@jd.com*
+ **update:** *2015/12/03*
+ **description:** *项目说明，以及注意事项*
+ **version:** *v3.1.1*

### 目录说明🍓

```
|----demos(静态页面)
|    |
|    |----index.html     (闪购首页)
|    |----goods_list.html(闪购详情页面)
|    |
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
|    |    |----common(公共模块)
|    |    |    |
|    |    |    |----tool.js(工具函数)
|    |    |    |----variable.js(常量)
|    |    |    |
|    |    |----goods_list(商品列表模块)
|    |    |    |
|    |    |    |----controller.js(控制器模块)
|    |    |    |----view.js(视图模块)
|    |    |    |----model.js(数据管理模块)
|    |    |    |----main.js(程序入口模块)
|    |    |    |
|    |    |----index(首页模块)
|    |    |    |
|    |    |    |----controller.js(控制器模块)
|    |    |    |----view.js(视图模块)
|    |    |    |----model.js(数据管理模块)
|    |    |    |----main.js(程序入口模块)
|    |    |    |
|    |    |----special(即将特卖模块)
|    |    |    |
|    |    |    |----controller.js(控制器模块)
|    |    |    |----main.js(程序入口模块)
|    |
|----docs(项目文档)
|    |
|----lib(公共库文件)
|    |
|----node_modules(node模块)
|    |
|----src(源文件)
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
|    |    |----common(公共模块)
|    |    |    |
|    |    |    |----tool.js(工具函数)
|    |    |    |----variable.js(常量)
|    |    |    |
|    |    |----goods_list(商品列表模块)
|    |    |    |
|    |    |    |----controller.js(控制器模块)
|    |    |    |----view.js(视图模块)
|    |    |    |----model.js(数据管理模块)
|    |    |    |----main.js(程序入口模块)
|    |    |    |
|    |    |----index(首页模块)
|    |    |    |
|    |    |    |----controller.js(控制器模块)
|    |    |    |----view.js(视图模块)
|    |    |    |----model.js(数据管理模块)
|    |    |    |----main.js(程序入口模块)
|    |    |    |
|    |    |----special(即将特卖模块)
|    |    |    |
|    |    |    |----controller.js(控制器模块)
|    |    |    |----main.js(程序入口模块)
|    |
|----gulpfile.js(gulp任务配置文件)
|    |
|----assist.js
```

### 项目构建🍓

1. 安装`nodejs`以及`npm`
2. 进入此`package.json`所在文件夹执行`npm install`
3. 执行`npm install gulp -g`安装`gulp`
3. 执行`gulp watch`

此时`gulp`会watch你的工作目录，如有文件变化，触发`ctrl+s`时，`gulp`将自动为你压缩文件
