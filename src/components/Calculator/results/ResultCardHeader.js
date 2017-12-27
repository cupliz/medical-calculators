import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Card, { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Typography from 'material-ui/Typography'

class ResultCardHeader extends Component {
  state = {
    expanded: false
  }

  handleExpandClick = () => this.setState({ expanded: !this.state.expanded })

  render() {
    const { children, classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          title={
            <div className={classes.titleWrapper}>
              <Typography type='title' className={classes.title}>
                Result
              </Typography>
              <IconButton
                className={`${classes.expand} ${this.state.expanded ? classes.expandOpen : ''}`}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          }
        />
        {children}
      </Card>
    )
  }
}

ResultCardHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default ResultCardHeader;
