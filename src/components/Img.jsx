import * as React from 'react'
// import { createPortal, } from 'react-dom'
// import { log, } from '../../utils'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: props.src1,
    }
  }

  // componentDidMount() {
  //   const {props} = this
  //   const img = new Image()
  //   img.src = props.src2
  //   img.onload = () => {
  //     this.setState({src: props.src2})
  //   }
  // }

  load = () => {
    if (this.props.src2 !== this.state.src1) {
      this.setState({src: this.props.src2})
    }
  }

  render() {
    const {props} = this
    const {src} = this.state
    return (
      <img {...props} src={src} onLoad={this.load} />
    )
  }
}
