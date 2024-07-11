var typeList = [...list];
var timeList = [...list];
var videoCount = [];


for (let i in list) {
	videoCount[i] = false;
}
for (let i = 1; i < timeList.length; i++) {
	for (let j = 0; j < i; j++) {
		let j1 = parseInt(timeList[i].date.replace(/[^0-9]/g, ""), 10);
		let j2 = parseInt(timeList[j].date.replace(/[^0-9]/g, ""), 10);
		if (j1 > j2) {
			let temp = timeList[i];
			timeList[i] = timeList[j];
			timeList[j] = temp;
		}
	}
}
for (let i = 1; i < typeList.length; i++) {
	for (let j = 0; j < i; j++) {
		let j1 = parseInt(typeSort(typeList[i].type));
		let j2 = parseInt(typeSort(typeList[j].type));
		if (j1 < j2) {
			let temp = typeList[i];
			typeList[i] = typeList[j];
			typeList[j] = temp;
		}
	}
}

function typeSort(type) {
	// type: "3-way", "eater", "gap", "block", "tunnel", "water", "quarry", "bedrock", "others"
	// type:   三向    吞噬者   挖沟机  铺方块机   盾构机     排水机    采矿机     基岩机     其他
	switch (type) {
		case "3-way":return 0;
		case "eater":return 1;
		case "gap":return 2;
		case "block":return 3;
		case "tunnel":return 4;
		case "water":return 5;
		case "quarry":return 6;
		case "bedrock":return 7;
		case "others":return 8;
	}
}




function indexList(i) {
	if (i == 0) {
		document.getElementById("t-0").className = "t-aft";
		document.getElementById("t-1").className = "t-def";
	} else {
		document.getElementById("t-1").className = "t-aft";
		document.getElementById("t-0").className = "t-def";
	}
}

function timeLoad() {
	for (let i in list) {
		videoCount[i] = false;
	}
	
	document.getElementById("table").innerHTML = "<div id='th'></div>";
	document.getElementById("th").innerHTML = "<div id='th-td-0'>发布时间</div>" +
		"<div id='th-td-1'>类型</div>" +
		"<div id='th-td-2'>机器名称</div>" +
		"<div id='th-td-3'>视频链接</div>" +
		"<div id='th-td-4'>下载</div>";

	for (let i in timeList) {
		const rowHTML = `
			<div class='tr'>
				<div class='td-0'>${timeList[i].date}</div>
				<div class='td-1'>${getType(timeList[i].type)}</div>
				<div class='td-2'>${timeList[i].name}</div>
				<div class='td-3' onclick='bilibili("${timeList[i].bv}", 0)'>${timeList[i].bv}</div>
				<div class='td-4'>
					<div class='btn btn-def' onclick='download("${timeList[i].bv}")'>下载</div>
				</div>
			</div>
		`;
		document.getElementById("table").innerHTML += rowHTML;
	}
}

function typeLoad() {
	for (let i in list) {
		videoCount[i] = false;
	}
	
	document.getElementById("table").innerHTML = "<div id='th'></div>";
	document.getElementById("th").innerHTML = "<div class='td-0'>发布时间</div>" +
		"<div class='td-1'>类型</div>" +
		"<div class='td-2'>机器名称</div>" +
		"<div class='td-3'>视频链接</div>" +
		"<div class='td-4'>下载</div>";
		
		for (let i in typeList) {
			const rowHTML = `
				<div class='tr'>
					<div class='td-0'>${typeList[i].date}</div>
					<div class='td-1'>${getType(typeList[i].type)}</div>
					<div class='td-2'>${typeList[i].name}</div>
					<div class='td-3' onclick='bilibili("${typeList[i].bv}", 1)'>${typeList[i].bv}</div>
					<div class='td-4'>
						<div class='btn btn-def' onclick='download("${typeList[i].bv}")'>下载</div>
					</div>
				</div>
			`;
			document.getElementById("table").innerHTML += rowHTML;
		}
}

function getType(givenType){
	switch (givenType) {
		case "3-way":return "三向轰炸机";
		case "eater":return "世吞/地吞";
		case "gap":return "挖沟机";
		case "block":return "铺方块机";
		case "tunnel":return "盾构机";
		case "water":return "排水机";
		case "quarry":return "采矿机";
		case "bedrock":return "基岩机";
		case "others":return "其他";
	}
}

function bilibili(givenBv, type) {
	if (type == 0) {
		for (let i in timeList) {
			if (timeList[i].bv == givenBv) {
				document.getElementsByClassName("btn")[i].className = "btn btn-aft";
				break;
			}
		}
		for (let i in list) {
			if (list[i].bv == givenBv) {
				videoCount[i] = true;
				window.open("https://bilibili.com/video/" + list[i].bv);
				break;
			}
		}
	} else {
		for (let i in typeList) {
			if (typeList[i].bv == givenBv) {
				document.getElementsByClassName("btn")[i].className = "btn btn-aft";
				break;
			}
		}
		for (let i in list) {
			if (list[i].bv == givenBv) {
				videoCount[i] = true;
				window.open("https://bilibili.com/video/" + list[i].bv);
				break;
			}
		}
	}
}

function download(givenBv) {
	for (let i in list) {
		if (list[i].bv == givenBv) {
			if (! videoCount[i]) {
				window.alert("下载不可用\n请点击链接为可怜的月月贡献播放量");
			} else {
				let a = document.getElementById("downloader");
				a.href = "litematica/" + list[i].bv + "." + list[i].extension;
				a.click();
			}
		}
	}
}
