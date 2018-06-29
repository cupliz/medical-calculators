import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

class ResultCardHeader extends Component {
  state = {
    expanded: false
  }

  handleExpandClick = () => this.setState({ expanded: !this.state.expanded })

  render() {
    const { classes, children } = this.props

    let shortResultElement = null

    React.Children.map(children, (child, i) => {
      if (!shortResultElement && typeof child.type !== "symbol") {
        shortResultElement = React.cloneElement(child, { short: true });
      }
    })
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
        <CardContent className={classes.content}>
          <Collapse in={!this.state.expanded} timeout="auto" unmountOnExit>
            {shortResultElement}
          </Collapse>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        </CardContent>
      </Card>
    )
  }
}

ResultCardHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default ResultCardHeader;
