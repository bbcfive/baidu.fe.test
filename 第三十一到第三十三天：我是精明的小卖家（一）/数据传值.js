var product = document.getElementsByTagName("select")[0];
var region = document.getElementsByTagName("select")[1];

//get the data from data.js
function getTheData(prod, regi) {
	for (var i = 0; i < sourceData.length; i++){
		if (sourceData[i].product == prod && sourceData[i].region == regi)
			return sourceData[i].sale;
	}
}

//get the value from user select
function getTheValueSelect() {
	var prod = product.selectedIndex;
	prodText = product[prod].value;
	var regi = region.selectedIndex;
	regiText = region[regi].value;
	return [prodText,regiText];
}

//use the selected value to get the data
function getTheSelectData() {
	var prod = getTheValueSelect()[0];
	var regi = getTheValueSelect()[1];
	return getTheData(prod, regi);
}

//get the value from user input
var userInput = document.getElementsByTagName("input");
var prodArr = [], regiArr = [], dataArr = [];

//在绑定事件中做条件分类准备
$("*").click(function(e) {
	var t = e.target;
	if (t.type == "checkbox"){
		if (t.value == "商品全选") 
			getAllProd();
		else if (t.value == "地区全选") 
			getAllRegi();
		else if (t.name == "product")
			getTheProd();
		else if (t.name == "region") 
			getTheRegi();	
	} 	
	//console.log(prodArr, regiArr)
});

//full data
function fullProdData(arr) {
	if (arr.length == 0) {
		for (var i = 0; i < 3; i++){
			arr.push(userInput[i].value);
		}
	}
}
function fullRegiData(arr) {
	if (arr.length == 0) {
		for (var i = 4; i < 7; i++){
			arr.push(userInput[i].value);
		}
	}
}

//use the input value to get the data
function getTheInputData() {
	//一个都没选即默认全选
	if (prodArr.length == 0 && regiArr.length > 0) fullProdData(prodArr);
	if (regiArr.length == 0 && prodArr.length > 0) fullRegiData(regiArr);	
	for (var m = 0; m < prodArr.length; m++){
		for (var n = 0; n < regiArr.length; n++){
			dataArr.push(prodArr[m] + "m" + regiArr[n] + "n" + getTheData(prodArr[m], regiArr[n]) + " ");
		}
	}
	var prLength = [prodArr.length,regiArr.length]
	//清除全选状态
	if (prodArr.length == 3) prodArr = [];
	if (regiArr.length == 3) regiArr = [];
	return prLength;
}

//全选或取消全选时
function getAllProd(){
	prodArr = [];
	if (userInput[3].checked) userInput[3].checked = false;
	else userInput[3].checked = true;
	for (var i = 0; i < 3; i++){
		//全选输出所有
		if (userInput[3].checked){
			userInput[i].checked = true;
			prodArr.push(userInput[i].value);
		} else {
			userInput[i].checked = false;
			prodArr = [];	
		}					
	}
	return prodArr;		
}

function getTheProd() {
	prodArr = [];
	for (var i = 0; i < 3; i++){
		if (userInput[i].checked) 
			prodArr.push(userInput[i].value);	
		if (prodArr.length == 3) 
			userInput[3].checked = true;
		else
			userInput[3].checked = false;					
	}
	return prodArr;
}

//全选或取消全选时
function getAllRegi() {
	regiArr = [];
	if (userInput[7].checked) userInput[7].checked = false;
	else userInput[7].checked = true;
	for (var i = 4; i < 7; i++){
		//全选输出所有
		if (userInput[7].checked){
			userInput[i].checked = true;
			regiArr.push(userInput[i].value);
		} else {
			userInput[i].checked = false;
			regiArr = [];	
		}					
	}
	return regiArr;		
}

function getTheRegi() {
	regiArr = [];
	for (var i = 4; i < 7; i++){
		if (userInput[i].checked)
			regiArr.push(userInput[i].value);
		if (regiArr.length == 3) 
			userInput[7].checked = true;
		else 
			userInput[7].checked = false;
	}
	return regiArr;
}


//变量，不要定义成location，因为它代表本地文件的地址。定义它会导致浏览器找不到文件地址
//console.log(location);