
## 了解HTML的定义、概念、发展简史

### 定义 & 概念：

>HTML 是一种标记语言（markup language）。它告诉浏览器如何显示内容。HTML把内容（文字，图片，语言，影片等等）和「presentation」（这个内容是如何显示，比如文字用什么颜色显示等等）分开。HTML使用预先定义的元素集合来识别内容形态。 元素包含一个以上的标记来包含或者表达内容。标记利用尖括号表示，而结束标记（用来指示内容尾端）则在前面加上斜线。

### 发展简史：

>蒂姆·伯纳斯-李，一名CERN（欧洲核子研究组织）的物理学家，在80年代后期设计了一种能在网路上分享文档的方式。在这之前，网路上沟通的方式仅限于纯文本传递，比如：电子邮件、FTP(文件传输协议)和Usenet讨论版。HTML是利用内容档案储存至中央服务器的方式，然后再将内容透过浏览器传递至本机工作站。 它简化了内容存取的方式，也让更多丰富内容能够显示（诸如较复杂的文本格式与图片的显示）。HTML 源自于SGML——它是一种复杂的文档结构定义和内容描述（文本或图像）语法；从HTML5起，HTML不再坚守SGML的语法。

HTML 的全称为  HyperText Markup Language (超文本标记语言) , 它是网页的基础，目前由[万维网](http://www.w3.org/) 和 [网页超文本技术工作小组(WHATWG)](https://whatwg.org/) 维护, WHATWG认为HTML是一个“活着的标准”，它应该不断地在进化。而W3C则致力于维护HTML的“多个版本快照”，即当前最新的版本[HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)和HTML的进化版[HTML 5.2](http://w3c.github.io/html/)。

## 掌握常用HTML标签的含义、用法

[HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

HTML 的标签按照功能可以划分得很清晰:

* 根元素 html
* 文档元数据 base head link meta title style
* 内容分区 header footer article section nav h1-h6 address 
* 文本内容 div ol ul dl li ol dt dd p 
* 内联文本语义 a i span strong code 
* 图片和多媒体 img audio video 
* 内嵌内容 embed object 
* 脚本 canvas script 
* 编辑标识 del  ins
* 表格内容 table tbody caption
* 表单 form input output textarea select option
* 交互元素 details dialog menu
* Web 组件 template slot 
* 过时的和弃用的元素 frame


## 能够基于设计稿来合理规划HTML文档结构 & 理解语义化，合理地使用HTML标签来构建页面

使用 html 实现如[图片](http://7xrp04.com1.z0.glb.clouddn.com/task_1_1_1.jpg)所示html文档结构

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>task_1_1_1</title>
</head>
<body>
	<h1>网站一级标题</h1>
	<ul>
		<li><a href="#">导航链接一</a></li>
		<li><a href="#">导航链接二</a></li>
		<li><a href="#">导航链接三</a></li>
		<li><a href="#">导航链接四</a></li>
	</ul>
	<article>
		<h2>文章一级标题</h2>
		<h3>文章二级标题</h3>
		<address><span>文章作者</span> <span>文章发布时间</span></address>
		<p>这是一个段落</p>
		<p>这是一个段落<a href="http://ife.baidu.com">这里有一个链接连接到ife.baidu.com</a></p>
		<p>这是一个段落</p>
		<p>这是一个段落</p>
		<img src="./person.jpg" alt="a picture">
		<p>这是一个段落</p>
		<p>这是一个段落<a href="http://ife.baidu.com" target="_blank">这里有一个链接点击后打开到新窗口连接到ife.baidu.com</a></p>
	</article>
	<article>
		<h2>另一篇文章一级标题</h2>
		<h3>文章二级标题</h3>
		<address><span>文章作者</span> <span>文章发布时间</span></address>
		<p>这是一个段落</p>
		<p>这是一个段落<a href="http://ife.baidu.com">这里有一个链接连接到ife.baidu.com</a></p>
		<p>这是一个段落</p>
		<p>这是一个段落</p>
		<img src="./person.jpg" alt="a picture">
		<ul>
			<li>列表项目一</li>
			<li>列表项目二</li>
			<li>列表项目三</li>
			<li>列表项目四</li>
		</ul>
		<h3>图片</h3>
		<p>好看的图片</p>
		<img src="./person.jpg" alt="a picture">
		<p>好看的图片</p>
		<img src="./person.jpg" alt="a picture">
		<p>好看的图片</p>
		<img src="./person.jpg" alt="a picture">
		<p>好看的图片</p>
		<img src="./person.jpg" alt="a picture">
		<p>好看的图片</p>
		<img src="./person.jpg" alt="a picture">
	</article>
	<article>
		<h2>最后一篇文章一级标题</h2>
		<h3>文章二级标题</h3>
		<address><span>文章作者</span> <span>文章发布时间</span></address>
		<ol>
			<li>列表项目一</li>
			<li>列表项目二</li>
			<li>列表项目三</li>
			<li>列表项目四</li>
		</ol>
		<p>下面是一个表格，给表格加了一个 border="1"好让你看出是一个表格</p>
		<table border="1">
			<thead>
				<tr>
					<th>表头</th>
					<th>表头</th>
					<th>表头</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>表内容单元格</td>
					<td>表内容单元格</td>
					<td><a href="#">操作</a></td>
				</tr>
				<tr>
					<td>表内容单元格</td>
					<td>表内容单元格</td>
					<td><a href="#">操作</a></td>
				</tr>
				<tr>
					<td>表内容单元格</td>
					<td>表内容单元格</td>
					<td><a href="#">操作</a></td>
				</tr>
				<tr>
					<td>表内容单元格</td>
					<td>表内容单元格</td>
					<td><a href="#">操作</a></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>总计</td>
					<td colspan="2">1000</td>
				</tr>
			</tfoot>
		</table>
	</article>
	<nav>
		<h2>这里以后是一个侧栏，这是侧栏的标题</h2>
		<form action="">
			<fieldset>
				<legend>侧栏注册窗口标题</legend>
				<label for="mail">请输入邮箱地址</label>
				<input type="text" placeholder="这是一个本地输入框" name="mail">
				<p>邮箱地址请按要求格式输入</p>	
			</fieldset>
			<fieldset>
				<label for="password">请输入密码</label>
				<input type="password" name="password" placeholder="这是一个本地输入框">
				<label for="rpassword">请重复输入密码</label>
				<input type="password" name="rpassword" placeholder="这是一个本地输入框">
			</fieldset>
			<fieldset>
				<label>性别：</label>
				<label for="sex1"><input type="radio" name="sex" value="1" id="sex1">男</label>
				<label for="sex2"><input type="radio" name="sex" value="2" id="sex2">女</label>
				
				<label for="city">城市：</label>
				<select>
					<option value ="volvo">北京</option>
					<option value ="saab">杭州</option>
					<option value="audi" selected="selected">上海</option>
				</select>
			
				<label for="like">爱好：</label>
				<label for="likesport"><input type="checkbox" name="like" value="sport" id="likesport">运动</label>
				<label for="likeart"><input type="checkbox" name="art" value="sport" id="likeart">艺术</label>
				<label for="likesce"><input type="checkbox" name="sce" value="sport" id="likesce">科学</label>
			
				<label for="">个人描述</label>
				<textarea name="intro" id="formintro" cols="30" rows="10" placeholder="这是一个多行输入框"></textarea>
			</fieldset>
			<button type="submit">确认提交</button>
		</form>
	</nav>
	<footer>版权所有@</footer>
</body>
</html>
```

### 一些常见的HTML元素：
* <strong>和<b>，<em>和<i>，其效果差不多是一样的，但是前者的语义化更加友好
* 白色空间折叠：当浏览器遇到两个或者两个以上的白色空间元素（空格，换行）时，会折叠成一个空格。自己编码时注意换行应该用<br>。
* 文档中的一些嵌入式内容，比如引用的图片，插图，表格，代码段等，可以作为独立的单元，当这部分转移到附录中或者其他页面时不会影响到主体，这样的元素都可以放在<figure>元素内，而且可以搭配其子元素<figcaption>作很好的元素说明或者备注信息
* img元素最好附带alt信息，即对图片进行文本说明，当图像无法查看时会显示这段文本描述
* table元素现在也有更好的语义化结构元素
    * caption 表格的标题
    * thead 适合放表格的表头行
    * tbody 表格的主体部分
    * tfoot 表格的脚注部分
* form表单元素
    * label标签，为input元素定义标注，改进了表单控件的可用性，当你点击到label标签时，会自动聚焦到对应控件上，label标签一般有两种用法：
        1. label的for属性与控件的id对应
        ```
        <label for="username">
            请输入用户名:
            <input type="text" id="username" name="username">
        </label>
        ```
        2. label内嵌控件，比如
        ```
        <label>请输入用户名<input type="text" id="username" name="username"></label>
        ```
    * 对于表单中的单选radio控件和复选checkbox控件甚至下拉框select控件，可以为某项添加checked属性让其默认选中
    
    
### 关于文档结构：

在学习html5的过程中，知道了一些新的标签，能够更清晰的表达文档的结构（原来都是用div，可能加上id或者class来划分）。举个简单的例子

* html
    * head
        * body
            * header (包含网站的标题，或者logo，SLOGEN之类的)
            * nav （导航栏）
            * main (文档的主要内容，不包含侧边栏、导航栏、版权信息，网站logo等附属信息)
                * article （文档中可以脱离其他部分，独立出来而又完整，甚至可以复用的一部分，通常有自己的标题，当article内嵌article时，里外层的内容应该是相关的，比如一篇微博和它的评论）
                * section (文档中一段主题性内容，通常也有自己的标题，跟article的区别在于他是整体的一部分或者说文章的一节)
            * aside （侧边栏或者嵌入内容，通常认为是独立拆分出来而不受整体影响的一部分，作为主要内容的附属信息，如索引，词条列表，或者页面及站点的附属信息，如广告，作者资料介绍等）
            * footer （页脚，通常包含作者、版权信息或者相关链接等）