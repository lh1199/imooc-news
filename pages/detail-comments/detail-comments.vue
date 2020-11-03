<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: '',
				page: 1,
				pageSize: 5
			}
		},
		onLoad(query) {
			this.article_id = query.id
			this.get_comments()
		},
		methods: {
			get_comments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {data} = res
					this.commentsList = data
				})
			}
		}
	}
</script>

<style lang="scss">
.comments-content{
	padding: 0 15px;
}
</style>
