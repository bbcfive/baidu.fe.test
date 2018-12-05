//管理系统
function manageData() {
	let selectArea = [];
	let areaOptions = area.querySelectorAll("input[type='checkbox']");
	for (let i = 0; i < areaOptions.length; i++) {
		if (areaOptions[i].checked) {
			selectArea.push(areaOptions[i].value);
		}
	}
	let selectGoods = [];
	let goodsOptions = goods.querySelectorAll("input[type='checkbox']");
	for (let i = 0; i < areaOptions.length; i++) {
		if (goodsOptions[i].checked) {
			selectGoods.push(goodsOptions[i].value);
		}
	}
	let dataArr = getData(selectArea,selectGoods);
	//生成表格
	renderTable(dataArr);
	//生成柱状图
	chartA.data = dataArr;
	chartA.graphBarChart();
	//生成折线图
	chartB.data = dataArr;
	chartB.graphLineChart();
}

//获得数据
function getData(reg,pro) {
	//遍历sourceData，找到与选择匹配的数据
	let aquiredDataArr = [];
	for (let i = 0; i < sourceData.length; i++) {
		let obj = sourceData[i];
		for (let ri = 0; ri < reg.length; ri++) {
			for (let pi = 0; pi < pro.length; pi++) {
				if (obj.region === reg[ri] && obj.product === pro[pi]) {
					aquiredDataArr.push(obj);
				}
			}
		}
	}
	return aquiredDataArr;
}

// 显示默认选项数据
manageData();
// select的onchange事件监听 
area.addEventListener("change", manageData);
goods.addEventListener("change", manageData);
