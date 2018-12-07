let chartA = {
    data: [{
        product: "手机",
        region: "华东",
        sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    }],
    graphBarChart: function () {
        // 清空之前svg
        deleteBeforeSVG();
        // 找最大值
        let maxValueArr = [];
        for (let i = 0; i < this.data.length; i++) {
            let imaxValue = maxValueOfData(this.data[i].sale);
            maxValueArr.push(imaxValue);
        }
        let maxValue = maxValueOfData(maxValueArr);
        // 参数设置
        // 柱间距和柱宽度
        let barGroupWidth = 30;
        let barSpacing = 10;
        let barWidth = barGroupWidth / this.data.length;
        // 横坐标和纵坐标长度
        let hLength = (barGroupWidth + barSpacing) * 12 + barSpacing;
        let vLength = findTopValue(maxValue);
        // 横轴和纵轴刻度间距
        let xfirstScalePos = barSpacing + barGroupWidth / 2;
        let hScaleSpacing = barGroupWidth + barSpacing;
        let vScaleNum = 5;
        let vScaleSpacing = vLength / vScaleNum;
        let scaleLength = 5;
        // 高度的缩放比例
        let radtio = 200 / vLength;
        // 绘图区域的高度和宽度
        let barChartWidth = hLength + 165;
        let barChartHeight = 200 + 60;
        // 横坐标和纵坐标轴颜色
        let axisColor = "black";
        let hSectionLineColor = "gray";
        // 柱子的颜色
        let barColor = "black";
        // let p1r1_barColor = "#ffc0cb", p1r2_barColor = "#ff7d93", p1r3_barColor = "#ff4161"; // 粉 手机
        // let p2r1_barColor = "#c1fff6", p2r2_barColor = "#7dffec", p2r3_barColor = "#41ffe4"; // 绿 笔记本
        // let p3r1_barColor = "#f2ffc1", p3r2_barColor = "#e3ff7d", p3r3_barColor = "#d6ff41"; // 黄 智能音箱

        // 绘制barChart
        // 绘制画图区域
        let nameSpace = 'http://www.w3.org/2000/svg';
        var barChart = document.createElementNS(nameSpace, 'svg');
        barChart.setAttribute('width', barChartWidth);
        barChart.setAttribute('height', barChartHeight);
        let svgWrap = document.querySelector("#svg-wrapper");
        svgWrap.appendChild(barChart);
        // 绘制横坐标和纵坐标
        let zeroPoint = "M 40 " + (vLength * radtio + 20);
        // x轴
        let xAxis = document.createElementNS(nameSpace, "path");
        let xAxisPath = zeroPoint + " h " + hLength;
        xAxis.setAttribute("d", xAxisPath);
        xAxis.setAttribute("stroke", axisColor);
        barChart.appendChild(xAxis);
        // y轴
        let yAxis = document.createElementNS(nameSpace, "path");
        let yAxisPath = zeroPoint + " v " + (-vLength * radtio);
        yAxis.setAttribute("d", yAxisPath);
        yAxis.setAttribute("stroke", axisColor);
        barChart.appendChild(yAxis);
        // x轴刻度
        let xAxisScale = document.createElementNS(nameSpace, "path");
        let xScales = " m " + xfirstScalePos + " 0" + " v " + scaleLength + " m 0 " + (-scaleLength);
        for (let i = 0; i < 11; i++) {
            xScales = xScales + " m " + hScaleSpacing + " 0" + " v " + scaleLength + " m 0 " + (-scaleLength);
        }
        let xAxisScalePath = zeroPoint + xScales;
        xAxisScale.setAttribute("d", xAxisScalePath);
        xAxisScale.setAttribute("stroke", axisColor);
        barChart.appendChild(xAxisScale);
        // x轴坐标
        let xText = document.createElementNS(nameSpace, "text");
        xText.setAttribute("x", xfirstScalePos + 30);
        xText.setAttribute("y", vLength * radtio + 40);
        xText.textContent = "1月";
        xText.setAttribute("stroke", axisColor);
        barChart.appendChild(xText);
        for (let i = 1; i < 12; i++) {
            let xText = document.createElementNS(nameSpace, "text");
            xText.setAttribute("x", xfirstScalePos + 30 + i * hScaleSpacing);
            xText.setAttribute("y", vLength * radtio + 40);
            xText.textContent = (i + 1) + "月";
            xText.setAttribute("stroke", axisColor);
            barChart.appendChild(xText);
        }
        // y轴刻度
        let yAxisScale = document.createElementNS(nameSpace, "path");
        let yScales = "";
        for (let i = 0; i < vScaleNum; i++) {
            yScales = yScales + " m 0 " + (-vScaleSpacing * radtio) + " h " + -scaleLength + " m " + scaleLength + " 0";
        }
        let yAxisScalePath = zeroPoint + yScales;
        yAxisScale.setAttribute("d", yAxisScalePath);
        yAxisScale.setAttribute("stroke", axisColor);
        barChart.appendChild(yAxisScale);
        // y轴坐标
        for (let i = 0; i < vScaleNum + 1; i++) {
            let yText = document.createElementNS(nameSpace, "text");
            yText.setAttribute("x", 5);
            yText.setAttribute("y", vLength * radtio + 28 - i * vScaleSpacing * radtio);
            yText.textContent = i * vScaleSpacing;
            yText.setAttribute("stroke", axisColor);
            barChart.appendChild(yText);
        }
        // 水平分区线
        let hSectionLine = document.createElementNS(nameSpace, "path");
        let hSectionLinePath = "";
        for (let i = 0; i < vScaleNum; i++) {
            hSectionLinePath = hSectionLinePath + " m 0" + (-vScaleSpacing * radtio) + " h " + hLength + " m " + (-hLength) + " 0";
        }
        let hSectionLinesPath = zeroPoint + hSectionLinePath;
        hSectionLine.setAttribute("d", hSectionLinesPath);
        hSectionLine.setAttribute("stroke", hSectionLineColor);
        barChart.appendChild(hSectionLine);
        // 绘制分组柱子
        for (let i = 0; i < this.data.length; i++) {
            let saleArr = this.data[i].sale;
            // 设置不同商品和地区柱子的颜色
            barColor = setColor(this.data[i]);
            // 绘制图例
            let graphLegend = document.createElementNS(nameSpace, "circle");
            graphLegend.setAttribute("cx", hLength + 50);
            graphLegend.setAttribute("cy", 30 + i * 25);
            graphLegend.setAttribute("r", 5);
            graphLegend.setAttribute("fill", barColor);
            graphLegend.setAttribute("stroke", barColor);
            barChart.appendChild(graphLegend);
            let graphLegendText = document.createElementNS(nameSpace, "text");
            graphLegendText.setAttribute("x", hLength + 60);
            graphLegendText.setAttribute("y", 35 + i * 25);
            graphLegendText.textContent = this.data[i].product + "-" + this.data[i].region;
            graphLegendText.setAttribute("stroke", "gray");
            barChart.appendChild(graphLegendText);
            // 绘制长柱
            let bar = document.createElementNS(nameSpace, "path");
            let barPath = "";
            for (let j = 1; j < 12; j++) {
                barPath = barPath + " m " + (barGroupWidth - barWidth + barSpacing) + " 0" + " v " + (-saleArr[j] * radtio) + " h " + barWidth + " v " + (saleArr[j] * radtio);
            }
            let barsPath = zeroPoint + " m 0 -1" + " m " + (barSpacing + i * barWidth) + " 0" + " v " + (-saleArr[0] * radtio) + " h " + barWidth + " v " + (saleArr[0] * radtio) + barPath;
            bar.setAttribute("d", barsPath);
            bar.setAttribute("fill", barColor);
            bar.setAttribute("stroke", barColor);
            barChart.appendChild(bar);
        }
    }
}

// 清空之前svg
function deleteBeforeSVG() {
    let svgWrap = document.querySelector("#svg-wrapper");
    let beforeSVG = document.querySelector("svg");
    if (beforeSVG) {
        svgWrap.removeChild(beforeSVG);
    }
}

// 设置数据点颜色
function setColor(data) {
    let barColor;
    let pSearchStr, rSearchStr;
    switch (data.product) {
        case "手机":
            pSearchStr = "p1";
            break;
        case "笔记本":
            pSearchStr = "p2";
            break;
        case "智能音箱":
            pSearchStr = "p3";
            break;
        default:
            break;
    }
    switch (data.region) {
        case "华东":
            rSearchStr = "r1";
            break;
        case "华北":
            rSearchStr = "r2";
            break;
        case "华南":
            rSearchStr = "r3";
            break;
        default:
            break;
    }
    for (let j = 0; j < barColorArr.length; j++) {
        const barColorObj = barColorArr[j];
        if (barColorObj.name.indexOf(pSearchStr) != -1 && barColorObj.name.indexOf(rSearchStr) != -1) {
            barColor = barColorObj.value;
        }
    }
    return barColor;
}