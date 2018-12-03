var prod = document.getElementById("productData");
var regi = document.getElementById("regionData");
var sale = document.getElementById("salesData");

//删除重复内容
function deleteNode(list) {
	while ( list.hasChildNodes() ) {
		list.removeChild(list.firstChild);
	}				
}

//render select data 
function addSelectToDocument() {
	deleteNode(prod);
	deleteNode(regi);
	deleteNode(sale);		

	//prod, region(2)
	var details = getTheValueSelect();
	//sales(12)
	var sales = getTheSelectData(); 

	var prodList = document.createElement("td");
	var prodArea = document.createTextNode(details[0]);
	if (prodArea != undefined) {
		prodList.appendChild(prodArea);
		prod.appendChild(prodList);
	}

	var regiList = document.createElement("td");
	var regiArea = document.createTextNode(details[1]);	
	if (regiArea != undefined) {
		regiList.appendChild(regiArea);
		regi.appendChild(regiList);
	}

	var salesList = document.createElement("td");
	for (var i = 0; i < sales.length; i++) {
		var salesArea = document.createTextNode(sales[i]+',');	
		if (salesArea != undefined) {
			salesList.appendChild(salesArea);
			sale.appendChild(salesList);		
		}		
	}
}

//render input data
function addInputToDocument() {
	//get the data and save in dataArr
	dataArr = [];
	//得到一个状态：选择谁做第几列，数量少的做第一列
	var prLength = getTheInputData();

	//delete the repeat data
	deleteNode(prod);
	deleteNode(regi);
	deleteNode(sale);		

	//render the data
	dataArr = dataArr.toString().split(" ,")
	
	console.log(prLength);
	for (var i = 0; i < dataArr.length; i++) {
		if (dataArr[i] != undefined) dataArr[i] = dataArr[i].split("n");
		if (dataArr[i][1] != undefined) dataArr[i] = dataArr[i][0].split("m").concat(dataArr[i][1]);

		if (dataArr[i][0] != undefined) {
			var prodArea;

			//稍微有难度的是做单元格合并
			/*
			log一下：首先 数据已经取出来了 是按照 数组的形式 
			数组第一列代表是第几组数据 第二列代表是商品 地区 销量信息
			然后 数组的长度 也出来了 用于比较 谁的 checkbox数量多 即摆在首列
			现在问题是 合并行 rowspan 属性 把多行重复的列数据 合并


			if pl[0] > pl[1]  商品的数量多余地区的数量 此时地区放首列，合并地区行
			else 商品放首列，合并商品行
			合并时要注意 有几行 就合并几行

			*/

			var prodList = document.createElement("td");
			prodArea = document.createTextNode(dataArr[i][0]);					
			prodList.appendChild(prodArea);
			prod.appendChild(prodList);		
			prod.setAttribute("rowspan",3)
		}

		
		if (dataArr[i][1] != undefined) {
			var regiList = document.createElement("td");
			var regiArea = document.createTextNode(dataArr[i][1]);	
			regiList.appendChild(regiArea);
			regi.appendChild(regiList);
		}

		
		if (dataArr[i][2] != undefined) {	
			var salesList = document.createElement("td");
			var salesArea = document.createTextNode(dataArr[i][2]);	
			salesList.appendChild(salesArea);
			sale.appendChild(salesList);					
		}			
	}
}

//根据事件型号调用合适事件
document.onchange = function(e){
	//console.log(e.target.id == "product")
	var t = e.target;
	if (t.type == "checkbox") 
		addInputToDocument();
	if (t.id == "product" || t.id == "region") 
		addSelectToDocument();	
}
