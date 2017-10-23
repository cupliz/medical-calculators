import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const theme = createMuiTheme()

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker()
