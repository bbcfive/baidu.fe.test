let area = document.querySelector("#region-radio-wrapper");
let goods = document.querySelector("#product-radio-wrapper");
// 生成一组checkbox
genGroupCheckBox(area, [{
    value: 1,
    text: "华东"
}, {
    value: 2,
    text: "华北"
}, {
    value: 3,
    text: "华南"
}]);
genGroupCheckBox(goods, [{
    value: 1,
    text: "手机"
}, {
    value: 2,
    text: "笔记本"
}, {
    value: 3,
    text: "智能音箱"
}]);


function genGroupCheckBox(wrapper,checkBoxArr) {
	//生成全选CheckBox的html，给一个自定义属性表示为全选CheckBox，比如checkbox - type="all"
	let selectAll = "<div><input type='radio' checkbox-type = 'all' checked='true'>全选</div>";
	//遍历参数对象
	let childrenBox = [];
	for (let i = 0; i < checkBoxArr.length; i++) {
		//生成各个子选项checkbox的html，给一个自定义属性表示为子选项
		let checkbox = "<div><input type='checkbox' checkbox-type='single' checked='true'"
		let checkboxValue = "value='" + checkBoxArr[i].text + "'>" + checkBoxArr[i].text + "</div>";
		checkbox = checkbox + checkboxValue;
		childrenBox.push(checkbox);
	}
	let childrenBoxStr = childrenBox.join('');
	//容器innerHTML = 生成好的html集合
	wrapper.innerHTML = selectAll + childrenBoxStr;
	//给容器做一个事件委托
	   wrapper.onmouseup = function (e) {
        let oEvent = e || event;
        let target = oEvent.target || oEvent.srcElement;
        if (target.getAttribute("type") == "checkbox" || target.getAttribute("type") == "radio") {
            // 读取自定义属性
            let checkboxType = target.getAttribute("checkbox-type");
            if (checkboxType === "all") {
                // 做全选对应的逻辑
                target.onclick = function () {
                    if (this.checked) {
                        target.checked = true;  //这里直接设置DOM property,而不是Attribute。与target.setAtrribute("checked",true)不同
                        checkAll(wrapper);
                    } else {
                        target.checked = true;
                    }
                }
            } else {
                // 做子选项对应的逻辑
                target.onclick = function (e) {
                    if (!this.checked) {
                        if (isOnlyChecked(wrapper, this)) {
                            this.checked = true;
                        } else if (otherAllChecked(wrapper, this)) {
                            let checkAllRadio = wrapper.querySelector("input[checkbox-type='all']");
                            checkAllRadio.checked = false;
                        }
                    } else {
                        if (otherAllChecked(wrapper, target)) {
                            let checkAllRadio = wrapper.querySelector("input[checkbox-type='all']");
                            checkAllRadio.checked = true;
                        }
                    }
                }
            }
        }
    }
}

function checkAll(parentNode) {
    let checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

function isOnlyChecked(wrapper,node) {
	let nodes = wrapper.querySelectorAll("input[type='checkbox']");
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i] !== node && nodes[i].checked) {
			return false;
		}
	}
	return true;
}

function otherAllChecked(wrapper, node) {
    let nodes = wrapper.querySelectorAll("input[type='checkbox']");
    let len = nodes.length;
    for (let i = 0; i < len; i++) {
        if (nodes[i] !== node && !nodes[i].checked) {
            return false;
        }
    }
    return true;
}