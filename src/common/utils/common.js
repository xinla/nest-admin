/**
 * 通用js方法封装处理
 */

/**
 * url参数转对象
 * @param {string} url
 * @returns {Object}
 */
export function query2Obj(url) {
	url = url || window.location.href
	let search = url.substring(url.indexOf('?') + 1)
	let obj = {}
	let reg = /([^?&#=]+)=([^?&#=]*)/g
	search?.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1)
		let val = decodeURIComponent($2)
		val = String(val)
		obj[name] = val
		return rs
	})
	return obj
}

/**
 * 对象转url参数
 * @param {Object} obj
 * @returns {Array}
 */
export function obj2query(obj) {
	if (!obj) return ''
	return Object.keys(obj)
		.map((key) => {
			if (obj[key] === undefined) return ''
			return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
		})
		.join('&')
}

/**
 * 获取url参数中name对应的值
 * @param {string} name
 */
export function getQueryValue(name) {
	let reg = new RegExp('(^|&|\\?)' + name + '=([^&#]*)(&|#|$)')
	let r = window.location.href.match(reg)
	return r ? decodeURIComponent(r[2]) : ''
}

/**
 * 获取字节长度
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
	// returns the byte length of an utf8 string
	let s = str.length
	for (var i = str.length - 1; i >= 0; i--) {
		const code = str.charCodeAt(i)
		if (code > 0x7f && code <= 0x7ff) s++
		else if (code > 0x7ff && code <= 0xffff) s += 2
		if (code >= 0xdc00 && code <= 0xdfff) i--
	}
	return s
}

// 首字母大小
export function titleCase(str) {
	return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
	return str.replace(/-[a-z]/g, (str1) => str1.substr(-1).toUpperCase())
}

/**
 * 生成指定长度的随机字符串
 * @param {number} length 字符串长度
 * @param {string} before 前缀
 * @param {string} after 后缀
 * @returns {string}
 */
export function uuid(length, before = '', after = '') {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const charsLen = chars.length
	let uuid = []
	for (let i = 0; i < length; i++) {
		uuid[i] = chars.charAt(0 | (Math.random() * charsLen))
	}
	return before + uuid.join('') + after
}

// 判断是否为移动端
export function isMobile() {
	let flag = navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
	)
	return flag
}

/**
 * 递归删除树形对象中的某些字段
 * @param {Object} obj
 * @param {Array} keyArray
 */
export function delTreeKeys(obj, keyArray) {
	for (const key in obj) {
		const element = obj[key]
		if (element && typeof element == 'object') {
			delTreeKeys(element, keyArray)
		}
		keyArray.includes(key) && delete obj[key]
	}
	return obj
}

/**
 * 下载bolb文件
 * @param {*} blob bolo源数据 必需
 * @param {*} downloadName 下载文件名，需含文件后缀名 必需
 * @param {*} type 文件类型 enum: excel,zip,image
 * @param {*} callback 成功回调
 */
export function downloadBlob(blob, downloadName, type, callback) {
	if (!blob || !downloadName) {
		this?.msgError?.('文件或文件名不存在，请联系系统管理员')
		throw '文件或文件名不存在，请联系系统管理员'
	}
	if (blob instanceof Blob) {
		const typeDict = {
			excel: 'application/vnd.ms-excel',
			zip: 'application/zip',
			image: 'application/image',
		}
		type && (blob = new Blob([blob], { type: typeDict[type] || type }))
		let url = window.URL.createObjectURL(blob)
		const a = document.createElement('a') // 创建a标签
		a.href = url
		a.download = dateFormat(new Date(), 'YYMMDD-HHmmss-') + downloadName // 下载文件名，不能包含英文 : 冒号
		a.click()
		a.remove()
		URL.revokeObjectURL(url) // 释放内存
		callback && callback()
		this?.$msgSuccess?.('正在下载，请稍后至浏览器下载栏查看')
	} else if (/^(http|data:image)/.test(blob) && type === 'image') {
		let image = new Image()
		image.setAttribute('crossOrigin', 'anonymous')
		image.src = blob
		image.onload = () => {
			let canvas = document.createElement('canvas')
			canvas.width = image.width
			canvas.height = image.height
			let ctx = canvas.getContext('2d')
			ctx.drawImage(image, 0, 0, image.width, image.height)
			canvas.toBlob((blob) => {
				downloadBlob(blob, downloadName, callback)
			})
		}
	} else {
		this?.msgError?.('blob：文件类型错误')
		throw 'blob：文件类型错误'
	}
}

/**
 * 数组构造树型结构数据
 * @param {Array} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function arrayToTree(data, id, parentId, children) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	let result = []
	data = JSON.parse(JSON.stringify(data))
	if (!Array.isArray(data)) {
		return result
	}
	data.forEach((item) => {
		delete item[children]
	})
	let map = {}
	data.forEach((item) => {
		map[item[id]] = item
	})
	data.forEach((item) => {
		let parent = map[item[parentId]]
		if (parent) {
			parent[children] || (parent[children] = [])
			parent[children].push(item)
		} else {
			result.push(item)
		}
	})
	return result
}

/**
 * 树转数组
 * @param {Array} tree
 * @param {String} children 孩子节点字段 默认 'children'
 * @param {Function} callback 回调函数
 * @returns {Array}
 */
export function treeToArray(tree = [], children = 'children', callback) {
	let result = []
	let level = 0
	function dg(obj) {
		callback && callback(obj, result, level)
		++level
		if (obj[children]) {
			result.push(...obj[children])
			obj[children].forEach((e) => {
				dg(e)
			})
			// delete obj.children
		}
		--level
	}
	if (Array.isArray(tree)) {
		result.push(...tree)
		tree.forEach((e) => dg(e))
	} else {
		result.push(tree)
		dg(tree)
	}
	return result
}

/**
 * 复制文字
 * @param {String} txt
 * @returns
 */
export function copyText(txt) {
	if (!txt) {
		this?.msgError?.('内容为空!')
		return
	}
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(txt)
			.then(() => $sdk.msgSuccess('复制成功'))
			.catch(() => this.msgError('复制失败'))
	} else {
		try {
			const input = document.createElement('input')
			input.style.cssText = 'opacity: 0;'
			input.type = 'text'
			input.value = txt // 修改文本框的内容
			document.body.appendChild(input)
			input.select() // 选中文本
			document.execCommand('copy') // 执行浏览器复制命令
			this?.$msgSuccess?.('复制成功')
			input.remove()
		} catch (error) {
			this?.msgError?.('复制失败')
		}
	}
}

// echart图表配色规范
export const echartColors = [
	'hsl(345, 82%, 54%)', //getComputedStyle(element).getPropertyValue("--Color");
	'#0F68FF',
	'#34D7C3',
	'#FFBF49',
	'#52DDFF',
	'#34D781',
	'#FFE85F',
	'#7F47FF',
	'#A47D79',
	'#7796D7',
	'#89C369',
	'#B595D4',
	'#E4CBCB',
	'#7D889B',
	'#AAAFB7',
	'#DCD7B0',
	'#749E84',
	'#B0BBDC',
]

/**
 * 滚动到指定元素
 * @param {*} el
 */
export function scrollIntoView(el) {
	el.scrollIntoViewIfNeeded ? el.scrollIntoViewIfNeeded(false) : el.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
