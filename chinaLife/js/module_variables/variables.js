define(function (require,exports,module){

     /**
     * 请求IP
     */
    var BasePath ="http://218.247.15.102/appfuse_emm_backend/api/v1/";

    /**
    * 接口
    * @param  loginUrl     登陆接口
    **/
    var httpPort = {
        loginUrl:'user/login.json',
        projectUrl:'appProject.json'
    };

    /**
     * 顶部导航栏配置参数
     */
    var menuJson = [ 
        {
            "id" : "0",
            "url" : "proM_main.html#0",
            "text" : "项目管理",
            "leaf" : true,
            "class":""
        },{
            "id" : "1",
            "url" : "appList.html#1",
            "text" : "应用管理",
            "leaf" : true,
            "class":""
        }, {
            "id" : "2",
            "url" : "scheduleListUserAll.html#2",
            "text" : "排班管理",
            "leaf" : true,
            "class":""
        }, {
            "id" : "3",
            "url" : "mdmUserList.html#3",
            "text" : "用户管理",
            "leaf" : true,
            "class":""
        }, {
            "id" : "4",
            "url" : "userList.html#4",
            "text" : "系统设置",
            "leaf" : true,
            "class":""
        }
    ];

    /**
     * 用户管理菜单配置参数
    **/
    var userMenu = [
        {
            "id" : "6_1",
            "url" : "service.html",
            "text" : "服务管理",
            "class":"",
            "leaf" : true
        },{
            "id" : "6_2",
            "url" : "login.html",
            "text" : "账户设置",
            "class":"",
            "leaf" : true
        },{
            "id" : "6_2",
            "url" : "javascript:;",
            "text" : "",
            "class":"divider",
            "leaf" : true
        },
        {
            "id" : "6_2",
            "url" : "login.html",
            "text" : "注销",
            "leaf" : true,
            "class":"",
        } 
    ];

    /**
     * 顶部导航栏
    **/
    var header1Arr = [
            '<nav class="navbar navbar-default privite-navbar-fixed " role="navigation">',
              '<div class="container-fluid">',
                '<div class="navbar-header">',
                  '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">',
                    '<span class="sr-only">Toggle navigation</span>',
                    '<span class="icon-bar"></span>',
                    '<span class="icon-bar"></span>',
                    '<span class="icon-bar"></span>',
                  '</button>',
                  '<a class="navbar-brand" href="javascript:;">NQSksy EMM</a>',
                '</div>',
                '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">',
                  '<ul class="nav navbar-nav">'
    ];

    var header2Arr = [
                  '</ul>',
                  '<ul class="nav navbar-nav navbar-right">',
                    '<li><a href="#">当前登录用户:</a></li>',
                    '<li class="dropdown">',
                      '<a href="#" class="dropdown-toggle" id="userName" data-toggle="dropdown"><span class="user_name">...</span><span class="caret"></span></a>',
                      '<ul class="dropdown-menu" role="menu">'
    ];
    var header3Arr = [
                      '</ul>',
                    '</li>',
                  '</ul>',
                '</div>',
              '</div>',
            '</nav>'
    ];

    /**
     * 页面脚部结构
    **/
    var footerHtml = [
            '<footer class="bs-footer" role="contentinfo">',
                '当前版本:V 0.5.2.80',
            '</footer>'
    ];

    /**
     * lodding效果html结构
    **/
    var loddingHtmlArr = [
            '<div id="loadingModalMes" class="modal fade bs-example-modal-lg mylodding" tabindex="-1"  role="dialog"  aria-hidden="true">',
                '<div class="modal-dialog modal-lg">',
                    '<div class="modal-content">',
                        '<div class="myContent">正在加载...</div>',
                    '</div>',
                '</div>',
            '</div>'
    ];

    /**
     * 导航html结构对象
    **/
    var menuhtmlJson = {
        header1Arr:header1Arr,
        header2Arr:header2Arr,
        header3Arr:header3Arr,
        footerHtml:footerHtml
    };

    /**
     * html结构对象
    **/
    var htmlJson = {
        loddingHtmlArr:loddingHtmlArr
    };


    module.exports = {

        BasePath:BasePath,
        menuJson:menuJson,
        httpPort:httpPort,
        menuhtmlJson:menuhtmlJson,
        userMenu:userMenu,
        htmlJson:htmlJson
        
    };

});