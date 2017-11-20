import React from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'

const doseFormula = (weight, dosage) => {
  // Dose = Weight * Dosage
  return weight * dosage
}

const conversionDosage = [
  { value: 1000, unit: 'gm/kg' },
  { value: 0.001, unit: 'mcg/kg' },
  { value: 1, unit: 'mg/kg' }
]

const conversionWeight = [
  { value: 1, unit: 'kg' },
  { value: 0.45359237, unit: 'lb' }
]

const conversionMedAmount = [
  { value: 1000, unit: 'gm' },
  { value: 0.001, unit: 'mcg' },
  { value: 1, unit: 'mg' }
]

const conversionPerVolume = [
  { value: 1000, unit: 'L' },
  { value: 1, unit: 'mL' }
]

const conversionDoseUnit = [
  { value: 2000, unit: 'gm BID' },
  { value: 1000, unit: 'gm Daily' },
  { value: 4000, unit: 'gm QID' },
  { value: 3000, unit: 'gm TID' },
  { value: 24000, unit: 'gm q1 hr' },
  { value: 12000, unit: 'gm q2 hr' },
  { value: 6000, unit: 'gm q4 hr' },
  { value: 0.002, unit: 'mcg BID' },
  { value: 0.001, unit: 'mcg Daily' },
  { value: 0.004, unit: 'mcg QID' },
  { value: 0.003, unit: 'mcg TID' },
  { value: 0.024, unit: 'mcg q1 hr' },
  { value: 0.012, unit: 'mcg q2 hr' },
  { value: 0.006, unit: 'mcg q4 hr' },
  { value: 2, unit: 'mg BID' },
  { value: 1, unit: 'mg Daily' },
  { value: 4, unit: 'mg QID' },
  { value: 3, unit: 'mg TID' },
  { value: 24, unit: 'mg q1 hr' },
  { value: 12, unit: 'mg q2 hr' },
  { value: 6, unit: 'mg q4 hr' }
]

const liquidDoseUnit = [
  { value: 2000, unit: 'L BID' },
  { value: 1000, unit: 'L Daily' },
  { value: 4000, unit: 'L QID' },
  { value: 3000, unit: 'L TID' },
  { value: 24000, unit: 'L q1 hr' },
  { value: 12000, unit: 'L q2 hr' },
  { value: 6000, unit: 'L q4 hr' },
  { value: 2, unit: 'mL BID' },
  { value: 1, unit: 'mL Daily' },
  { value: 4, unit: 'mL QID' },
  { value: 3, unit: 'mL TID' },
  { value: 24, unit: 'mL q1 hr' },
  { value: 12, unit: 'mL q2 hr' },
  { value: 6, unit: 'mL q4 hr' }
]

/*


<select name="Liquid_Dose_unit" onchange="WeightBasedDivDose_fx();"  class="medCalcFontSelect calc_unitSelect">
  <option value="2000|0|L BID">L BID</option>
<option value="1000|0|L Daily">L Daily</option>
<option value="4000|0|L QID">L QID</option>
<option value="3000|0|L TID">L TID</option>
<option value="24000|0|L q1 hr">L q1 hr</option>
<option value="12000|0|L q2 hr">L q2 hr</option>
<option value="6000|0|L q4 hr">L q4 hr</option>
<option value="2|0|mL BID">mL BID</option>
<option value="1|0|mL Daily" selected="selected">mL Daily</option>
<option value="4|0|mL QID">mL QID</option>
<option value="3|0|mL TID">mL TID</option>
<option value="24|0|mL q1 hr">mL q1 hr</option>
<option value="12|0|mL q2 hr">mL q2 hr</option>
<option value="6|0|mL q4 hr">mL q4 hr</option>
</select>
*/

const FormulaComponent = ({ classes, data }) => {
  // extract needed field vars
  let dosageValue = null
  let dosageUnits = null
  let weightValue = null
  let weightUnits = null

  if (data.questions[0].calculate) {
    dosageValue = data.questions[0].calculate.input
    dosageUnits = data.questions[0].calculate.select.split('/')[0]
  }

  if (data.questions[1].calculate) {
    weightValue = data.questions[1].calculate.input
    weightUnits = data.questions[1].calculate.select
  }

  console.log(dosageValue, dosageUnits)
  console.log(weightValue, weightUnits)

  if (dosageValue && weightValue) {
    return (
      <ResultCardHeader classes={classes}>
        <CardContent className={classes.content}>
          <Typography type='caption' className={classes.contentText}>
            Dose
          </Typography>
          <Typography type='title' className={classes.contentText}>
            {doseFormula(dosageValue, weightValue)}
          </Typography>
        </CardContent>
      </ResultCardHeader>
    )
  } else {
    return null
  }
}
export default FormulaComponent
