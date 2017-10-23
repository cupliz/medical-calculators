import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  badge: {
    borderRadius: '5px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    padding: '3px 7px',
    marginLeft: '10px'
  },
  focusedLabel: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
})

class Field extends React.Component {
  state = {
    value: ''
  }

  handleChange = (event, value) => {
    this.setState({ value })
    this.props.onChange(value)
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel component='legend' classes={{ focused: classes.focusedLabel }}>
            {this.props.label}
          </FormLabel>
          <RadioGroup
            row
            aria-label={this.props.label}
            name={this.props.yesPoints.toString()}
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value={'0'}
              control={<Radio />}
              label={
                <span>
                  No <small className={classes.badge}>0</small>
                </span>
              }
            />
            <FormControlLabel
              value={this.props.yesPoints.toString()}
              control={<Radio />}
              label={
                <span>
                  Yes <small className={classes.badge}>{this.props.yesPoints}</small>
                </span>
              }
            />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

Field.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Field)
