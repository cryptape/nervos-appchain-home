import React from 'react'
import Link from './Link'
import '../style/button.scss'

const Button = (props) => {
  const { label, onClick, className} = props
  let click = () => {}
  if (onClick) {
    click = onClick
  }
  return (
    <div className={`buttonOuter ${className}`}>
      <Link {...props}>
        <div className='buttonInner textSmall' onClick={click}>{label}</div>
      </Link>
      <div className='diagonal' />
    </div>
  )
}

export default Button