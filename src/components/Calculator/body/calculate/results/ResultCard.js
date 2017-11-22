import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import ResultCardPoints from './ResultCardPoints'

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
  },
  resultWrapper: { display: 'flex', alignItems: 'baseline' },
  resultText: { marginRight: 15, minWidth: 300 },
  decimalPrecisionWrapper: {
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center'
  },
  decimalPrecision: {
    marginTop: 25, marginRight: 15, minWidth: 300
  },
  decimalButtonsWrapper: {
    marginTop: 25,
    display: 'flex',
    alignItems: 'center'
  },
  select: { width: 'auto' },
  decimalButton: {
    width: 36,
    height: 36,
    boxShadow: 'none'
  },
  decimalPoint: {
    display: 'inline',
    margin: '0 10px'
  }
})

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
    const { classes, type, points, results, calculatorData } = this.props

    if (type === 'formula') {
      const { formulaModule: FormulaComponent } = this.state
      return (
        FormulaComponent && (
          <FormulaComponent classes={classes} data={calculatorData} />
        )
      )
    } else if (type === 'points') {
      console.log('points:', points, 'results:', results)
      // if object has that property (result for points) then pass results[points]
      if (results.hasOwnProperty(points)) {
        return (
          <ResultCardPoints
            classes={classes}
            points={points}
            results={results[points]}
          />
        )
      } else {
        // if it doesn't - then get all object properties (points) into an array
        const arrayOfKeys = Object.keys(results)
        // describe how delimiter should look like
        const delimeter = ' - '
        // get range
        let requiredRange = null
        const arrayOfDestructuredKeys = arrayOfKeys.map(item => {
          if (item.indexOf(delimeter) !== -1) {
            // string contains range
            // split it and return split string
            const [from, to] = item.split(delimeter)
            if (points >= from && points <= to) {
              console.log('points >= from && points <= to')
              requiredRange = item
            }
            return item
          } else {
            // string doesn't contain range
            // return it unmodified
            return item
          }
        })
        console.log('requiredRange', requiredRange)
        console.log('arrayOfDestructuredKeys', arrayOfDestructuredKeys)
        // it WILL envolve string parsing (15 - 25, -2 - 3)
        // then check where point lies and pass it as results[points]
        return (
          <ResultCardPoints
            classes={classes}
            points={points}
            results={results[requiredRange]}
          />
        )
      }
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
    results,
    calculatorData: state.calculator.data
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ResultCard))
