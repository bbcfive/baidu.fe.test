// 渲染新的表格
function renderTable(data) {
    let table = document.createElement("table");
    table.innerHTML = "";
    // 输出表头：商品、地区、1月、2月、…… 12月
    let tableHead = document.createElement("tr");
    table.appendChild(tableHead);
    for (let i = 0; i < 14; i++) {
        let th = document.createElement("th");
        tableHead.appendChild(th);
    }
    if (isAreaAddvance()) {
        tableHead.childNodes[0].innerHTML = "地区";
        tableHead.childNodes[1].innerHTML = "商品";
    } else {
        tableHead.childNodes[0].innerHTML = "商品";
        tableHead.childNodes[1].innerHTML = "地区";
    }
    for (let i = 0; i < 12; i++) {
        tableHead.childNodes[i + 2].innerHTML = (i + 1) + "月";
    }
    // 遍历数据  输出每一行的表格HTML内容
    let tdNum = 14;
    let rsNum = rowSpanNum();
    for (let i = 0; i < data.length; i++) {
        if (data.length > 1) {
            if (i % rsNum == 0) {
                tdNum = 14;
            } else {
                tdNum = 13;
            }
        } else {
            tdNum = 14;
        }
        // 输出每一行的内容
        let tableRow = document.createElement("tr");
        // 给对应的td或者tr添加一个自定义属性，这一格数据属于哪个商品哪个区域
        tableRow.setAttribute("pro", data[i].product);
        tableRow.setAttribute("reg", data[i].region);
        for (let j = 0; j < tdNum; j++) {
            let td = document.createElement("td");
            // td.setAttribute("data-attr","编辑");
            if (tdNum == 14 && j == 0) {
                td.rowSpan = rowSpanNum();
            }
            tableRow.appendChild(td);
        }
        if (tdNum == 14) {
            if (isAreaAddvance()) {
                tableRow.childNodes[0].innerHTML = data[i].region;
                tableRow.childNodes[1].innerHTML = data[i].product;
            } else {
                tableRow.childNodes[0].innerHTML = data[i].product;
                tableRow.childNodes[1].innerHTML = data[i].region;
            }
        } else {
            if (isAreaAddvance()) {
                tableRow.childNodes[0].innerHTML = data[i].product;
            } else {
                tableRow.childNodes[0].innerHTML = data[i].region;
            }
        }
        // 12个月的数据
        let m = 0;
        for (let k = tdNum - 12; k < tdNum; k++) {
            tableRow.childNodes[k].setAttribute("class", "sale");
            tableRow.childNodes[k].setAttribute("data-attr", "编辑");
            tableRow.childNodes[k].innerHTML = data[i].sale[m];
            m++;
        }
        table.appendChild(tableRow);
    }
    // 把生成的HTML内容赋给table-wrapper
    let tableWrapper = document.querySelector("#table-wrapper");
    tableWrapper.innerHTML = "";
    tableWrapper.appendChild(table);
    // 添加鼠标滑出事件监听
    table.addEventListener("mouseleave", function (params) {
        let selectArea = [];
        let areaOptions = area.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < areaOptions.length; i++) {
            if (areaOptions[i].checked) {
                selectArea.push(areaOptions[i].value);
            }
        }
        let selectGoods = [];
        let goodsOptions = goods.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < goodsOptions.length; i++) {
            if (goodsOptions[i].checked) {
                selectGoods.push(goodsOptions[i].value);
            }
        }
        let dataArr = getData(selectArea, selectGoods);
        // 生成柱状图
        chartA.data = dataArr;
        chartA.graphBarChart();
        // 画默认折线图
        chartB.data = dataArr;
        chartB.graphLineChart();
    });
    // 添加鼠标滑过事件监听
    let trs = table.querySelectorAll("tr");
    for (let i = 1; i < trs.length; i++) {
        trs[i].addEventListener("mouseenter", function (e) {
            let oEvent = e || event;
            let target = e.target || e.srcElement;
            let reg = [], pro = [];
            reg[0] = target.getAttribute("reg");
            pro[0] = target.getAttribute("pro");
            let saleData = getData(reg, pro);
            chartA.data = saleData;
            chartA.graphBarChart();
            chartB.data = saleData;
            chartB.graphLineChart();

        });
    }
    // 添加鼠标滑出事件监听
    let tds = table.querySelectorAll("td");
    for (let i = 0; i < tds.length; i++) {
        let td = tds[i];
        if (!isNaN(td.innerHTML)) {
            td.addEventListener("mouseenter", function (e) {
                let oEvent = e || event;
                let target = e.target || e.srcElement;
                let editTd = table.querySelector("#edit");
                if (editTd !== null) {
                    if (target == editTd) {
                        target.setAttribute('data-attr', "");
                    } else {
                        target.setAttribute('data-attr', "");
                    }
                } else {
                    target.setAttribute('data-attr', "编辑"); //url(img/铅笔.png)
                }
            });
            td.addEventListener("mouseleave", function (e) {
                let oEvent = e || event;
                let target = e.target || e.srcElement;
                target.setAttribute('data-attr', "");
            });
        }
    }


    table.addEventListener("click", function (e) {
        let oEvent = e || event;
        let target = e.target || e.srcElement;
        let editTd = table.querySelector("#edit");
        if (target.nodeName == "TD" && target.className == "sale") {
            if (editTd !== null) {
                if (target.id == "") { // 存在正在编辑TD 点击到了别的TD
                    target.setAttribute('data-attr', "");
                    editTd.id = "";
                    editTd.innerHTML = num;
                } else if (target.id == "edit") { // 存在正在编辑TD 点击到该TD
                    target.setAttribute('data-attr', "");
                    target.id = "";
                    target.innerHTML = num;
                }
            } else if (editTd == null) { // 没有正在编辑的TD 点击到TD
                target.setAttribute('data-attr', "");
                num = target.innerHTML;
                target.id = "edit";
                target.innerHTML = "<input type='text' value='" + num + "'><button id='confirm'>确定</button><button id='cancel'>取消</button>";

            }
        } else if (target.id == "confirm") { // 点击到TD的“确认”按钮
            // 判断输入是否位数字

            let parent = target.parentNode;
            let granparent = parent.parentNode;
            parent.id = "";
            // 取消input输入框和按钮
            parent.innerHTML = target.previousSibling.value;
            // 保存所有
            saveDataToLocalStorage();
            // 绘制图形
            let reg = [], pro = [];
            reg[0] = granparent.getAttribute("reg");
            pro[0] = granparent.getAttribute("pro");
            let saleData = getData(reg, pro);
            chartA.data = saleData;
            chartA.graphBarChart();
            chartB.data = saleData;
            chartB.graphLineChart();
        } else if (target.id == "cancel") { // 点击到TD的“取消”按钮
            target.parentNode.id = "";
            // 取消input输入框和按钮
            target.parentNode.innerHTML = num;
        }
    });
}

// 是否将地区放在第一列
function isAreaAddvance() {
    let selectArea = [];
    let areaOptions = area.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < areaOptions.length; i++) {
        if (areaOptions[i].checked) {
            selectArea.push(areaOptions[i].value);
        }
    }
    let selectGoods = [];
    let goodsOptions = goods.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < goodsOptions.length; i++) {
        if (goodsOptions[i].checked) {
            selectGoods.push(goodsOptions[i].value);
        }
    }
    if (selectGoods.length > 1 && selectArea.length == 1) {
        return true;
    }
    return false;
}

// 合并单元格
function rowSpanNum() {
    let selectAreaNum = 0;
    let areaOptions = area.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < areaOptions.length; i++) {
        if (areaOptions[i].checked) {
            selectAreaNum++;
        }
    }
    let selectGoodsNum = 0;
    let goodsOptions = goods.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < goodsOptions.length; i++) {
        if (goodsOptions[i].checked) {
            selectGoodsNum++;
        }
    }
    if (!isAreaAddvance()) {
        let selectAreaNumStr = selectAreaNum.toString();
        return selectAreaNumStr;
    } else {
        let selectGoodsNumStr = selectGoodsNum.toString();
        return selectGoodsNumStr;
    }
}