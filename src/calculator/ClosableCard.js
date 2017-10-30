import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275,
    backgroundColor: theme.brand.colors.greyBg,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`
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
  },
  listWrapper: {
    paddingLeft: 16,
    marginTop: 0,
    fontSize: '0.75rem'
  },
  list: {

  }
})

const renderContent = (type, content, id, classes) => {
  if (type === 'paragraph') {
    return (
      <Typography type='caption' className={classes.resultText}>
        {content}
      </Typography>
    )
  } else if (type === 'unordered-list') {
    return (
      <ul className={classes.listWrapper}>
        {content.map((item, index) => (
          <li key={`${id} - ${index}`} className={classes.list}>
            <Typography type='caption' className={classes.resultText}>
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    )
  } else if (type === 'ordered-list') {
    return (
      <ol className={classes.listWrapper}>
        {content.map((item, index) => (
          <li key={`${id} - ${index}`} className={classes.list}>
            <Typography type='caption' className={classes.resultText}>
              {item}
            </Typography>
          </li>
        ))}
      </ol>
    )
  }
}

const ClosableCard = props => {
  const { classes, title, type, id, content } = props

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
        {renderContent(type, content, id, classes)}
      </CardContent>
    </Card>
  )
}

ClosableCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClosableCard)
