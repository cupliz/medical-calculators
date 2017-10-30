import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import 'normalize.css'
import theme from './theme/theme'
import './index.css'
import Calculator from './calculator/Calculator'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Calculator />
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker()
