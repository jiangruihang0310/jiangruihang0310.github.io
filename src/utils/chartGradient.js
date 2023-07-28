export function chartGradient(type,rgb1,rgb2){
	return {
		type: type,
		x: 1,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [{
			offset: 0, color:rgb1 // 0% 处的颜色
		}, {
			offset: 1, color: rgb2 // 100% 处的颜色
		}],
		global: false // 缺省为 false
	  }
}