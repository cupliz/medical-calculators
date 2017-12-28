import React from 'react'
import Typography from 'material-ui/Typography'
import ResultCardHeader from './ResultCardHeader'
import ResultCardPointsFragment from './ResultCardPointsFragment'

const ResultCardPoints = ({classes, points, results, showPointsInResults}) => {
  const renderPoints = () => {
    if (showPointsInResults === false) {
      return null
    } else {
      return <ResultCardPointsFragment classes={classes} content={points} />
    }
  }
  if (points === 0 && !results) {
    return null
  } else {
    return (
      <ResultCardHeader classes={classes}>
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
      </ResultCardHeader>
    )
  }
}

export default ResultCardPoints
