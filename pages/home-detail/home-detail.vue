<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<img :src="formData.author.avatar" mode="aspectFill">
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">{{formData.author.author_name}}</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<!-- <u-parse :content="formData.content" :noData="noData"></u-parse> -->
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content">
					<comments-box></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icons-box">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="heart" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header-item" @click="close">取消</text>
					<text class="popup-header-item" @click="commit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" name="" v-model="commentValue" id="" maxlength="200" fixed cols="30" rows="10" placeholder="请输入评论内容"></textarea>
					<view class="popup-count">{{commentValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				formData: {},
				noData: '<p style="text-align: center; color: #666;">详情加载中...</p>',
				// 输入框的值
				commentValue: ''
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
		},
		methods: {
			// 打开评论发布窗口
			openComment() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			commit() {
				if (this.commentValue) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
				}
				this.setUpdateComment(this.commentValue)
			},
			setUpdateComment(content) {
				uni.showLoading()
				this.$api.update_comment({
					article_id: this.formData._id,
					content
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: '评论成功'
					})
					this.close()
				})
			},
			// 获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData_id
				}).then(res => {
					const { data } = res
					this.formData = data
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
.detail{
	padding: 15px 0;
	padding-bottom: 54px;
}
.detail-title{
	padding: 0 15px;
	font-size: 18px;
	font-weight: bold;
	color: #333;
}
.detail-header{
	display: flex;
	align-items: center;
	margin-top: 10px;
	padding: 0 15px;
	.detail-header-logo{
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.detail-header-content{
		width: 100%;
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
		.detail-header-content-title{
			font-size: 14px;
			color: #333;
		}
		.detail-header-content-info{
			color: #999;
			text{
				margin-right: 10px;
			}
		}
	}
}
.detail-content{
	margin-top: 20px;
	min-height: 500px;
	.detail-html{
		padding: 0 15px;
	}
	.detail-comment{
		margin-top: 30px;
		.comment-title{
			padding: 10px 5px;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #f5f5ff;
		}
		.comment-content{
			padding: 0 15px;
			border-top: 1px solid #eee;
		}
	}
}
.detail-bottom{
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 44px;
	border-top: 1px solid #f5f5f5;
	background-color: #fff;
	box-sizing: border-box;
	.detail-bottom-input{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10px;
		padding: 0 10px;
		width: 100%;
		height: 30px;
		border: 1px solid #ddd;
		border-radius: 5px;
		text{
			font-size: 14px;
			color: #999;
		}
	}
	.detail-bottom-icons{
		display: flex;
		flex-shrink: 0;
		padding: 0 10px;
		.detail-bottom-icons-box{
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
		}
	}
}
.popup-wrap{
	background-color: #FFFFFF;
	.popup-header{
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #666;
		border-bottom: 1px #F5F5F5 solid;
		.popup-header-item{
			height: 50px;
			line-height: 50px;
			padding: 0 15px;
		}
	}
	.popup-content{
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		.popup-textarea{
			width: 100%;
			height: 200px;
		}
		.popup-count{
			display: flex;
			justify-content: flex-end;
			font-size: 12px;
			color: #999;
		}
	}
}
</style>
