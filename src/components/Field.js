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
  }
})

class Field extends React.Component {
  state = {
    value: ''
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl
          component='fieldset'
          required
          className={classes.formControl}
        >
          <FormLabel component='legend'>
            Congestive Heart Failure History
          </FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender'
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value='no' control={<Radio />} label='No' />
            <FormControlLabel value='yes' control={<Radio />} label='Yes' />
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
