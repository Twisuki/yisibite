var list = [];
var timeList = [];
var typeList = [];
var videoCount = [];
var onDisplay;

const litematicaGenerator = [
	{
		"id": "yisibite-world-eater",
		"index": 12
	},
	{
		"id": "yisibite-nether-eater",
		"index": 14
	},
	{
		"id": "yisibite-once-miner",
		"index": 26
	},
	{
		"id": "yisibite-3-miner",
		"index": 27
	},
	{
		"id": "yisibite-quarry-x",
		"index": 29
	}
];

loadListByFetch();
function loadListByFetch() {
	fetch("https://raw.githubusercontent.com/Scrohild/yisibite/main/data.json")
		.then(response => response.json())
		.then(data => {
			list = data.list;
			console.log("使用Fetch加载");
			setList();
			initVideoCount();
			setIndexByTime();
		})
		.catch(error => {
			window.alert("网络异常, 尝试使用js加载");
			loadListByJs();
			console.error("Fetch错误", error);
		});
}
function loadListByJs() {
	var script = document.createElement("script");
	script.src = "data.js";
	script.onload = function() {
		if(typeof jsData !== "undefined") {
			console.log("使用js加载");
			list = jsData;
			setList();
			initVideoCount();
			setIndexByTime();
		} else {
			window.alert("js出现错误, 请翻看黄历并改日再来");
			console.error("js错误", error);
		}
	}
	document.body.appendChild(script);
}

function setList() {
	for (let i in list) {
		list[i].index = i;
	}
	console.log(list);
	timeList = [...list];
	typeList = [...list];
	
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
	
	console.log(timeList);
	console.log(typeList);
}
function getTypeIndex(obj) {
	switch (obj.type) {
		case "3-way":return 0;
		case "eater":return 1;
		case "gap":return 2;
		case "block":return 3;
		case "tunnel":return 4;
		case "water":return 5;
		case "quarry":return 6;
		case "bedrock":return 7;
		case "sand":return 8;
		case "others":return 9;
	}
}

function initVideoCount() {
	if(localStorage.getItem("LSVideoCount") == null) {
		for (let i in list) {
			videoCount[i] = false;
		}
		localStorage.setItem("LSVideoCount", JSON.stringify(videoCount));
	} else {
		videoCount = JSON.parse(localStorage.getItem("LSVideoCount"));
	}
}

function setIndexByTime() {
	onDisplay = 0;
	// 改变颜色
	document.getElementById("index-0").className = "index-btn-aft";
	document.getElementById("index-1").className = "index-btn-def";
	// 生成表格
	document.getElementById("main-in").innerHTML = "";
	for (let i in timeList) {
		const rowHTML = `
			<div class='main-row'>
				<div class='main-index'>${i}</div>
				<div class='main-time'>${timeList[i].date}</div>
				<div class='main-type'>${getTypeName(timeList[i].type)}</div>
				<div class='main-name'>${timeList[i].name}</div>
				<div class='main-bv' onclick='playOnBilibili("${timeList[i].index}")'>视频</div>
				<div class='main-download' onclick='download("${timeList[i].index}")'>下载</div>
			</div>
		`;
		const fragment = document.createDocumentFragment();
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = rowHTML;
		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		
		document.getElementById("main-in").appendChild(fragment);
	}
	
	setDownloadStyle();
}
function setIndexByType() {
	onDisplay = 1;
	// 改变颜色
	document.getElementById("index-0").className = "index-btn-def";
	document.getElementById("index-1").className = "index-btn-aft";
	// 生成表格
	document.getElementById("main-in").innerHTML = "";
	for (let i in typeList) {
		const rowHTML = `
			<div class='main-row'>
				<div class='main-index'>${i}</div>
				<div class='main-time'>${typeList[i].date}</div>
				<div class='main-type'>${getTypeName(typeList[i].type)}</div>
				<div class='main-name'>${typeList[i].name}</div>
				<div class='main-bv' onclick='playOnBilibili(${typeList[i].index})'>视频</div>
				<div class='main-download' onclick='download(${typeList[i].index})'>下载</div>
			</div>
		`;
		const fragment = document.createDocumentFragment();
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = rowHTML;
		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		
		document.getElementById("main-in").appendChild(fragment);
	}
	
	setDownloadStyle();
}
function getTypeName(givenType) {
	switch (givenType) {
		case "3-way":return "三向轰炸机";
		case "eater":return "世吞/地吞";
		case "gap":return "挖沟机";
		case "block":return "铺方块机";
		case "tunnel":return "盾构机";
		case "water":return "排水机";
		case "quarry":return "采矿机";
		case "bedrock":return "基岩机";
		case "sand":return "刷沙机&固化"
		case "others":return "其他";
	}
}

function playOnBilibili(index) {
	videoCount[index] = true;
	localStorage.setItem("LSVideoCount", JSON.stringify(videoCount));
	window.open("https://bilibili.com/video/" + list[index].bv);
	setDownloadStyle();
}
function setDownloadStyle() {
	if (onDisplay == 0) {
		for (let i in timeList) {
			if(videoCount[timeList[i].index]) {
				document.getElementsByClassName("main-download")[i].className = "main-download main-download-aft";
				document.getElementsByClassName("main-download")[i].title = "点我下载";
			} else {
				document.getElementsByClassName("main-download")[i].className = "main-download main-download-def";
				document.getElementsByClassName("main-download")[i].title = "下载不可用\n请点击链接为可怜的月月贡献播放量";
			}
		}
	} else {
		for (let i in typeList) {
			if(videoCount[typeList[i].index]) {
				document.getElementsByClassName("main-download")[i].className = "main-download main-download-aft";
				document.getElementsByClassName("main-download")[i].title = "点我下载";
			} else {
				document.getElementsByClassName("main-download")[i].className = "main-download main-download-def";
				document.getElementsByClassName("main-download")[i].title = "下载不可用\n请点击链接为可怜的月月贡献播放量";
			}
		}
	}
}

function download(index) {
	if(! videoCount[index]) {
		window.alert("下载不可用\n请点击链接为可怜的月月贡献播放量");
	} else if(getLitematicaGenerateYes(index)) {
		let a = document.getElementById("downloader");
		a.href = "litematica/" + list[index].bv + "." + list[index].extension;
		a.click();
	}
}
function getLitematicaGenerateYes(index) {
	for(let i in litematicaGenerator) {
		if(litematicaGenerator[i].index == index) {
			window.open("https://www.redenmc.com/mc-services/download/yisibite?m=" + litematicaGenerator[i].id);
			return false;
		}
	}
	return true;
}

function delLocalStorage() {
	window.alert("你确定吗?\n此操作会清楚缓存, 且不可逆");
	window.alert("你确定吗?\n这里会清除你的数据, 你需要重新观看视频才能下载");
	window.alert("没关系, 咱不给你取消的机会^_^");
	localStorage.removeItem('LSVideoCount');
	location.reload();
}
