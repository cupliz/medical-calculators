import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import img404 from './404.svg'

const styles = theme => ({
  fofWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center'
  },
  headline: {
    marginBottom: theme.spacing.unit * 4,
    fontWeight: 'bold'
  },
  title: {
    marginBottom: theme.spacing.unit * 3
  },
  caption: {
    marginBottom: theme.spacing.unit * 6
  },
  img: {
    alignSelf: 'center',
    maxWidth: '100%'
  }
})

const FOF = props => (
  <div className={props.classes.fofWrapper}>
    <Typography
      type='headline'
      align='center'
      className={props.classes.headline}
    >
      Oops!
    </Typography>
    <Typography type='title' align='center' className={props.classes.title}>
      We can’t seem to find the page you are looking for.
    </Typography>
    <Typography type='caption' align='center' className={props.classes.caption}>
      Error code 404
    </Typography>
    <img
      className={props.classes.img}
      src={img404}
      alt='Simpsons chilling'
    />
  </div>
)

FOF.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FOF)
