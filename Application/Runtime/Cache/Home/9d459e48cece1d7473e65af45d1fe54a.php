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
                <li><a class="active" href="/project.html">项目列表</a></li>
            </ul>
        </div>
    </div>
</div>
<link rel="stylesheet" type="text/css" href="/ThinkPHP/Public/Css/index.css?v=140426161232"/>

<div class="wrapper">
<form method="POST" id="form" action="../Project/add">
    <table>
        <tr>
            <td>项目名称：</td>
            <td>
                <input class="input-t" name="name" type="text" maxlength="120" data-validator='{"required":1,"messages":{"required":"请输入项目名称"}}'/>
                <span class="red">*</span>
            </td>
        </tr>
        <tr>
            <td>项目描述：</td>
            <td>
                <textarea class="input-t middle" name="desc" type="text" maxlength="250" data-validator='{"required":1,"messages":{"required":"请输入项目描述"}}'></textarea>
                <span class="red">*</span>
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="button" id="submitButton" class="orangeButton" value="提 交"/>
                <input type="submit" class="none"/>
            </td>
        </tr>
    </table>
</form>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<!--<script type="text/javascript">-->
    <!--requirejs([ 'index' ], function() <?php echo --> <!--;?>);-->
<!--</script>-->

</body>
</html>