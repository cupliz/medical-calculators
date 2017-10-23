import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
})

const Result = props => {
  const { classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type='body1' className={classes.title}>
            Word of the Day
          </Typography>
          <Typography type='headline' component='h2'>
            123
          </Typography>
          <Typography type='body1' className={classes.pos}>
            adjective
          </Typography>
          <Typography component='p'>
            well meaning and kindly
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

Result.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Result)
