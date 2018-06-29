import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    minWidth: 275,
    backgroundColor: theme.brand.colors.greyBg,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`
  },
  header: {
    paddingBottom: 0
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontWeight: '500'
  },
  content: {
    paddingTop: 10
  },
  contentText: {
    marginBottom: 15
  },
  listWrapper: {
    paddingLeft: 16,
    marginTop: 0,
    fontSize: '0.75rem'
  }
})

const renderContent = (type, content, id, classes) => {
  if (type === 'paragraph') {
    return (
      <Typography type='caption' className={classes.contentText}>
        {content}
      </Typography>
    )
  } else if (type === 'unordered-list') {
    return (
      <ul className={classes.listWrapper}>
        {content.map((item, index) => (
          <li key={`${id} - ${index}`}>
            <Typography type='caption' className={classes.contentText}>
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
            <Typography type='caption' className={classes.contentText}>
              {item}
            </Typography>
          </li>
        ))}
      </ol>
    )
  }
}

const InfoCard = props => {
  const { type, content, id, classes, title } = props

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={
          <div className={classes.titleWrapper}>
            <Typography type='subheading' className={classes.title}>
              {title}
            </Typography>
          </div>
        }
      />
      <CardContent className={classes.content}>
        {renderContent(type, content, id, classes)}
      </CardContent>
    </Card>
  )
}

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InfoCard)
