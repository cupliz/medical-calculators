import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalculateContainer from './calculate/CalculateContainer'
import ReferencesContainer from './references/ReferencesContainer'

const TabContainer = ({ children, dir }) => {
  return <div dir={dir}>{children}</div>
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  calculatorBody: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  calculatorBodyList: {
    maxHeight: '100%',
    width: '100%',
    flex: 1,
    overflow: 'auto',
  },
  appBar: {
    boxShadow: 'none'
  },
  tabs: {
    backgroundColor: '#fff'
  },
  tabSelected: { color: '#000' },
  tabInactive: { color: 'rgba(0, 0, 0, 0.54)' },
  labelContainer: { textTransform: 'capitalize' },
  label: { fontSize: 17 }
})

class CalculatorBody extends Component {
  state = {
    tabIndex: 0,
    customizeHeight: false
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value, customizeHeight: true })
  }

  render () {
    const { classes, theme } = this.props

    return (
      <div className={classes.calculatorBody}>
        <AppBar position='static' color='default' className={classes.appBar}>
          <Tabs
            value={this.state.tabIndex}
            className={classes.tabs}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab
              label='Calculate'
              classes={{
                textColorPrimary: this.state.tabIndex === 0 ? classes.tabSelected : classes.tabInactive,
                labelContainer: classes.labelContainer,
                label: classes.label
              }}
            />
            <Tab
              label='References'
              classes={{
                textColorPrimary: this.state.tabIndex === 1 ? classes.tabSelected : classes.tabInactive,
                labelContainer: classes.labelContainer,
                label: classes.label
              }}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.tabIndex}
          onChangeIndex={this.handleChange}
          disabled={true}
          className={classes.calculatorBodyList}
          animateHeight={this.state.customizeHeight}
        >
          <TabContainer dir={theme.direction}>
            <CalculateContainer
              questions={this.props.data.questions}
              results={this.props.data.results}
              points={this.props.data.points}
              info={this.props.data.info}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <ReferencesContainer
              references={this.props.data.references}
              notes={this.props.data.notes}
              formula={this.props.data.formula}
            />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

CalculatorBody.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CalculatorBody)
