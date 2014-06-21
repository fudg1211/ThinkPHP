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
<form method="POST" id="form" action="./addSave?projectId=<?php echo ($_GET['projectId']); ?>">
    <table>
        <tr>
            <td>接口名称：</td>
            <td>
                <input class="input-t" name="name" type="text" maxlength="120" data-validator='{"required":1,"messages":{"required":"请输入接口名称"}}'/>
                <span class="red">*</span>
            </td>
        </tr>
        <tr>
            <td>接口描述：</td>
            <td>
                <textarea class="input-t middle" name="desc" type="text" maxlength="250"></textarea>
            </td>
        </tr>
        <tr>
            <td class="tr">参数：</td>
            <td>
                <textarea class="input-t middle" name="params" id="params" type="text" style="height: 250px;"  data-validator='{"required":1,"messages":{"required":"请输入接口参数"}}'></textarea>
                <span class="red">*</span>
            </td>
        </tr>
        <tr>
            <td class="tr">返回：</td>
            <td>
                <textarea class="input-t middle" name="result" type="text" style="height: 200px;"  data-validator='{"required":1,"messages":{"required":"请输入放回内容"}}'></textarea>
                <span class="red">*</span>
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="button" id="submitButton" class="orangeButton" value=" 保 存 "/>
                <input type="submit" class="hide"/>
            </td>
        </tr>
    </table>
</form>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<script type="text/javascript">
    requirejs([ 'apiAdd' ], function() {
    });
</script>

</body>
</html>