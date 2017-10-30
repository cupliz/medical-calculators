import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import 'normalize.css'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import theme from './theme/theme'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
