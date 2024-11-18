// list元素写入序号, 排序时顺序改变, index最为唯一标识符
for (let i in list) {
	list[i].index = i
}

var timeList = [...list];
var typeList = [...list];

// 按时间排序
for (let i = 0; i < timeList.length - 1; i ++) {
	for (let j = 0; j < timeList.length - i - 1; j ++) {
		let a = parseInt(timeList[j].date.replace(/[^0-9]/g, ""), 10);
		let b = parseInt(timeList[j + 1].date.replace(/[^0-9]/g, ""), 10);
		
		if (a < b) {
			let temp = timeList[j];
			timeList[j] = timeList[j + 1];
			timeList[j + 1] = temp;
		}
	}
}

// 按类型排序
for (let i = 0; i < typeList.length - 1; i ++) {
	for (let j = 0; j < typeList.length - i - 1; j ++) {
		let a = getTypeIndex(typeList[j]);
		let b = getTypeIndex(typeList[j + 1]);
		
		if (a > b) {
			let temp = typeList[j];
			typeList[j] = typeList[j + 1];
			typeList[j + 1] = temp;
		}
	}
}
// 获取类型对应排序数值
function getTypeIndex(obj) {
	switch (obj.type) {
		case "3-way" : return 0;
		case "eater" : return 1;
		case "gap" : return 2;
		case "block" : return 3;
		case "tunnel" : return 4;
		case "water" : return 5;
		case "sand" : return 6;
		case "quarry" : return 7;
		case "bedrock" : return 8;
		case "others" : return 9;
	}
}

// 设置排序方式
function setIndex (type) {
	// 改变按钮颜色
	if (type == 0) {
		document.getElementById("index-btn-time").className = "index-btn-pressed";
		document.getElementById("index-btn-type").className = "index-btn";
	} else {
		document.getElementById("index-btn-type").className = "index-btn-pressed";
		document.getElementById("index-btn-time").className = "index-btn";
	}
	
	// 清空div#main-table
	document.getElementById("main-table").innerHTML = "";
	
	// 按排序方式填入HTML
	if (type == 0) {
		for (let i in timeList) {
			genRow(i, timeList[i]);
		}
	} else {
		for (let i in typeList) {
			genRow(i, typeList[i]);
		}
	}
}

function genRow (i, obj) {
	const index = obj.index;
	const date = obj.date;
	const type = obj.type;
	const name = obj.name;
	const bv = obj.bv;
	const rowHTML = `
		<div class="main-row">
			<div class="main-index">${+i + 1}</div>
			<div class="main-time">${date}</div>
			<div class="main-type">${getTypeName(type)}</div>
			<div class="main-name">${name}</div>
			<div class="main-video"><span onclick="playVideo(${index})"><img src="src/bilibili.png" /> 播放视频</span></div>
			<div class="main-download"><span onclick="getLitematica(${index})">获取投影</span></div>
		</div>
	`;
	
	const fragment = document.createDocumentFragment();
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = rowHTML;
	while (tempDiv.firstChild) {
		fragment.appendChild(tempDiv.firstChild);
	}
	
	document.getElementById("main-table").appendChild(fragment);
}

// 获取类型对应名称
function getTypeName (type) {
	switch (type) {
		case "3-way": return "三向轰炸机";
		case "eater": return "世吞/地吞";
		case "gap": return "挖沟机";
		case "block": return "铺方块机";
		case "tunnel": return "盾构机";
		case "water": return "排水机";
		case "quarry": return "采矿机";
		case "sand": return "刷沙机";
		case "bedrock": return "基岩机";
		case "others": return "其他";
	}
}

function playVideo (index) {
	window.open("https://bilibili.com/video/" + list[index].bv);
}

function getLitematica (index) {
	switch (list[index].remark[0]) {
		case 0 :
			let a = document.getElementById("downloader");
			a.href = "litematica/" + list[index].bv + ".zip";
			a.click();
		break;
		case 1 :
			window.open(list[index].remark[1]);
		break;
		case 2 :
			window.open("https://redenmc.com/zh_cn/litematica?m=" + list[index].remark[1]);
		break;
	}
}