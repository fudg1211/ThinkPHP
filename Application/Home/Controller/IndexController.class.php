<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    public function index(){
        $table = D('Project');
        $data = $table->select();

        $this->assign('data',$data);
        $this->display();
    }
}