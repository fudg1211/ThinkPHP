<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>口袋杭州api系统</title>
    <link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/ui/bootstrap.min.css?v=140426161232"/>
    <link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/Public/public.css?v=140426161232"/>
</head>
<body>
<div class="navbar">
    <div class="navbar-inner">
        <div class="container"><a class="brand" href="/">口袋web文档管理</a>
            <ul class="nav">
                <li><a class="active" href="http://localhost/ThinkPHP/index.php/Home/Index/index">项目列表</a></li>
            </ul>
        </div>
    </div>
</div>
<style type="text/css">
    .code-title {
        text-indent: -8px;
    }
</style>

<div class="wrapper">
    <h1 class="title"><?php echo ($project["name"]); ?> <a href="add?projectId=<?php echo ($project["id"]); ?>">增加</a> </h1>
    <hr>
    <div class="row">
        <div class="span12">
            <?php if(is_array($rows)): foreach($rows as $key=>$item): ?><h4 id="h4_4"><?php echo ($item["name"]); ?> <a href="edit?id=<?php echo ($item["id"]); ?>">编辑</a> <a class="J_del" href="del?id=<?php echo ($item["id"]); ?>">删除</a></h4>
                    <pre><code><div class="code-title">【描述】</div><?php if($item["desc"] != ''): echo (trim($item["desc"])); ?><br/><?php endif; ?>
                        <div class="code-title">【参数】</div><div><?php echo (trim($item["paramsFormat"])); ?></div>
                        <div class="code-title">【返回】</div><div><?php echo (trim($item["result"])); ?></div></code></pre><?php endforeach; endif; ?>
        </div>
    </div>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<script type="text/javascript">
    requirejs();
</script>

</body>
</html>