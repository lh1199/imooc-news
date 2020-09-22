<template>
	<view class="home">
		<!-- 自定义导航 -->
		<navbar></navbar>
		<tab :list="tabList" :tableIndex="tableIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				tableIndex: 0,
				activeIndex: 0
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			change(current) {
				this.tableIndex = current
				this.activeIndex = current
			},
			getLabel() {
				// 调用云函数方法
				this.$api.get_label({
					name: 'get_label'
				}).then(res => {
					const {data} = res
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})
			},
			tab(data, index) {
				this.activeIndex = data.index
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list{
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
