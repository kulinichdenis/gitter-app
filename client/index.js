import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import '../common/style/style.css'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import Room from '../common/containers/Room'
import MainLayout from '../common/containers/MainLayout'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState, window)
const rootElement = document.getElementById('app')

render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route component={MainLayout}>
  			<Route path='/' component={App} />
  			<Route path='/room/*' component={Room} />
  		</Route> 
  	</Router>
  </Provider>,
  rootElement
)
