import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    paddingBottom: 0
  },
  title: {
    flex: 1,
    fontWeight: '500'
  },
  shareIcon: {
    width: 16,
    height: 16
  },
  content: {
    paddingTop: 10
  },
  resultText: {
    marginBottom: 15
  }
})

const renderContent = (type, content, classes) => {
  if (type === 'paragraph') {
    return (
      <Typography type='caption' className={classes.resultText}>
        {content}
      </Typography>
    )
  } else if (type === 'list') {
    return (
      <ul>
        {content.map(item => (
          <li>
            <Typography type='caption' className={classes.resultText}>
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    )
  }
}

const ClosableCard = props => {
  const { classes, title, type, content } = props

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={
          <div className={classes.titleWrapper}>
            <Typography type='subheading' className={classes.title}>
              {title}
            </Typography>
            <IconButton aria-label='Share'>
              <CloseIcon className={classes.shareIcon} />
            </IconButton>
          </div>
        }
      />
      <CardContent className={classes.content}>
        {renderContent(type, content, classes)}
      </CardContent>
    </Card>
  )
}

ClosableCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClosableCard)
