<template>
	<el-form :class="className" :label-width="formConfig.labelWidth" :label-position="formConfig.labelPosition" :ref="formConfig.ref"
		:model="formParams" :inline="formConfig.inline">
		<el-form-item :label="item.label" v-for="(item, index) in formDataList" :key="index" :prop="item.prop"
			:rules="item.rules">
			<el-input v-if="item.type === 'input'" v-model="formParams[item.prop]"
				:placeholder="item.placeholder"></el-input>
			<el-select v-if="item.type === 'select'" style="width: 100%" v-model="formParams[item.prop]"
				:placeholder="item.placeholder">
				<el-option :label="opItem.label" :value="opItem.value" v-for="(opItem, index) in item.options"
					:key="index"></el-option>
			</el-select>
			<el-date-picker v-if="item.type === 'date'" type="date" value-format="yyyy-MM-dd"
				v-model="formParams[item.prop]" :placeholder="item.placeholder"></el-date-picker>
			<el-date-picker v-if="item.type === 'daterange'" type="daterange" value-format=“yyyy-MM-dd”
				start-placeholder="开始时间" end-placeholder="结束时间" v-model="formParams[item.prop]"></el-date-picker>
			<el-radio-group v-if="item.type === 'radio'" v-model="formParams[item.prop]" :placeholder="item.placeholder">
				<el-radio :label="opItem.label" v-for="(opItem, index) in item.options" :key="index"
					:rules="item.rules"></el-radio>
			</el-radio-group>
			<el-input v-if="item.type === 'textarea'" type="textarea" v-model="formParams[item.prop]"
				:placeholder="item.placeholder"></el-input>
			<el-switch v-if="item.type === 'switch'" v-model="formParams[item.prop]"></el-switch>
		</el-form-item>
		<el-form-item v-if="btnType">
			<template>
				<slot name="operation"></slot>
			</template>
		</el-form-item>
	</el-form>
</template>

<script>
// 父组件配置
// data(){
// 	return{
// 		formParams: {
//         address: "",   // 响应式   表单返回的结果
//       },
//       formDataList: [
//         {
//           label: "地区地址",
//           prop: "address",   // 这个需要与formParams 相符
//           type: "input",   // 表单类型 input 输入框 select选择框 需要添加options 属性 date事件选择框  daterange 时间选择，开始和结束事件选择
//           placeholder: "请输入地区",    默认输入的
//           rules: [{ required: true }],  正则校验 
//         }
// 		]
// 		},
// formConfig: {
// 		   labelWidth: "100px",  // lable 的宽度
//         inline: true,   // 是否行内属性
//         ref: "formRef",  // $ref
//         labelPosition: "right", label方向
//       },
// }
// methods(){
//  清空表单内容
// 	resetInfo() {
// 		this.formParams = {};
// 	},
// 	commitData() {
// 		这样就可以获取子组件中的表单数据啦
//   	this.$refs[this.formConfig.ref].transferData().then((date) => {
//    	console.log(date);
//   });
// 	},
// }
export default {
	/**
	 * formDataList  表单数据
	 * formParams   表单value /prop
	 * formConfig   表单配置值
	 * btnType  表单里是否有btn按钮
	 */
	props: {
		btnType: {
			type: Boolean,
			default: () => false
		},
		formDataList: {
			type: Array,
			default: () => [],
		},
		formParams: {
			type: Object,
			default: () => { },
		},
		formConfig: {
			type: Object,
			default: () => { },
		},
		className:{
			type:String,
			default:()=>'',
		}
	},
	methods: {
		// 从外部验证表单是否必填项满足条件
		validated(callback) {
			this.$refs[this.formConfig.ref].validate((valid) => {
				callback();
			});
		},
		// 将子组件的表单内容传递给父表单
		transferData() {
			return new Promise((resolve, reject) => {
				this.$refs[this.formConfig.ref].validate((valid) => {
					if (valid) {
						resolve(this.formParams);
					} else {
						reject("err");
					}
				});
			});
		},
	},
};

</script>

<style lang="scss" scoped>
/deep/.el-form-item {
	margin: 0;

	.el-form-item__content {
		height: 32px;
	}

	label {
		// width: 60px !important;

		font-size: 16px;
		font-weight: 600;
	}

	input {
		height: 32px;
		line-height: 32px;
	}

	.el-date-editor {
		.el-range-input {
			background: none;
		}

		.el-input__icon {
			height: 32px;
		}

		width: 240px;
		height: 32px;
		line-height: 32px;

	}
}</style>