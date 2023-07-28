export const CHARTS_LINE=[
	{
		type: "line",
		modelName: "chartsList",
		typeName: "setCharts",
		dataName: "charsList",
		parameter: { type: '1', selectName: '' },
		height: '22vh',
		legend: true,
		color: ["#2db7f5"],
		bgColor: "13,60,83",
		xColor: "#fff",
		xLineColor: "rgba(141, 210, 232, 1)",
		charColor: ["48,85,148", '255,255,255', "5,213,255", '106,250,159'],
		legendLocation: '80%'
	},
	{
        type: "bar",
        modelName: "chartsList",
        typeName: "setCharts",
        dataName: "charsList1",
        parameter: { type: '2', selectName: '' },
        height: '27vh',
        legend: true,
        color: ["#2db7f5"],
        bgColor: "13,60,83",
        xColor: "#fff",
        xLineColor: "rgba(141, 210, 232, 1)",
        charColor: ["48,85,148", '255,255,255', "5,213,255", '106,250,159', "200,255,33", "57,240,253"],
        legendLocation: '80%'
    },
]