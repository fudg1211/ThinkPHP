<?php
namespace Home\Controller;
use Think\Controller;
class ApiController extends Controller {

    public function index(){
        $table = D('list');
        $conditiona['projectId']=I('get.projectId');
        $table->where($conditiona)->select();

        $rows = $table->arr;

        $table_project = M('project');
        $condition['id'] = I('get.projectId');
        $project = $table_project->where($condition)->find();

        $this->assign('project',$project);
        $this->assign('rows',$rows);
        $this->display();
    }

    public function add(){
        $this->display();
    }

    public function addSave(){
        $_POST['projectId'] = I('get.projectId');
        $_POST['author'] = I('session.name');
        $table = M('list');
        if(!$table->create()){
            errorBack($table->getError());
            exit();
        }

        $table->add();
        redirect('index?projectId='.$_POST['projectId']);
    }


    public function edit(){
        $id = I('get.id');
        $table = D('list');

        $condition['id'] = $id;
        $row = $table->where($condition)->find();


        $this->assign('row',$row);
        $this->display();
    }

    public function editSave(){
        $id = I('get.id');
        $table = D('list');

        $condition['id'] = $id;
        $row = $table->where($condition)->find();


        if(!$row){
            errorBack('更新失败，没有这条数据');
            exit();
        }

        if(!$table->create()){
            errorBack($table->getError());
            exit();
        }


        $table->where("id='".$id."'")->save();
        redirect('index?projectId='.$row['projectId']);
    }

    public function del(){
        $id = I('get.id');
        $table = D('list');

        $condition['id'] = $id;
        $row = $table->where($condition)->find();

        if(!$row){
            errorBack('删除失败，没有这条数据');
            exit();
        }

        $table->where("id='".$id."'")->delete();
        redirect('index?projectId='.$row['projectId']);
    }
}