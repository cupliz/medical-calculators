import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

class FormulaComponent extends Component {
  state = {}

  render () {
    const { classes, data } = this.props
    const { questions } = data

    // extract needed field vars
    let requiredCriteria = null
    let majorCriteria = null
    let minorCriteria = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        // calculate is an array of objects
        // loop through that array
        // sum points of each object
        if (index === 0) {  }
        if (index === 1) {  }
        if (index === 2) {  }
      }
      return calculate
    })

    // console.log('requiredCriteria', requiredCriteria)
    // console.log('majorCriteria', majorCriteria)
    // console.log('minorCriteria', minorCriteria)

    return <p>Inside formula</p>
  }
}
export default FormulaComponent
