<template>
  <div id="map"></div>
</template>

<script>
// import { getMap } from "@/api/https";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      key: "fd6697ba33023f67e965a65f8abd69a3",
    };
  },
  async mounted() {
    this.initMap();
  },
  methods: {
    //实现简单的通过经纬度定位位置，以及点标记的地图
    // 加载地图
    initMap() {
      AMapLoader.load({
        key: this.key, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
			console.log(AMap);
          this.map = new AMap.Map("map", {
            pitch:65, //修改地图的初始俯仰角度，俯仰角的有效范围为0度－83度。
            viewMode: "3D", //设置viewMode属性为3D
            zoom: 17, //缩放等级
            expandZoomRange: true, //当 expandZoomRange 为 true 时， zooms的最大级别在PC上可以扩大到20级
            zooms: [3, 18], //在PC上，默认为[3,18],取值范围[3-18];在移动设备上,默认为[3,19],取值范围[3-19],移动端还是高清19/非高清20
            center: [115.15,36.28], //中心点位置
			icon: require("@/assets/icon.png"),
			
		});
			var marker = new AMap.Marker({
				position: [115.15, 36.28], // 标记点坐标
				title:'大名县',
				map: this.map, // 指定将标记添加到哪个地图实例中	
			})
		
			marker.on('click', function (p) {
				console.log(p,123456789);
				// 打开信息窗体，显示标注点相关信息
				var infoWindow = new AMap.InfoWindow({
					content: '这里是北京市',
					offset: new AMap.Pixel(0, -30),
				});
				infoWindow.open(this.map, marker.getPosition());
			});

		marker.setMap(this.map)
        })
        .catch((e) => {
          console.log(e);
        });
		
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 80%;
  height: 100%;
}
</style>