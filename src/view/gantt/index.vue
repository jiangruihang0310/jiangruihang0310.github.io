<template>
  <div id="gstc">
	<Gantt/>
  </div>
</template>

<script>
import Gantt from '@/components/gantt'
export default {
	components:{
		Gantt
	},
  data() {
    return {};
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
#gstc{
	width: 100%;
	height: 100%;
}
</style>