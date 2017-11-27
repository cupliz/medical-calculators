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

const sortList = list => {
  list.sort(function (a, b) {
    const titleA = a.title.toLowerCase()
    const titleB = b.title.toLowerCase()
    if (titleA < titleB) {
      // sort string ascending
      return -1
    } else if (titleA > titleB) {
      return 1
    } else {
      return 0 // no sorting
    }
  })
  return list
}

const CalculatorList = props => {
  const { classes, data } = props
  return (
    <div className={classes.root}>
      <List component='div' className={classes.list}>
        {renderList(sortList(data))}
      </List>
    </div>
  )
}

CalculatorList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CalculatorList)
