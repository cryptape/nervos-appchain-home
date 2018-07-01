const defineLog = () => {
  let log = () => {}
  if (__webpack.env === 'development') {
    log = console.log.bind(console, '>>>')
  }
  return log
}

const log = defineLog()

// 给数字补前缀 prefix, 默认补零
const prefixInt = (originalNum, width, prefix = 0) => {
  const num = originalNum
  const n = width
  const p = prefix
  const a = new Array(n)
  const s = (a.join(p) + num).slice(-n)
  return s
}

const toggle = (target, value1, value2) => {
  const v1 = value1
  const v2 = value2
  const v = target === v2 ? v1 : v2
  return v
}

export {
  log,
  toggle,
  prefixInt,
}