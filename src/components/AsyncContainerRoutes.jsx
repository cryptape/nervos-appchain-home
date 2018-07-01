import React from 'react'
import {Route} from 'react-router-dom'
import AsyncLoader from './AsyncLoader'
import MainContainer from '../containers/MainContainer'
// const log = console.log.bind(console)
const Loadind = () => (<div>...Loading</div>)

const AsyncContainer = (mod, params) => routerProps => {
  // log('async container', routerProps)
  if (!mod) return null
  const Component = import(`../containers/${mod}`)
  return (
    <AsyncLoader load={Component}>
      {Comp => (Comp ? <Comp {...routerProps} {...params}/> : <Loading />)}
    </AsyncLoader>
  )
}

const AsyncContainerMain = (name, params) => props => {
  // log('async container main', props)
  return (
    <MainContainer {...props} {...params}>
      {AsyncContainer(name, params)(props)}
    </MainContainer>
  )
}

const AsyncMainRoutes = (routes, params) =>
  routes.map((route, i) => (
    <Route {...route} component={AsyncContainerMain(route.name, params)} key={'main route' + i}/>
  ))


const AsyncContainerRoutes = (routes, params) =>
  routes.map((route, i) => (
    <Route {...route} component={AsyncContainer(route.name, params)} key={'container route' + i}/>
  ))

export {
  AsyncMainRoutes,
}

export default AsyncContainerRoutes