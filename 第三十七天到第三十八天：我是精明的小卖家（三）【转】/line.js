let chartB = {
    data: [{
        product: "手机",
        region: "华东",
        sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    }],
    graphLineChart: function () {
        // 绘图区域的高度和宽度
        let graphWidth = 660;
        let graphHeight = 260;
        // 上下和左右留白宽度
        let whiteSpace = 20;
        // 刻度长度和字体宽度
        let scaleLen = 10;
        let textWidth = 20;
        let textHeight = 10;
        let legendWidth = 60;
        // 横轴宽度和纵轴高度
        let xAxisLen = graphWidth - 2 * whiteSpace - scaleLen - textWidth - legendWidth;
        let yAxisLen = graphHeight - 2 * whiteSpace - scaleLen - textHeight;
        // 横轴刻度间距，纵轴刻度间距
        let xScaleNum = 12;
        let yScaleNum = 5;
        let xScaleSpace = xAxisLen / (xScaleNum + 1);
        let yScaleSpace = yAxisLen / yScaleNum;
        // 纵轴高度和像素之间的比例
        // 找到data[i]的最大值maxValue
        let maxValueArr = [];
        for (let i = 0; i < this.data.length; i++) {
            let imaxValue = maxValueOfData(this.data[i].sale);
            maxValueArr.push(imaxValue);
        }
        let maxValue = maxValueOfData(maxValueArr);
        let topValue = findTopValue(maxValue);
        // 计算比例
        let ratio = yAxisLen / topValue;

        // 删除之前的LineChart
        deleteBeforeLineChart();
        // 绘制图形
        let canvasWrap = document.getElementById("canvas-wrapper");
        let canvas = document.createElement("canvas");
        canvas.width = graphWidth;
        canvas.height = graphHeight;
        canvasWrap.appendChild(canvas);
        // 绘制坐标轴
        let ctx = canvas.getContext('2d');
        let ox = whiteSpace + textWidth + scaleLen;
        let oy = whiteSpace + yAxisLen;
        ctx.translate(ox, oy); //将画布的原点移至折线图的原点
        // 横坐标
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(xAxisLen, 0);
        ctx.stroke();
        // 纵坐标
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -yAxisLen);
        ctx.stroke();

        // 绘制刻度
        // x轴刻度
        for (let i = 0; i < xScaleNum; i++) {
            ctx.beginPath();
            ctx.moveTo((i + 1) * xScaleSpace, 0);
            ctx.lineTo((i + 1) * xScaleSpace, scaleLen);
            ctx.stroke();
        }
        // y轴刻度
        for (let i = 0; i < yScaleNum; i++) {
            ctx.beginPath();
            ctx.moveTo(0, - (i + 1) * yScaleSpace);
            ctx.lineTo(-scaleLen, - (i + 1) * yScaleSpace);
            ctx.stroke();
        }
        // 水平区域线
        for (let i = 0; i < yScaleNum; i++) {
            ctx.beginPath();
            ctx.moveTo(0, - (i + 1) * yScaleSpace);
            ctx.lineTo(xAxisLen, - (i + 1) * yScaleSpace);
            ctx.stroke();
        }
        // 绘制数字
        for (let i = 0; i < xScaleNum; i++) {
            ctx.strokeText((i + 1) + "月", (i + 1) * xScaleSpace - textWidth / 2, scaleLen + textHeight);
        }
        for (let i = 0; i < yScaleNum + 1; i++) {
            ctx.strokeText(i * topValue / yScaleNum, -scaleLen - textWidth, - i * yScaleSpace + textHeight / 2);
        }
        // 绘制数据点和折线
        for (let i = 0; i < this.data.length; i++) {
            let sale = this.data[i].sale;
            let dataColor = setColor(this.data[i]);
            // 绘制图例
            ctx.beginPath();
            ctx.fillStyle = dataColor;
            ctx.strokeStyle = "gray";
            ctx.arc(xAxisLen , i * whiteSpace - yAxisLen, 4, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.strokeText(this.data[i].product + "-" + this.data[i].region, xAxisLen + 5, i * whiteSpace - yAxisLen + 3);

            for (let j = 0; j < xScaleNum; j++) {
                ctx.beginPath();
                ctx.strokeStyle = dataColor;
                ctx.fillStyle = dataColor;
                ctx.arc((j + 1) * xScaleSpace, -sale[j] * ratio, 5, 0, Math.PI * 2, true);
                ctx.moveTo((j + 1) * xScaleSpace, -sale[j] * ratio);
                if (j < xScaleNum - 1) {
                    ctx.lineTo((j + 2) * xScaleSpace, -sale[j + 1] * ratio);
                }
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}

function deleteBeforeLineChart() {
    let canvasWrap = document.querySelector("#canvas-wrapper");
    let canvas = document.querySelector("canvas");
    if (canvas) {
        canvasWrap.removeChild(canvas);
    }
}