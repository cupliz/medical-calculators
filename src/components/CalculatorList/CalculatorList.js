import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    background: theme.palette.background.paper
  },
  list: {
    padding: 0
  }
})

const renderList = list => {
  return list.map(listItem => (
    <ListItem key={listItem.id} button component={Link} to={`/${listItem.id}`}>
      <ListItemText primary={listItem.title} />
    </ListItem>
  ))
}

const CalculatorList = props => {
  const { classes, data } = props
  return (
    <div className={classes.root}>
      <List component='div' className={classes.list}>
        {renderList(data)}
      </List>
    </div>
  )
}

CalculatorList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CalculatorList)
