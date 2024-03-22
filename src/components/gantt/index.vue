<template>
	<div class="gantt_btn">
	<div ref="gantt" id="gantt" class="gantt"></div>
	<div v-if="isDialogVisible" class="dialog">  
    <!-- 对话框内容 -->  
    <p>你点击了甘特图的某个部分</p>  
    <button @click="hideDialog">关闭</button>  
  </div>  
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs, watch } from 'vue'
import * as echarts from 'echarts'
export default {
	props: {
		yAxis: {  // Y轴数据
			type: Array,
			default: () => ['categoryA', 'categoryB', 'categoryC']
		},
		xAxis: {  // X轴数据
			type: Number,
			default: () =>
				+new Date("2023-08-24 00:00:00")
		},
		data: { // 曲线数据结构示例
			type: Array,
			default: () =>  [
                {
                    list: [
                        {
                            colorNum: 0,
                            endTime: 50,
                            item: "item1",
                            quantity: 1960,
                            startTime: 0,
                        },
                        {
                            colorNum: 1,
                            endTime: 90,
                            item: "item2",
                            quantity: 492,
                            startTime: 60
                        },
                        {
                            colorNum: 2,
                            endTime: 120,
                            item: "item3",
                            quantity: 20837,
                            startTime: 95,
                        },
                        {
                            colorNum: 3,
                            endTime: 160,
                            item: "item4",
                            quantity: 3620,
                            startTime: 140,
                        },
                        {
                            colorNum: 0,
                            endTime: 220,
                            item: "item5",
                            quantity: 7200,
                            startTime: 180,
                        },
                    ],
                    plant: "工厂1",
                },
                {
                    list: [
                        {
                            startTime: 55,
                            endTime: 85,
                            quantity: 20,
                            colorNum: 0,
                            item: "item6",
                        },
                    ],
                    plant: "工厂2",
                },
                {
                    list: [
                        {
                            startTime: 95,
                            endTime: 105,
                            quantity: 30,
                            colorNum: 0,
                            item: "item7",
                        },
                        {
                            startTime: 115,
                            endTime: 130,
                            quantity: 20,
                            colorNum: 1,
                            item: "item8",
                        },
                        {
                            startTime: 145,
                            endTime: 180,
                            quantity: 10,
                            colorNum: 2,
                            item: "item9",
                        },
                        {
                            startTime: 190,
                            endTime: 220,
                            quantity: 10,
                            colorNum: 3,
                            item: "item10",
                        },
                    ],
                    plant: "工厂3",
                },
                {
                    list: [
                        {
                            startTime: 60,
                            endTime: 90,
                            quantity: 20,
                            colorNum: 1,
                            item: "item11",
                        },
                        {
                            startTime: 100,
                            endTime: 130,
                            quantity: 15,
                            colorNum: 2,
                            item: "item12",
                        },
                        {
                            startTime: 150,
                            endTime: 180,
                            quantity: 15,
                            colorNum: 3,
                            item: "item13",
                        },
                    ],
                    plant: "工厂4",
                },
            ]
		},
		dataCount: {  // 甘特图一列显示的条数
			type: Number,
			default: () => 6
		}
	},
	setup(props) {
		const gantt = ref('')
		const state = reactive({
			data: [],
			isDialogVisible: false, 
		})
			let start_ = "2018-08-02 00:00:00",
                end_ = "2018-11-05 24:00:00"; //自定义时间
            let seriesData = [];
            let yAxisData_plant = []; //工厂名
 
            props.data.forEach((item, index) => {
                yAxisData_plant.push(item.plant);
                let bgColor;
                item.list.forEach((listItem, listIndex) => {
                    switch (listItem.colorNum) {
                        case 0:
                            bgColor = "rgba(0,187,255,.4)";
                            break;
                        case 1:
                            bgColor = "rgba(80,227,194,.4)";
                            break;
                        case 2:
                            bgColor = "rgba(255,115,115,.4)";
                            break;
                        case 3:
                            bgColor = "rgba(255,207,107,.4)";
                            break;
                        default:
                            bgColor = "rgba(0,187,255,.4)";
                    }
                    let startTime = new Date(listItem.startTime).getTime();
                    let endTime = new Date(listItem.endTime).getTime();
                    seriesData.push({
                        name: listItem.item,
                        value: [index, startTime, endTime, listItem.quantity],
                        itemStyle: {
                            normal: {
                                color: bgColor,
                            },
                        },
                    });
                });
            });



		const methods = {
			draw() {
				const echart = echarts.init(gantt.value)
				const option = {
                backgroundColor: "#26263C",
                tooltip: {
                    formatter: function (params) {
                        //console.log(params)
                        return params.marker + params.name;
                    },
                },
                grid: {
                    // top: 48,
                    // left: 100,
                    // right: 50,
                    // bottom: 50,
                    // height: 300,
                },
                dataZoom: [
                    {
                        show: true,
                        type: "slider",
                        filterMode: "none",
                        realtime: false,
                        height: 10,
                        // top: 370,
                        startValue: 0,
                        endValue: 220,
                        minValueSpan: 0,
                        handleIcon: "path://path://M100, 100m -75, 0a75,75 0 1,0 150,0a75,75 0 1,0 -150,0",
                        handleSize: "120%",
                        handleStyle: {
                            color: "#71829e",
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                            shadowBlur: 4,
                        },
                        textStyle: {
                            color: "transparent",
                        },
                        borderColor: "transparent",
                        backgroundColor: "#D7F4FF",
                        dataBackground: {
                            lineStyle: {
                                width: 0,
                            },
                            areaStyle: {
                                color: "transparent",
                            },
                        },
                        fillerColor: "#00EBFF",
                        labelFormatter: "",
                    },
                    {
                        type: "inside",
                        show: true,
                        zoomOnMouseWheel: false,
                        moveOnMouseWheel: true,
                        moveOnMouseMove: true,
                        preventDefaultMouseMove: true,
                    },
                ],
                xAxis: {
                    type: "value",
                    // min: new Date(start_).getTime(),
                    // max: new Date(end_).getTime(),
                    scale: true,
                    position: "top",
                    // splitNumber: 7,
                    axisLabel: {
                        show: true,
                        textStyle: { color: "#71829e" },
                        lineStyle: {
                            color: "#71829e",
                        },
                    },
                    axisLine: { show: false },
                    splitLine: {
                        show: true,
                        lineStyle: { color: "rgba(233,233,233,0.1)" },
                    },
                    axisTick: {
                        lineStyle: {
                            color: "#71829e",
                        },
                    },
					data:[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180]
                },
                yAxis: {
                    axisLine: {
                        onZero: false,
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        textStyle: { color: "#71829e" },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: { color: "rgba(233,233,233,0.1)" },
                    },
                    inverse: true,
                    data: yAxisData_plant,
                },
                series: [
                    {
                        type: "custom",
                        renderItem: function (params, api) {
                            var categoryIndex = api.value(0);
                            var start = api.coord([api.value(1), categoryIndex]);
                            var end = api.coord([api.value(2), categoryIndex]);
                            var height = api.size([0, 1])[1] * 0.6;
                            var rectShape = echarts.graphic.clipRectByRect(
                                {
                                    x: start[0],
                                    y: start[1] - 5,
                                    width: end[0] - start[0],
                                    height: 10,
                                },
                                {
                                    x: params.coordSys.x,
                                    y: params.coordSys.y,
                                    width: params.coordSys.width,
                                    height: params.coordSys.height,
                                }
                            );
 
                            return (
                                rectShape && {
                                    type: "rect",
                                    shape: rectShape,
                                    style: api.style(),
                                }
                            );
                        },
                        encode: {
                            x: [1, 2],
                            y: 0,
                        },
                        data: seriesData,
                    },
                ],
            };
				if (option && typeof option === "object") {
					echart.setOption(option, true);
				}
				echart.on('click', (params,index) => {
					console.log(params.data);
					window.alert('你点击了甘特图，点击的是：'+params.data.name+'  数据是：'+JSON.stringify(params.data.value));
				// let pointInPixel = [params.offsetX, params.offsetY];
				// if (echart.containPixel('grid', pointInPixel)) {
				// 	let pointInGrid = echart.convertFromPixel({
				// 		seriesIndex: 0
				// 	}, pointInPixel);
				// 	console.log(pointInGrid,pointInPixel);
				// 	let val
				// 		props.data[pointInGrid[1]].list.forEach((items,index)=>{
				// 			if(items.startTime<=pointInGrid[0] && items.endTime>=pointInGrid[0] ){
				// 				console.log(items);
				// 				val=items
				// 			}
				// 		})
				// 	// })
				// 	console.log(val,'val..............');
				// };
			});
				
		// 		gantt.value.on('click', (params) => {  
        // // 处理点击事件，弹出对话框  
		// 		// 在这里你可以根据 params 获取点击的数据，并展示在对话框中  
		// 		console.log(params);  
		// 	});  
			}
			
		}
		onMounted(() => {
			methods.draw()
		})

		return { ...toRefs(state), ...methods, gantt }
	}
}
</script>

<style lang="scss" scoped>
.gantt_btn{
	width: 100%;
	height: 100%;
}
.gantt {
	width: 100%;
	height: 100%;
}
</style>