const heightToTop = (e, n = 0) => {
  n += e.offsetTop
  if (e === document.body) {
    return n
  } else {
    return heightToTop(e.offsetParent, n)
  }
}

const scroll = (height, scrollElement, n = 20) => {
  const se = scrollElement
  const top = se.scrollTop
  const h = height - top
  const len = h / n
  const func = (len, i, h) => {
    setTimeout(() => {
      se.scrollTop = top + (len * i + len)
      // window.scrollBy(0, top + (len * i + len))
    }, i * 10)
  }
  for (let i = 0; i < n; i++) {
    func(len, i, h)
  }
}

const scrollElementIs = (element) => {
  let e = element
  let top = e.scrollTop
  if (top === 0) {
    e.scrollTop++
    return top !== e.scrollTop
  } else {
    return true
  }
}

const ensuredScrollElement = () => {
  // return document.scrollingElement || document.documentElement
  const list = [document.scrollingElement, document.documentElement, document.body]
  for (let i = 0; i < list.length; i++) {
    let e = list[i]
    if (scrollElementIs(e)) {
      return e
    }
  }
  console.error('未找到滚动元素, 检查浏览器版本')
  return document.documentElement
}

// const heightToTop = (element) => {
//   const e = element
//   const h1 = e.getBoundingClientRect().top
//   const h2 = window.innerHeight
//   const h3 = document.documentElement.scrollTop
// }

const jumpToHash = () => {
  const team = document.getElementById('team')
  const advisor = document.getElementById('advisor')
  const body = document.body
  const hash = location.hash.split('#')[2]
  let scrollElm = ensuredScrollElement()

  if (hash === undefined) {
    scroll(0, scrollElm)
  } else {
    const e = document.getElementById(hash)
    // const h = heightToTop(element)
    const h = e.getBoundingClientRect().top + scrollElm.scrollTop

    scroll(h, scrollElm)
  }
}


export default () => window.onload = setTimeout(() => jumpToHash())
