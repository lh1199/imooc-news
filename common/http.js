export default function $http(options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id: '5f5aeb04a48d38000188f383',
		...data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then(res => {
			if (res.result.code === 200) {
				resolve(res.result)
			} else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})
}