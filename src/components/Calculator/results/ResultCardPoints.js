import React from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from './ResultCardHeader'

const ResultCardPoints = ({classes, points, results, showPointsInResults}) => {
  const renderPoints = () => {
    if (showPointsInResults === false) {
      return null
    } else {
      return (
        <div>
          <Typography type='caption' className={classes.contentText}>
            Points
          </Typography>
          <Typography type='title' className={classes.contentText}>
            {points}
          </Typography>
        </div>
      )
    }
  }
  if (points === 0 && !results) {
    return null
  } else {
    return (
      <ResultCardHeader classes={classes}>
        <CardContent className={classes.content}>
          {renderPoints()}
          {results &&
            results.map(item => (
              <Typography
                key={`${points}-${item}`}
                className={classes.contentText}
              >
                {item}
              </Typography>
            ))}
        </CardContent>
      </ResultCardHeader>
    )
  }
}

export default ResultCardPoints
