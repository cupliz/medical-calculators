import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'
import { grey900, cyan500 } from 'material-ui/styles/colors'
import Calculate from './components/Calculate'
import Reference from './components/Reference'
import { DOC_BLUE_DEFAULT } from './colors/colors'

const App = () => {
  const buttonStyle = { backgroundColor: '#fff', color: grey900 }
  const inkBarStyle = { backgroundColor: cyan500 }
  const appBarStyle = { backgroundColor: DOC_BLUE_DEFAULT }
  return (
    <div>
      <AppBar
        style={appBarStyle}
        title={
          <span>
            CHADS<sub>2</sub> Score for Atrial Fibrillation
          </span>
        }
      />
      <Tabs inkBarStyle={inkBarStyle}>
        <Tab label='Calculate' buttonStyle={buttonStyle}>
          <Calculate />
        </Tab>
        <Tab label='Reference' buttonStyle={buttonStyle}>
          <Reference />
        </Tab>
      </Tabs>
    </div>
  )
}

export default App
