import React from 'react'
import Card, { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'

export const ResultCardHeader = props => {
  const { classes } = props
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={
          <div className={classes.titleWrapper}>
            <Typography type='title' className={classes.title}>
              Result
            </Typography>
            <IconButton aria-label='Share'>
              <ShareIcon className={classes.shareIcon} />
            </IconButton>
          </div>
        }
      />
      {props.children}
    </Card>
  )
}
