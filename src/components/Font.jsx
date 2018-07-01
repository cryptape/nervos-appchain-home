import * as React from 'react'
// import { createPortal, } from 'react-dom'
// import { log, } from '../../utils'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      fontName: '',
      fontSrc: '',
    }


    this.t = null
    this.lang = null
  }

  componentDidMount() {
    const {addFontLoaded} = this
    addFontLoaded()
  }

  // addFontWindowLoad = () => {
  //   const {fontSrc, fontName} = this.props
  //   this.setState({
  //     fontSrc,
  //     fontName,
  //   })
  // }

  addFontLoaded = () => {
    const {fontSrc, fontName} = this.props
    if (fontName !== this.state.fontName) {
      this.setState({fontName})
    }
    if (fontSrc !== this.state.fontSrc) {
      this.setState({fontSrc})
    }
  }

  render() {
    const {fontName, fontSrc} = this.state
    return (
      <style>
        {`
        @font-face {
          font-family: '${fontName}';
          src: url('${fontSrc}');
        }
        `}
      </style>
    )
  }
}
