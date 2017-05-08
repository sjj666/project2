<?php
$pdo=new PDO("mysql:host=localhost;dbname=member","root","");
//如果是验证用户名
if($_POST['flag']=="checkmobile"){
    $sql="select * from member where mobile='".$_POST['mobile']."'";
    $query=$pdo->query($sql);
    $username=$query->fetchObject();
    if($username){
        echo "taken";
    }else{
        echo "available";
    }
}
//注册
if($_POST['flag']=='reg'){
    $sql="insert into member(mobile,pwd,regTime)values('".$_POST['mobile']."','".md5($_POST['pwd'])."',now())";
    $result=$pdo->query($sql);
    if($result){
        echo "ok";
    }else{
        echo "failed";
    }
}
?>