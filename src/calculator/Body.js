import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Calculate from './Calculate'
import References from '../components/References'

const TabContainer = ({ children, dir }) => {
  return <div dir={dir}>{children}</div>
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabSelected: { color: '#000' },
  labelContainer: { textTransform: 'capitalize' },
  label: { fontSize: 17 },
  tabs: {
    backgroundColor: '#fff'
  }
})

class Body extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render () {
    const { classes, theme } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={this.state.value}
            className={classes.tabs}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab
              label='Calculate'
              classes={{
                rootPrimarySelected: classes.tabSelected,
                labelContainer: classes.labelContainer,
                label: classes.label
              }}
            />
            <Tab
              label='References'
              classes={{
                rootPrimarySelected: classes.tabSelected,
                labelContainer: classes.labelContainer,
                label: classes.label
              }}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Calculate />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <References />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Body)
