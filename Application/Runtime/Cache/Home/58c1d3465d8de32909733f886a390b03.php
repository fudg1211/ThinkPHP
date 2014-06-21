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

<div class="wrapper">
    <h1 class="title"><?php echo ($project["name"]); ?></h1>
    <hr>
    <div class="row">
        <div class="span12">
                <?php if(is_array($rows)): foreach($rows as $key=>$item): ?><h4 id="h4_4"><?php echo ($item["name"]); ?></h4>
                    <pre><code><?php echo (trim($item["desc"])); ?>
                        <p>【参数】</p><p><?php echo (trim($item["paramsFormat"])); ?></p>
                        <p>【返回】</p><p><?php echo (trim($item["result"])); ?></p></code></pre><?php endforeach; endif; ?>
        </div>
    </div>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<script type="text/javascript">
//    requirejs([ 'index' ], function () {
//    });
</script>

</body>
</html>