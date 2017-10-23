import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Radio, { RadioGroup } from 'material-ui/Radio'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'

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
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender'
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='other' control={<Radio />} label='Other' />
            <FormControlLabel
              value='disabled'
              disabled
              control={<Radio />}
              label='Disabled'
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          component='fieldset'
          required
          error
          className={classes.formControl}
        >
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender'
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='other' control={<Radio />} label='Other' />
            <FormControlLabel
              value='disabled'
              disabled
              control={<Radio />}
              label='Disabled'
            />
          </RadioGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </div>
    )
  }
}

Field.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Field)
