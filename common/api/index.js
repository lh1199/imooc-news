// 批量导出文件
const requireApi = require.context(
	// api目录的相对路径
	'.',
	// 是否查询
	false,
	// 查询文件的后錣
	/.js$/
)

let module = {}
requireApi.keys().forEach((key, index) => {
	if (key === './index.js') return
	Object.assign(module, requireApi(key))
})

export default module