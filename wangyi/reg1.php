<?php
$pdo=new PDO("mysql:host=localhost;dbname=member","root","");
//如果是验证用户名
if($_POST['flag']=="checkMsg"){
    $sql="select * from member where mobile='".$_POST['mobile']."' and pwd='".md5($_POST['pwd'])."'";
    $query=$pdo->query($sql);
    $username=$query->fetchObject();
    if($username){
        echo "ok";
    }else{
        echo "failed";
    }
}
//注册
if($_POST['flag']=='reg'){
    $sql="insert into member(mobile,pwd,regTime)values('".$_POST['mobile']."','".md5($_POST['pwd'])."',now())";
    echo $sql;
    /*$result=$pdo->query($sql);
    if($result){
        echo "ok";
    }else{
        echo "failed";
    }*/
}
?>