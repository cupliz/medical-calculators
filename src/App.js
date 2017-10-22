import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'
import Calculate from './components/Calculate'
import Reference from './components/Reference'
import { DEEP_BLUE, DOC_BLUE_DEFAULT } from './colors/colors'

const App = () => {
  const inkBarStyle = { backgroundColor: DEEP_BLUE }
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
      <Tabs
        inkBarStyle={inkBarStyle}
      >
        <Tab label='Calculate'>
          <Calculate />
        </Tab>
        <Tab label='Reference'>
          <Reference />
        </Tab>
      </Tabs>
    </div>
  )
}

export default App
