import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export const cleanProps = (attribute, key) => {
  const o = {}
  const ks = Object.keys(attribute)
  ks.forEach((k) => {
    if (k !== 'type' && k !== 'text' && k !== 'children') {
      o[k] = attribute[k]
    }
  })
  o.key = o.key || key
  return o
}

export const parsedContent = (content, key) => {
  if (typeof content === 'string') {
    return content
  }
  let type = content.type || 'p'
  let props = cleanProps(content, key)
  let children
  if (content.children) {
    if (typeof content.children === 'string') {
      children = content.children
    } else {
      children = []
      content.children.forEach((c, i) => {
        let e = parsedContent(c, i)
        children.push(e)
      })
    }
  } else if (content.text) {
    children = content.text
  } else {
    return React.createElement(type, props)
  }
  return React.createElement(type, props, children)
}

export const parsedChildren = () => {

}

// export const parsedReact = (content, key) => {
//   const type = content.type || 'p'
//   const children = content.children || ''
//   const props = content.props || {}
//   props.key = props.key || key
//   return React.createElement(type, props, children)
// }



const parsedA = (content, i) => {
  const t = content.text
  const o = cleanProps(content)
  return <a {...o} key={i}>{t}</a>
}

const parsedP = (content, i) => {
  const t = content.text
  const o = cleanProps(content)
  return <p {...o} key={i}>{t}</p>
}

const parsedBr = (content, i) => {
  return <br key={i}/>
}

const parsedMail = (content, i) => {

}


// 需要淘汰, 逐渐改为 parsedContent
export const parsedText = (text) => text.map((t, i) => {
  let type
  typeof t === 'string' ? type = 'default' : type = t.type
  const o = {
    a: parsedA(t, i),
    p: parsedP(t, i),
    br: parsedBr(t, i),
    default: t,
  }
  return o[type]
})

export default parsedContent