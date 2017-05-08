/**
 * Created by Administrator on 2017/4/17.
 */


   window.addEventListener("load",function(){
       var xhr1=new XMLHttpRequest();
       var fd=new FormData();
       var errorMsg='';
//注册验证
    $("#reg_mobile").blur(function(){
          var pattern=/^([1])([3-5]|[7-8])(\d{9})$/;
    if($("#reg_mobile").val()) {
        if (!pattern.test($("#reg_mobile").val())) {
            $("#reg .feedback").css({"display": "block"});
            $("#reg .feedback").html("手机号码格式不正确");
            errorMsg=$("#reg .feedback").html();
            return false;
        }else {
            xhr1.open("post","reg.php");
            fd.append("mobile",$("#reg_mobile").val());
            fd.append("flag","checkmobile");
            xhr1.send(fd);
            xhr1.addEventListener("readystatechange",function(){
                if(xhr1.readyState==4){
                    if(xhr1.status==200){
                        if(xhr1.responseText=="taken"){
                            $("#reg .feedback").css({"display": "block"});
                            $("#reg .feedback").html("手机号码已被占用");
                            errorMsg=$("#reg .feedback").html();
                            return false;
                        }else if(xhr1.responseText=="available"){
                            $("#reg .feedback").css({"display": "block"});
                            $("#reg .feedback").html("手机号码可用");
                            errorMsg='';
                        }
                    }
                }

            })

            }
    }
});

    //设置密码的失去焦点事件，判断密码是否为空
        $("#set_pwd").blur(function(){
                if(errorMsg!=''){
                    return false;
                }else if($.trim($("#set_pwd").val()).length==0){
                    $("#reg .feedback").css({"display": "block"});
                    $("#reg .feedback").html("密码不得为空！");
                    errorMsg=$("#reg .feedback").html();
                    return false;
                }
        });

//点击完成后验证注册信息，信息无误时回到主页，显示注册时的用户名
    $("#finish").click(function(){
        if($.trim($("#yzm").val()).length==0){
            $("#reg .feedback").css({"display": "block"});
            $("#reg .feedback").html("验证码不得为空！");
            errorMsg= $("#reg .feedback").html();
            return false;
        }else if(errorMsg!=''){
            $("#reg .feedback").css({"display": "block"});
            $("#reg .feedback").html("手机格式或密码不正确");
            errorMsg= $("#reg .feedback").html();
            return false;
        }else{
            //当用户名和手机号码符合格式，验证码不为空时执行ajax,判断用户名是否被占用
            var xhr2=new XMLHttpRequest();
            xhr2.open("post","reg.php");
            fd.append("mobile",$("#reg_mobile").val());
            fd.append("pwd",$("#set_pwd").val());
            fd.append("flag","reg");
            xhr2.send(fd);
            xhr2.addEventListener("readystatechange",function(){
                if(xhr2.readyState==4){
                    if(xhr2.status==200){
                        if(xhr2.responseText=="ok"){
                            $("#reg .feedback").css({"display":"block"});
                            location.href="index.html";
                            sessionStorage.setItem("mobile",$("#reg_mobile").val());
                        }else if(xhr2.responseText=="failed"){
                            $("#reg .feedback").css({"display": "block"});
                            $("#reg .feedback").html("注册信息有误！");
                            return false;
                        }
                    }
                }
            })


        }


    });
       //如果获取到sessionstorg,登录注册框消失，获取到的用户名显示
       if(sessionStorage.getItem("mobile")){
           $("#btn_login").css({"display":"none"});
           $("#sus_login").css({"display":"inline-block"});
           $("#sus_login").html(sessionStorage.getItem("mobile"));
           $("#username").html(sessionStorage.getItem("mobile"));
           $("#logout").css({"display":"block"}).html("退出");
       }

       if(getCookie("mobile")){
           console.log(getCookie("mobile"));
           $("#btn_login").css({"display":"none"});
           $("#sus_login").css({"display":"inline-block"}).html(getCookie("mobile"));
           $("#username").html(getCookie("mobile"));
           $("#logout").css({"display":"block"}).html("退出");
       }
       //登录验证
       var d=new Date();
       var expiresDay=new Date(d.setDate(d.getDate()+10));
       //console.log(expiresDay);
       $("#login_btn").click(function(){
           if($.trim($("#login_mobile").val()).length==0){
               $("#login .feedback").css({"display": "block"});
               $("#login .feedback").html("用户名不得为空！");
               errorMsg=$("#login .feedback").html("");
               return false;
           }else if($.trim($("#login_pwd").val()).length==0){
               $("#login .feedback").css({"display": "block"});
               $("#login .feedback").html("密码不得为空！");
               errorMsg=$("#login .feedback").html("");
               return false;
           }else{
               var xhr=new XMLHttpRequest();
               xhr.open("post","reg1.php");
               fd.append("mobile",$("#login_mobile").val());
               fd.append("pwd",$("#login_pwd").val());
               fd.append("flag","checkMsg");
               xhr.send(fd);
               xhr.addEventListener("readystatechange",function(){
                   if(xhr.readyState==4){
                       if(xhr.status==200){
                           if(xhr.responseText=="ok"){
                               if($("#checked")[0].checked){
                               setCookie("mobile",$("#login_mobile").val(),expiresDay);
                                   $("#login").css({"display":"none"});
                                   $(".modal-backdrop").css({"display":"none"});
                                    $("#btn_login").css({"display":"none"});
                                   $("#sus_login").css({"display":"inline-block"});
                                   $("#sus_login").html(getCookie("mobile"));
                                   $("#username").html(getCookie("mobile"));
                                   $("#logout").css({"display":"block"}).html("退出");
                               }else{
                                   setCookie("mobile",$("#login_mobile").val());
                               }
                           }else if(xhr.responseText=="failed"){
                               $("#login .feedback").css({"display": "block"});
                               $("#login .feedback").html("账户或密码错误！");
                               errorMsg=$("#login .feedback").html("");
                           }

                       }
                   }
               })
           }


       });

     //当input获得焦点时，feedback消失，提示语消失
    $(".reg_containter input,.mobil_login input,.email input").focus(function(){
        $(".feedback").css({"display":"none"});
        $(".feedback").html("");
    });

       $("#logout").click(function(){
           removeCookie("mobile");
           $("#btn_login").css({"display":"inline-block"});
           $("#sus_login").css({"display":"none"});
           $("#logout").css({"display":"none"});
           $("#username").html("游客，请登录...");

       })


});