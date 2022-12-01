/**
 * RGB颜色转HEX
 * @param {number[]} rgb rgb三元数组
 * @return {string} HEX颜色值
 */
async function rgbToHex (rgb) {
  return '#' + rgb.reduce((hex, color) => {
    return hex + color.toString(16).padStart(2, '0')
  }, '')
}

/**
 * 加载图像
 * @param {string} url 图片URL
 * @return {Promise<HTMLImageElement>}
 */
function loadImage (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * 取反色
 * @param {*} hex HEX颜色值
 * @param {boolean} bw 返回黑/白色
 * @return {string} HEX颜色值
 */
function invertColor (hex, bw = true) {
  function padZero (str) {
    return ('00' + str).slice(-2)
  }

  if (hex === '#ffffff' || hex === '#FFFFFF') {
    return '#000000'
  }

  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 6)
  if (bw) {
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF'
  }
  // invert color components
  r = (255 - r).toString(16)
  g = (255 - g).toString(16)
  b = (255 - b).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

/**
 * 提取图片平均色
 * @param {HTMLImageElement | string} img 图片或图片url
 * @param {number} sampling 采样率，单位为像素
 * @return {Promise<string>} HEX颜色值
 */
async function getAverageColor (img, sampling = 5) {
  if (typeof img === 'string') {
    img = await loadImage(img)
  }

  if (!img.complete) {
    await new Promise(resolve => { img.onload = resolve })
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  ctx.drawImage(img, 0, 0, width, height)
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const len = data.length
  let r = 0
  let g = 0
  let b = 0
  let count = 0
  for (let i = 0; i < len; i += 4 * sampling) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    count++
  }
  r = Math.floor(r / count)
  g = Math.floor(g / count)
  b = Math.floor(b / count)
  return rgbToHex([r, g, b])
}

export { getAverageColor, invertColor }
