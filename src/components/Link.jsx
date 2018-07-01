import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Link_ = (props) => {
  const {href, to, nav, children, className=''} = props
  // console.log(children)
  if (href !== undefined) {
    return <a className={className} href={href}>{children}</a>
  } else if (to !== undefined) {
    return <Link className={className} to={to}>{children}</Link>
  } else if (nav !== undefined) {
    return <a className={className} href={href}>{children}</a>
  } else {
    return children
  }
}

export default Link_