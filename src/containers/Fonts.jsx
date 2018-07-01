import React from 'react'
import Font from '../components/Font'
import { createPortal } from 'react-dom'

export default (props) => {
  const {fontTable} = props
  const head = document.head
  const list = fontTable.map((params) => <Font {...params}/>)
  return createPortal(list, head)
}