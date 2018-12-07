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
// 显示默认选项数据
manageData();
// select的onchange事件监听 
area.addEventListener("change", manageData);
goods.addEventListener("change", manageData);
