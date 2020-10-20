<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x="true" >
			<view class="tab-scroll_box">
				<view v-for="(item, index) in list" class="tab-scroll_item" :key="index" @click="clickTab(item, index)" :class="{active: activeIndex === index}">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size="26" color="#666" @click="open"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		// 可以监听 data props 值的变化
		watch: {
			tabIndex(newVal) {
				console.log(11111111111111111111111111111111111)
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			clickTab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			},
			open() {
				uni.navigateTo({
					url: '/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid #f5f5f5;
		width: 100%;
		box-sizing: border-box;
		.tab-scroll{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			.tab-scroll_box{
				display: flex;
				height: 45px;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				.tab-scroll_item{
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
					&.active{
						color: $mk-base-color
					}
				}
			}
		}
		.tab-icons{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			cursor: pointer;
			&::after{
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
