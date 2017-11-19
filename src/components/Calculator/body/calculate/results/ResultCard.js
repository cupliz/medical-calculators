import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'
import { connect } from 'react-redux'

const styles = theme => ({
  card: {
    minWidth: 275
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
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 14,
    fontWeight: 'bold'
  },
  shareIcon: {
    width: 16,
    height: 16
  },
  content: {
    paddingTop: 10
  },
  contentText: {
    marginBottom: 15
  }
})

const renderPointsResultCard = (classes, type, points, pointsData) => {
  if (points === 0 && !pointsData) {
    return null
  } else {
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
        <CardContent className={classes.content}>
          <Typography type='caption' className={classes.contentText}>
            Points
          </Typography>
          <Typography type='title' className={classes.contentText}>
            {points}
          </Typography>
          {pointsData &&
            pointsData.map(item => (
              <Typography
                key={`${points}-${item}`}
                className={classes.contentText}
              >
                {item}
              </Typography>
            ))}
        </CardContent>
      </Card>
    )
  }
}

class ResultCard extends Component {
  state = {
    formulaModule: null
  }

  componentDidMount () {
    const { type, id } = this.props
    if (type === 'formula') {
      import(`../../../../../formulas/${id}.js`)
        .then(module => {
          const formulaModule = module.default
          this.setState({ formulaModule })
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  render () {
    const { classes, type, points, pointsData } = this.props

    if (type === 'formula') {
      return this.state.formulaModule ? <p>loaded</p> : <p>wait</p>
    } else if (type === 'points') {
      return renderPointsResultCard(classes, type, points, pointsData)
    }
  }
}

ResultCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { id, type, points, results } = state.calculator.data
  return {
    id,
    type,
    points,
    pointsData: results[points],
    calculatorData: state.calculator.data
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ResultCard))
