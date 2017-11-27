import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  },
  list: {
    padding: 0
  }
})

const renderList = (list, classes) => {
  return list.map(listItem => (
    <div key={listItem.id}>
      <ListItem
        button
        component={Link}
        to={`/${listItem.id}`}
        className={classes.listItem}
      >
        <ListItemText primary={listItem.title} />
      </ListItem>
      <Divider />
    </div>
  ))
}

const CalculatorList = props => {
  const { classes, data } = props
  return (
    <div className={classes.root}>
      <List component='div' className={classes.list}>
        {renderList(data, classes)}
      </List>
    </div>
  )
}

CalculatorList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CalculatorList)
