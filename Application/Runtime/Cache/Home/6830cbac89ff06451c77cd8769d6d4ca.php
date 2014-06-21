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

<div class="wrapper">
<form method="POST" class="login" id="form" action="../User/login">
    <table >
        <tr>
            <td>用户名：</td>
            <td>
                <input class="input-t" name="name" type="text" maxlength="60" data-validator='{"required":1,"messages":{"required":"请输入用户名"}}'/>
            </td>
        </tr>
        <tr>
            <td>密码：</td>
            <td>
                <input class="input-t" name="password" type="password" maxlength="30" data-validator='{"required":1,"messages":{"required":"请输入密码"}}'/>
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="button" id="submitButton" class="orangeButton" value=" 登 录 "/>
            </td>
        </tr>
    </table>
</form>
</div>

<script type="text/javascript" src="http://item.koudai.com/js/jquery.js"></script>
<script type="text/javascript" src="http://item.koudai.com/js/require.js" data-main="/ThinkPHP/Public/js/app"></script>

<script type="text/javascript">
    requirejs([ 'user' ], function() {
    });
</script>

</body>
</html>