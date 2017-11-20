import React from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'

const doseFormula = (weight, dosage) => {
  // Dose = Weight * Dosage
  return weight * dosage
}

const conversionDosage = [
  { value: 1000, unit: 'g/kg' },
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

/*

<select name="Med_Amount_unit" onchange="WeightBasedDivDose_fx();"  class="medCalcFontSelect calc_unitSelect">
  <option value="1000|0|gm">gm</option>
  <option value="0.001|0|mcg">mcg</option>
  <option value="1|0|mg" selected="selected">mg</option>
</select>

<select name="Per_Volume_unit" onchange="WeightBasedDivDose_fx();"  class="medCalcFontSelect calc_unitSelect">
  <option value="1000|0|L">L</option>
<option value="1|0|mL" selected="selected">mL</option>
</select>

<select name="Dose_unit" onchange="WeightBasedDivDose_fx();"  class="medCalcFontSelect calc_unitSelect">
  <option value="2000|0|gm BID">gm BID</option>
  <option value="1000|0|gm Daily">gm Daily</option>
  <option value="4000|0|gm QID">gm QID</option>
  <option value="3000|0|gm TID">gm TID</option>
  <option value="24000|0|gm q1 hr">gm q1 hr</option>
  <option value="12000|0|gm q2 hr">gm q2 hr</option>
  <option value="6000|0|gm q4 hr">gm q4 hr</option>
  <option value="0.002|0|mcg BID">mcg BID</option>
  <option value="0.001|0|mcg Daily">mcg Daily</option>
  <option value="0.004|0|mcg QID">mcg QID</option>
  <option value="0.003|0|mcg TID">mcg TID</option>
  <option value="0.024|0|mcg q1 hr">mcg q1 hr</option>
  <option value="0.012|0|mcg q2 hr">mcg q2 hr</option>
  <option value="0.006|0|mcg q4 hr">mcg q4 hr</option>
  <option value="2|0|mg BID">mg BID</option>
  <option value="1|0|mg Daily" selected="selected">mg Daily</option>
  <option value="4|0|mg QID">mg QID</option>
  <option value="3|0|mg TID">mg TID</option>
  <option value="24|0|mg q1 hr">mg q1 hr</option>
  <option value="12|0|mg q2 hr">mg q2 hr</option>
  <option value="6|0|mg q4 hr">mg q4 hr</option>
</select>

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
