import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
})

const FOF = props => (
  <div>
    <Typography type='headline' gutterBottom>
      Oops!
    </Typography>
    <Typography type='title' gutterBottom>
      We can’t seem to find the page you are looking for.
    </Typography>
    <Typography type='caption' gutterBottom align='center'>
      Error code 404
    </Typography>
  </div>
)

FOF.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FOF)
