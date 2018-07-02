import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import AsyncContainerRoutes, {AsyncMainRoutes} from './components/AsyncContainerRoutes'
// import Fonts from './containers/Fonts'
import routeTableMain from './config/routeTable'
import languageTable from './config/languageTable'
// import fontTable from './config/fontTable'
import {log} from './utils'
import './style/base.scss'
import './style/font.scss'

class View extends React.Component {
  constructor() {
    super()
    let lang
    if (languageTable.includes(localStorage.getItem('__pageLanguage'))) {
      lang = localStorage.getItem('__pageLanguage')
    } else if (languageTable.includes(navigator.language)) {
      lang = navigator.language
    } else {
      lang = languageTable[0]
      localStorage.setItem('__pageLanguage', lang)
    }
    lang = 'zh-CN'
    this.state = {
      view_language: lang,
    }
    localStorage.setItem('__pageLanguage', lang)
    this.languages = languageTable
  }

  view_changeLanguage = (language) => {
    const view_language = language
    // log('view change language', language,this.languages, this.languages.includes(view_language))
    if (this.state.view_language !== language && this.languages.includes(view_language)) {
      // log('includes', view_language, language)
      this.setState({view_language})
      // log('state', this.state.view_language)
      localStorage.setItem('__pageLanguage', view_language)
    }
  }

  render() {
    const params = {
      view_language: this.state.view_language,
      view_changeLanguage: this.view_changeLanguage,
    }
    // log('view params', params)
    // log(fontTable)
    return (
      <Router>
        <div>
          {/*<Route render={() => <Fonts fontTable={fontTable}/>} path='/' key="fonts"/>*/}
          <Switch>
            {AsyncMainRoutes(routeTableMain, params)}
          </Switch>

        </div>
      </Router>
    )
  }
}

const addMainView = () => {
  const root = document.getElementById('root')
  ReactDOM.render(<View/>, root)
}

const main = () => {
  addMainView()
  // addFonts(fontTable)
}

main()

// log(g_webpack.env)