import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  }
})

const CalculatorList = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <ListItemText primary='Trash' />
        </ListItem>
        <ListItem button component='a' href='#simple-list'>
          <ListItemText primary='Spam' />
        </ListItem>
      </List>
    </div>
  )
}

CalculatorList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CalculatorList)
