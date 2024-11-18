# 弦月档案

由两个多月了, 我又重写了这个 _弦月档案_

实际上最初的 _弦月档案_ 只是个人的练习作品, 后来经 _Qubit_ ~~欺负~~ 指教, 改正成了上一版的样子

上一版 _弦月档案_ 还有 _GreatFood404_ 做的圆角美化, _yuhan2680_ 帮忙写的 _README.md_

但是现在又出现一些新的问题, 所以, 我直接 ~~删库跑路~~ 重写了这个项目

## 文件

1. > index.html 
	
	网页主入口, 包含 _#title_ , _#index_ , _#main_ , _#bottom_ 四部分
	
	1. > _div#title_

		网页标题
		
	2. > _div#index_
		
		选择排序模式, 按时间排序 / 按类型排序
		
	3. > _div#main_
		
		主页面, 表头 + 打印的表格内容, 默认有一行占位
		
	4. > _div#bottom_
		
		夹带私货, 这次大胆把自己的信息写在上面了, 不怕你们修改

2. > index.css
	
	_index.html_ 配套 StyleSheet

3. > index.js
	
	index.html 配套脚本
	
	1. > 默认流

		从 _list_ 读取数据, 填入 _timeList_ 和 _typeList_ 中, 并将 _timeList_ 和 _typeList_ 冒泡排序
		
	2. > _getTypeIndex()_
			
		输入_type_名称, 返回类型数值用于排序(可手动修改顺序)
		
	3. > _setIndex()_
		
		设置排序方式并实现
		
		先改变按钮颜色, 清空 _div#main-table_ , 从 _timeList_ 或 _typeList_ 中按顺序读取并填入
		
	4. > _genRow()_
		
		获取序号和对象, 读取对象数据, 向 _div#main-table_ 填入新行
		
	5. > _getTypeName()_
		
		输入_type_名称, 返回类型中文名用于显示
		
	6. > _playVideo()_
		
		打开B站播放对应视频
		
	7. > _getLitematica()_
		
		获取投影文件
		
		投影文件有三张获取方式, 直接下载, 大文件蓝奏云网盘下载, 接入杂鱼 _Qubit_ 的投影生成器

4. > data.js

	优先于 _index.js_ 加载, 存储 _list_
	
	对于_list_中对象详见 _data.js_ 开头的注释

## Q&A

1. > 为什么不使用json存储数据
	
	json文件无法直接读取, 若使用 _Fetch API_ 读取, 因网络问题很容易失败
	
2. > 为什么不使用两种读取方式
	
	上一版使用了两种读取方式, 基本上毫无作用
