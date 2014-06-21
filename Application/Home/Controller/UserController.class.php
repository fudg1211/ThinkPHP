<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller {

    public function index(){
        if($_SESSION['name']){
            redirect('../Index/index',3,'登录成功!');
        }else{
            $this->display();
        }
    }

    public function login(){
        if(!$_POST['name']){
            errorBack('请输入用户名');
            exit;
        }

        if(!$_POST['password']){
            errorBack('请输入密码');
            exit;
        }

        $table = M('user');

        $name = $_POST['name'];
        $password = $_POST['password'];
        $row = $table->where('name="'.$name.'"')->find();


        if($row['password']==md5($password)){
            $_SESSION['name'] = $row['name'];

            unset($row['password']);
            $_SESSION['userInfo'] = $row;
        }else{
            errorBack('用户名或密码错误');
        }
    }
}