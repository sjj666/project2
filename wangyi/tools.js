/*工具*/
/**
 * 给所有小于10的数字加0
 */
    function addZero(num){
        if(typeof num!="number"){
            num="addZero类型错误";

        }else{
            num=num<10? "0"+num:num;
        }
          return num;
    }

 /*获取id元素*/
    function getID(_id){
        var element=document.getElementById(_id);
        if(element){
            return element;
        }else{
            return "元素为空"
        }
    }

  /*创建表格
  * @param{String} row
  * @param{String} col
  * */
  function creatTable(row,col){
      var str="<table>";
      for(var i=0;i<row;i++){
          str+="<tr>";
          for(var j=0;j<col;j++){
              str+="<td>j</td>";
          }
          str+="</tr>";
      }
      str+="</table>";
      return str;
  }

/*获取中文星期*/
function weekday() {
    var d=new Date();
    var weekday=d.getDay();
    var week=new Array( "日","一","二","三","四","五","六");
    return "星期"+week[weekday];
}
/*获取窗口尺寸
* @return{对象}*/
function getWindowSize(){
      return{
          "width":document.documentElement.clientWidth||document.innerWidth,
          "height":document.documentElement.clientHeight||window.innerHeight
      }
}
//获取滚动条的宽度和高度
function getScrollSize(){
    return{
        "top":document.documentElement.scrollTop||document.body.scrollTop,
        "left":document.documentElement.scrollLeft||document.body.scrollLeft
    }

}
//元素居中,针对当前的窗口居中
function center(element){
    element.style.left=((getWindowSize().width-element.offsetWidth)/2+getScrollSize().left)+"px";
    element.style.top=((getWindowSize().height-element.offsetHeight)/2+getScrollSize().top)+"px"
}

//事件对象的兼容性处理方式,IE下：window.event
//其他：evt
/*function handleEvent(_evt){
    return _evt=_evt||window.event;
}*/

function ac(evt){
    //判断IE浏览器是否为真
    if(window.event){
        return window.event;
    }else{
        return evt;
    }
}
/*跨浏览器阻止默认动作
*
* */
function preventDefault(evt){
    if(window.event){
        //ie下阻止默认动作
        window.event.returnValue=false;
    }else {
        //其他浏览器下阻止默认动作
        evt.preventDefault();
    }
}
/*跨浏览器阻止事件冒泡*/
function stopPropagation(evt){
    if(window.event){
        window.event.cancelBubble=true;
    }else{
       evt.stopPropagation();
    }
}

function fadeOut(element){
        var num=1;
        var timer=setInterval(function() {
        num=num-0.03;
        //标准浏览器
        if(typeof element.style.opacity=='string')
            element.style.opacity=num;
        else{
            element.style.filter="alpha(opacity="+num*100+")";
        }

        if (num<= 0) {
            clearInterval(timer);
            //console.log(timer);
        }
    },10);
     }


//用户信息反馈页面
/*
*     <style>
 *{
 font-size:14px;
 font-family:微软雅黑;
 color: #ffa781;

 }
 .redirect{
 width:300px;
 height:150px;
 border:1px solid #ddd;
 position:absolute;
 box-shadow:0 0 3px #ddd;
 z-index:100000;
 }
 .redirect_header{
 height:30px;
 border-bottom:1px solid #ddd;
 line-height:30px;
 }
 .redirect_body{
 height:90px;
 line-height:90px;
 text-align:center;
 }
 .redirect_footer {
 height: 30px;
 border-top:1px solid #ddd;
 text-align:center;
 line-height:30px;
 }
 .progress_bar{
 height:20px;
 background: rgba(32, 156, 255, 0.35);
 width:0%;
 transition:width 0.5s linear;
 }
 #countdown{
 display:inline-block;
 width:15%;
 padding-left:85px;
 }
 #msg{
 display:inline-block;
 width:50%;
 padding-left:15px;
 }
 </style>
 <div class="redirect">
 <div class="redirect_header">
 <span id="msg">删除成功</span>
 <span id="countdown">

 </span></div>
 <div class="redirect_body">
 <div class="progress_bar"></div>
 <div class="percent">0%</div>
 </div>
 <div class="redirect_footer">页面跳转中，请稍后...</div>
 </div>
 <script>
 redirect("添加商品成功",1);
 /*
 * 重定向
 * 反馈信息
 * 不同状态有不同颜色，有跳转和不跳转两种选择
 * @param_mag
 * */
function redirect(_msg,flag){
    var redirect=document.querySelector(".redirect");
    var countdown=document.querySelector("#countdown");
    var mag=document.querySelector("#msg");
//    类名称为percent的div
    var percent=document.querySelector(".percent");
    var progress_bar=document.querySelector(".progress_bar");
    if(flag==1){
        mag.innerHTML=_msg;
        mag.style.color="green";
    }else if(flag==0){
        mag.innerHTML=_msg;
        mag.style.color="red";
    }
//        把用户的信息显示在header上
    center(redirect);
    var durtion=15;
    var p=0;
    var timer=setInterval(function(){
        durtion--;
        if(durtion==0){
            clearInterval(timer);
            redirect.style.display="none";
            if(flag==1){
                location.href="https://www.baidu.com/";
            }
        }
//        倒计时的值赋给countdown的值
        countdown.innerHTML=durtion;
        p++;
//        把求出来的百分比赋给div,显示在页面上
        percent.innerHTML=parseInt(p/15*100)+"%";
//        设置进度条的百分比
        progress_bar.style.width=parseInt(p/14*100)+"%";
    },200)
}


// 登录框居中函数
       function Center(element){
           element.css({
               "left":(($(window).width()-element.width())/2+$("body").scrollLeft())+"px",
                "top":(($(window).width()-element.height())/2+$("body").scrollTop())+"px"
          })
       }


//修剪空格
function trim(content){
//        内容之前和之后的空格
    var pattern=/^\s(.+?)\s$/g;
    content=content.replace(pattern,"$1");
    return content;
}

//邮箱验证
function email_validte(content,tip){
    var pattern=/^[a-z0-9]+([\._-][a-z0-9]+)?@[a-z0-9]+([_-][a-z0-9]+)?\.[a-z]{2,5}$/i;
    //qq.a@a-1.qq
    if(content){
        if(!pattern.test(content)){
            tip.html("邮箱格式不正确！");
        }else{
            tip.html("邮箱格式正确！");
        }
    }
}

//密码验证
function pwd_validate(content){
    /*4:密码为空
     * 3.低
     * 2.中
     * 1.较高
     * 0.高
     * */
    var num=0;
    if(!/[\d]/.test(content)){
        num+=1;
    }
    if(!/[a-z]/.test(content)){
        num+=1;
    }
    if(!/[A-Z]/.test(content)){
        num+=1;
    }
    if(!/[\W]/.test(content)){
        num+=1;
    }
    return num;
}

//手机号码格式验证
function mobile_validate(content) {
    var pattern = /^([1])([3-5]|[7-8])(\d{9})$/;
    if (content) {
        if (!pattern.test(content)) {
            return false;
        } else {
        }
        //return true;
    }
}

//用户名格式验证

function username_validate(content) {
    var pattern = /^([a-zA-Z]{3})([a-z0-9]{2})(\d)$/;
    if (content) {
        if (!pattern.test(content)) {
            return false;
        } else {
        }
        //return true;
    }
}


//验证码格式验证
function yzm_validate(content) {
    var pattern = /^(\d{6})$/;
    if (content) {
        if (!pattern.test(content)) {
            return false;
        } else {
        }
        //return true;
    }
}

/*设置cookie
*
*
*
*
* */
function setCookie(_name,_value,_expires,_path,_domain,_secure){
    var cookieText=_name+"="+encodeURI(_value);
    //判断_expires是否是日期对象的实例
    //a instanceof b:a是b的对象实例
    //var d=new Date();d就是Date的实例;
    if(_expires instanceof Date){
        cookieText+=";expires="+_expires;
    }
    //如果路径参数为真
    if(_path){
        cookieText+=";path="+_path;
    }
    //如果主机名参数为真
    if(_domain){
        cookieText+=";domain="+_domain;
    }
    //如果安全参数为真
    if(_secure){
        cookieText+=";secure";
    }
    document.cookie=cookieText;
    //return cookieText;
}

/*获取cookie*/
function getCookie(_name){
    _name+="=";
    var str=document.cookie;
    var strStart=str.indexOf(_name);
    var strEnd=str.indexOf(";",strStart);
    if(strEnd==-1){
        strEnd=str.length;
    }
    return decodeURI(str.substring(strStart+_name.length,strEnd));
}

/*移除cookie*/
function removeCookie(_name){
      document.cookie=_name+"=;expires="+new Date(0);

}