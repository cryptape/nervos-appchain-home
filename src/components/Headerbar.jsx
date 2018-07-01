import React from 'react'
import AsyncLanguage from './AsyncLanguage'
import Link from './Link'
import {log} from '../utils'
import homeImg from '../img/home'
import imgCommon from '../img/common'
import '../style/headerbar'


class Lang extends React.Component {
  constructor(props) {
    super()
    this.state = {
      menuOpen: false,
    }
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    const {props} = this
    const {view_changeLanguage: changeLanguage, view_language: language, content} = props
    const {langMenu} = content
    const current = langMenu.find((params) => params.lang === language).children
    let menucls = 'headerbarLangMenu '
    if (this.state.menuOpen) {
      menucls += 'open'
    }
    return (
      <div className="headerbarLang">
        <img className="" src={imgCommon.language}/>
        <span className="headerbarNavCell" onClick={this.toggleMenu}>{current}</span>
        <div className={menucls}>
          {
            langMenu.map((params, i) => {
              const {lang, children} = params
              return (
                <div className="headerbarNavCell" onClick={() => changeLanguage(lang)} key={lang}>{children}</div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const Links = (props) => {
  const {content} = props
  const {navagations} = content
  return (
    <React.Fragment >
      {navagations.map((params, i) => {
        params.className = 'headerbarNavCell'
        return (
          <Link {...params} key={i}/>
        )
      })}
    </React.Fragment>
  )
}

const Main = (props) => {
  const {view_changeLanguage: changeLanguage, content} = props
  // log(props)
  const {navagations} = content
  return (
    <div className="headerbar">
      <div className="headerbarContainer">
        <Link className="headerbarLogo" to="/">
          {/*<img src={homeImg.logo}/>*/}
          <div className="headerbarLogoTop">NERVOS</div>
          <div className="headerbarLogoBottom">AppChain</div>
        </Link>
        <div className="headerbarNavagation">
          <Links {...props}/>
          <Lang {...props}/>
        </div>
      </div>
    </div>
  )
}

export default (props) =>
  <AsyncLanguage {...props} Main={Main} contentFile='headerbar'/>