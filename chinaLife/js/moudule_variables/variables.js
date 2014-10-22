define(function (require,exports,module){

    var BasePath ="http://218.247.15.102/appfuse_emm_backend/api/v1/";

    /**
     * 系统菜单数据
     */
    var menuJson = [ {
        "id" : "0",
        "url" : "appProjectList.html",
        "text" : "项目管理",
        "leaf" : true
    },{
        "id" : "1",
        "url" : "appList.html",
        "text" : "应用管理",
        "leaf" : true
    }, {
        "id" : "2",
        "url" : "scheduleListUserAll.html",
        "text" : "排班管理",
        "leaf" : true
    }, {
        "id" : "3",
        "url" : "mdmUserList.html",
        "text" : "用户管理",
        "leaf" : true
    }, {
        "id" : "4",
        "url" : "userList.html",
        "text" : "系统设置",
        "leaf" : true
    }, {
        "id" : "5",
        "url" : "",
        "text" : "下拉菜单",
        "leaf" : false,
        "child" : [ {
            "id" : "6_1",
            "url" : "service.html",
            "text" : "服务管理",
            "leaf" : true
        }, {
            "id" : "6_2",
            "url" : "login.html",
            "text" : "账户设置",
            "leaf" : true
        } ]
    } ];


    module.exports = {

        BasePath:BasePath,
        menuJson:menuJson
        
    };

});