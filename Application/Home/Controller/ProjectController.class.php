<?php
namespace Home\Controller;
use Think\Controller;
class ProjectController extends Controller {

    public function index(){
        $this->display();
    }

    public function add(){
        $table = D('Project');
        if(!$table->create()){
            errorBack($table->getError());
            exit();
        }

        $table->author='sdf';
        if($table->add()){
            redirect('../Index/index');
        }
    }
}