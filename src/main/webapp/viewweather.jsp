<%@ page language="java" import="java.util.*"
	import="com.education.experiment.commons.UserBean" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>云服务平台</title>
		<link href="css/base.css" rel="stylesheet" type="text/css" />
		<link href="css/module/header.css" rel="stylesheet" type="text/css" />
		<link href="css/module/title.css" rel="stylesheet" type="text/css" />
		<link href="css/module/pageSkin.css" rel="stylesheet" type="text/css" />
		<link href="css/module/navi002.css" rel="stylesheet" type="text/css" />
		<link href="css/module/reportOA.css" rel="stylesheet" type="text/css" />
		<link href="css/module/boxSearch.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery-1.8.0.js"></script>
		<script type="text/javascript">
	$(document).ready(function() {
		$("#btnCancel").click(function() {
			$("#text_box").val("");
			$("#text_box").focus();
		});
	});
</script>
		<!--ie6png图片透明补丁-->
		<!--[if IE 6]>
    <script type="text/javascript" src="js/DD_belatedPNG.js"></script>
    <script type="text/javascript">
        DD_belatedPNG.fix('#header,.cur,.btn,.iconUser,.iconDepartment,.iconIdea,.iconKey,.iconQuit,.iconSet,.iconAbout,.iconTool,.recall,.case,.approve,.statistics,.https,.file,.compareForm,.webmaster,.diary,#up,#down,.setKeywords a,.icon,.select,.iconMore,.barSearch'); //放置css选择器
    </script>
    <script type="text/javascript">
        //防止抖动
        // <![CDATA[
        if ((window.navigator.appName.toUpperCase().indexOf("MICROSOFT") >= 0) && (document.execCommand)) try {
            document.execCommand("BackgroundImageCache", false, true);
        }
        catch(e) {}
        // ]]>
    </script>
<![endif]-->
		<!--ie6png图片透明补丁-->
	</head>
	<body id="wrapper">
		<!--主体开始-->
		<div id="content" class="clearfix">
			<div id="title">
			
				<h1>
					气象数据分析云
				</h1>
			</div>

			<!--列表开始-->
			<div id="boxSearch">
				<div class="subNavi">
					<ul>
						<li>
							<a href='downloadweather.jsp'>示例文件下载</a>
						</li>
						<li>
							<a href='uploadweather.jsp'>气象数据上传</a>
						</li>
						<%
							UserBean user = (UserBean) session.getAttribute("user");
							if (user.getUserId().equals("admin")) {
						%>
						<li>
							<a href='deleteweather.jsp'>气象数据删除</a>
						</li>
						<li class="current">
							<a href='previewweatherdata?sign=0'>气象数据云计算</a>
						</li>
						<%
							}
						%>
						<li>
							<a href='previewweatherresult'>气象结果查看</a>
						</li>
					</ul>
				</div>
				<div id="selectSet">
					<!--默认选项开始-->
					<dl class="list clearfix">
						<%
							int datacount = (Integer) request.getAttribute("datacount");
							if (datacount > 0) {
						%>
						<span>数据文件个数：</span>
						<span class="input text">&nbsp;<%=datacount%>&nbsp;</span>个
						<%
							} else {
						%>
						<span>当前数据文件内容：</span>
						<%
							}
						%>
					</dl>
					<%
						String result = (String) request.getAttribute("result");
					%>
					<%=result%>
					<!--默认选项结束-->
					<br />
					<br />
					<div class="foot">
						<%
							if (datacount > 0) {
						%>
						<form action="weatherparsing" enctype="multipart/form-data"
							method="get">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input name="" type="submit" value="开始云计算" />
						</form>
						<%
							}
						%>
					</div>
				</div>
			</div>

			<!--列表结束-->
			<!--列表尾部开始-->

			<!--列表尾部结束-->
		</div>
		<!--主体结束-->
		<!--尾部开始-->
		<div id="footer"></div>
		<!--尾部结束-->
	</body>
</html>
<!--
<html>
	<body>
		<form action="download" enctype="multipart/form-data"
			method="get">
			<input type="text" name="filename" />
			<br />
			<input type="submit"/>
		</form>
	</body>
</html>-->