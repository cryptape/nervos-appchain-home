import React from "react"
import Cookies from 'universal-cookie';
import Link from "react-router-dom"
import {log} from '../utils'

import HeaderBar from '../components/Headerbar'
// import FooterBar from '../components/FooterBar'

// import '../style/baseColor.scss'
// import '../style/base.scss'
// import '../style/main.scss'
// import '../style/buttons.scss'
// import '../style/animation.scss'
// import '../style/pure-min.scss'
// import '../style/template.scss'
// import '../style/color.scss'
// import '../style/font.scss'
// import '../style/title.scss'
// import '../style/position.scss'
// import '../style/hoverDown.scss'


export default class MainContainer extends React.Component {
  constructor() {
    super()
  }

  render() {
    // log('main container', this.props)
    return (
      <div className="mainContainer">
        {/* <HeaderBar {...this.props}/> */}
        {this.props.children}
        {/*<FooterBar/>*/}
      </div>
    )
  }
}

