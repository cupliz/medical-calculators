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
      return (
        <ResultCardPoints
          classes={classes}
          points={points}
          results={results}
        />
      )
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
