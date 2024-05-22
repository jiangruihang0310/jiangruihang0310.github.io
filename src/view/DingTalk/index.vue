<template>
	<div class="hello">
	  <div class="org_tree_div" ref="org_tree_content">
		<vue2-org-tree
		  :data="data"
		  :horizontal="true"
		  :label-class-name="labelClassName"
		  :collapsable="true"
		  @on-expand="onExpand"
		  @on-node-click="NodeClick"
		  :renderContent="renderContent"
		/>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: "HelloWorld",
	data() {
	  return {
		labelClassName: "bg-color-orange",
		data: {
		  id: 0,
		  label: "XXX科技有限公司",
		  number: 40,
		  children: [
			{
			  id: 2,
			  label: "产品研发部",        
			  number: 25,
			  children: [
				{
				  id: 5,
				  label: "研发-前端",        
				  number: 4,
				},
				{
				  id: 6,
				  label: "研发-后端",        
				  number: 4,
				},
				{
				  id: 9,
				  label: "UI设计",        
				  number: 2,
				},
				{
				  id: 10,
				  label: "产品经理",        
				  number: 15,
				},
			  ],
			},
			{
			  id: 3,
			  label: "销售部",        
			  number: 10,
			  children: [
				{
				  id: 7,
				  label: "销售一部",        
				  number: 5,
				},
				{
				  id: 8,
				  label: "销售二部",        
				  number: 5,
				},
			  ],
			},
			{
			  id: 4,
			  label: "财务部",        
			  number: 3,
			},
			{
			  id: 9,
			  label: "HR人事",        
			  number: 2,
			},
		  ],
		},
		currentUnit: "人",
	  };
	},
	methods: {
	  renderContent(h, data) {
		  return (
			<div class="content_div">
			  <div class="title">{data.label}</div>
			  <div class="detail">
				人员：{data.number}
				{this.currentUnit}
			  </div>
			</div>
		  );
	  },
	  //点击节点
	  NodeClick(e, data) {
		// console.log(e, data);
	  },
	  //默认展开
	  toggleExpand(data, val) {
		if (Array.isArray(data)) {
		  data.forEach((item) => {
			this.$set(item, "expand", val);
		  });
		} else {
		  this.$set(data, "expand", val);
		}
	  },
	  collapse(list) {
		list.forEach((child) => {
		  if (child.expand) {
			child.expand = false;
		  }
		  child.children && this.collapse(child.children);
		});
	  },
	  //展开
	  onExpand(e, data) {
		if ("expand" in data) {
		  data.expand = !data.expand;
		  if (!data.expand && data.children) {
			this.collapse(data.children);
		  }
		} else {
		  this.$set(data, "expand", true);
		}
	  },
	},
  };
  </script>
  <style lang="scss" scoped>
  .hello {
	width: 100vw;
	height: 100vh;
  }
  
  .org_tree_div {
	width: 100%;
	height: 100%;
  }
  
  .org_tree_content {
	width: 100%;
	height: calc(100vh - 280px);
	overflow: auto;
  
	.org_tree_div {
	  display: inline-block;
	  min-width: 100%;
	  min-height: calc(100vh - 280px);
	}
  }
  .org_tree_content {
	width: 100%;
	height: calc(100vh - 280px);
	overflow: auto;
	.org_tree_div {
	  display: inline-block;
	  min-width: 100%;
	  min-height: calc(100vh - 280px);
	}
  }
  
  .org-tree-container {
	background: transparent;
  }
  
  /deep/ .org-tree-node-label .org-tree-node-label-inner {
	width: 180px;
	height: 100%;
	background-color: red;
	position: relative;
	  .title {
		color: #ffffff;
		font-weight: bold;
		overflow: hidden; //溢出内容隐藏
		text-overflow: ellipsis; //文本溢出部分用省略号表示
		line-clamp: 2;
	  }
	  .detail {
		color: #ffffff;
		word-break: break-all;
	  }
	}
  </style>
  