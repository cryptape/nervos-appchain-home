import React, {Component} from 'react'
import axios from 'axios'
import {createContentApi} from '../config/apiTable'
// import AsyncLoader from '../components/AsyncLoader'
import Loading from '../components/Loading'
import {log} from '../utils'
import '../style/home.scss'

class AsyncLanguage extends Component {
  constructor(props) {
    // log('async language constructor')
    super(props)
    const {contentFile, view_language} = props

    const tag = `${contentFile}?locale=${view_language}`
    let content = localStorage[`content:${tag}`]
    if (!content) {
      // const api = createContentApi(tag)
      // const request = new XMLHttpRequest()
      // request.open('GET', api, false)
      // request.send(null)
      // const res = JSON.parse(request.response)
      // content = res.data.content
    } else {
      content = JSON.parse(content)

      this.state = {
        content,
      }
      this.fetchApi(props)
    }

  }

  componentDidMount() {
    // log('home did mound', this.props.view_language)
    // this.fetchInfo(this.props.view_language)
    this.fetchApi()
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // log(nextProps, prevState)
  // }

  // fetchInfo = (lang) => {
  //   import(`../content/${lang}/${this.props.contentFile}`).then((contentInfo) => {
  //     // log('fetch info', contentInfo)
  //     const content = contentInfo.default
  //     // log('fetchInfo',lang, content)
  //     this.setState({content})
  //   })
  //   // this.loadInfo = require(`bundle-loader?lazy!../content/${lang}/home`)
  // }

  fetchApi = (params) => {
    let {props} = this
    if (!props) {
      props = params
    }
    const {contentFile, view_language} = props
    const tag = `${contentFile}?locale=${view_language}`
    const api = createContentApi(tag)
    axios.get(api).then((request) => {
      try {
        const content = request.data.data.content
        localStorage[`content:${tag}`] = JSON.stringify(content)
        this.setState({content})
      } catch (error) {
        log(error)
      }
    })
  }

  render() {
    if (this.state) {
      const {content} = this.state
      const {Main} = this.props
      const params = {
        ...this.props,
        content,
      }
      delete params.Main
      delete params.contentFile
      return <Main {...params}/>
    } else {
      return <Loading/>
    }
  }
}
export default AsyncLanguage