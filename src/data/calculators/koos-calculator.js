import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const maxScore = [28, 36, 68, 20, 16]


class FormulaComponent extends Component {
    state = {
        apacheIISelectUnit: 'points',
        apacheIISelectValue: 1
    }

    handleCalc = (
        answer
    ) => {
        let i;
        let scores = [0,0,0,0,0,0]
        let answerCount = 0
        let totsalResult = 0
        
        for (i=0; i<answer.length; i++){
          // Symptoms && Stiffness
          if(i < 7 && (answer[i] || answer[i]===0)){
            scores[0] += answer[i];
            scores[1] += answer[i];
            answerCount++
          }
          if(i >= 7 && i < 16 && (answer[i] || answer[i]===0)){
            // Pain
            scores[0] += answer[i];
            scores[2] += answer[i];
            answerCount++
          }
          if(i >= 16 && i < 33 && (answer[i] || answer[i]===0)){
            // Function, daily living
            scores[0] += answer[i];
            scores[3] += answer[i];
            answerCount++
          }
          if(i >= 33 && i < 38 && (answer[i] || answer[i]===0)){
            // Function, sports and recreational activities
            scores[0] += answer[i];
            scores[4] += answer[i];
            answerCount++
          }
          if(i >= 38 && i < 42 && (answer[i] || answer[i]===0)){
            // Quality of Life
            scores[0] += answer[i];
            scores[5] += answer[i];
            answerCount++
          }
        }

        totsalResult = ((scores[0] / (4 * answerCount)) * 100).toFixed(1)
        return [totsalResult, scores];
    }

    handleResults = results => {
        let subTotal = []
        for (var i = 1; i < results.length; i++) {
          if(i===1){
            subTotal[i-1] = `Symptoms & Stiffness: ${((results[i] / maxScore[i-1]) * 100).toFixed(2)}%`
          }
          if(i===2){
            subTotal[i-1] = `Pain: ${((results[i] / maxScore[i-1]) * 100).toFixed(2)}%`
          }
          if(i===3){
            subTotal[i-1] = `Function, daily living: ${((results[i] / maxScore[i-1]) * 100).toFixed(2)}%`
          }
          if(i===4){
            subTotal[i-1] = `Function, sports and recreational activities: ${((results[i] / maxScore[i-1]) * 100).toFixed(2)}%`
          }
          if(i===5){
            subTotal[i-1] = `Quality of Life: ${((results[i] / maxScore[i-1]) * 100).toFixed(2)}%`
          }
        }

        return subTotal
    };

    render () {
        const { classes, data } = this.props
        const { questions } = data

        let answer = []

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                answer[index] = calculate["points"]
            }
            return calculate
        })

        if (answer.length) {
        console.log(answer);
            const results = this.handleCalc(
                answer
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Knee Injury & Osteoarthritis Outcome Score is"
                        values={[results[0]]}
                    />
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Subtotal:"
                        values={this.handleResults(results[1])}
                    />
                </ResultCardHeader>
            )
        } else {
            return null
        }
    }
}
export default FormulaComponent

export const config = {
  "id": "koos-calculator",
  "title": "Knee Injury and Osteoarthritis Outcome Score(KOOS)",
  "type": "formula",
  "points": 0,
  "questions": [
    {
      "group": "S1. Do you have swelling in your knee?",
      "data": {
        "type": "radio",
        "options": "Never | Rarely | Sometimes | Often | Always",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "S2. Do you feel grinding, hear clicking or any other type of noise when your knee moves?",
      "data": {
        "type": "radio",
        "options": "Never | Rarely | Sometimes | Often | Always",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "S3. Does your knee catch or hang up when moving?",
      "data": {
        "type": "radio",
        "options": "Never | Rarely | Sometimes | Often | Always",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "S4. Can you straighten your knee fully?",
      "data": {
        "type": "radio",
        "options": "Always | Often | Sometimes | Rarely | Never",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "S5. Can you bend your knee fully?",
      "data": {
        "type": "radio",
        "options": "Always | Often | Sometimes | Rarely | Never",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "S6. How severe is your knee joint stiffness after first wakening in the morning?",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "S7. How severe is your knee stiffness after sitting, lying or resting later in the day?",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P1. How often do you experience knee pain?",
      "data": {
        "type": "radio",
        "options": "Never | Monthly | Weekly | Daily | Always",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P2. Twisting/pivoting on your knee",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P3. Straightening knee fully",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P4. Bending knee fully",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P5. Walking on flat surface",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P6. Going up or down stairs",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P7. At night while in bed",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P8. Sitting or lying",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "P9. Standing upright",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "Al. Descending stairs",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A2. Ascending stairs",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A3. Rising from sitting",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A4. Standing",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A5. Bending to floor/pick up an object",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A6. Walking on flat surface",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A7. Getting in/out of car",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A8. Going shopping",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A9. Putting on socks/stockings",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A10. Rising from bed",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A11. Taking off socks/stockings",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A12. Lying in bed (turning over, maintaining knee position)",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A13. Getting in/out of bath",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A14. Sitting",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A15. Getting on/off toilet",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A16. Heavy domestic duties (moving heavy boxes, scrubbing floors, etc)",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "A17. Light domestic duties (cooking, dusting, etc)",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "SP1. Squatting",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "SP2. Running",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "SP3. Jumping",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "SP4. Twisting/pivoting on your injured knee",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "SP5. Kneeling",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "Q1. How often are you aware of your knee problem?",
      "data": {
        "type": "radio",
        "options": "Never | Monthly | Weekly | Daily | Constantly",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "Q2. Have you modified your life style to avoid potentially damaging activities to your knee?",
      "data": {
        "type": "radio",
        "options": "Not at all | Mildly | Moderately | Severely | Totally",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "Q3. How much are you troubled with lack of confidence in your knee?",
      "data": {
        "type": "radio",
        "options": "Not at all | Mildly | Moderately | Severely | Totally",
        "points": "4/3/2/1/0"
      }
    },
    {
      "group": "Q4. In general, how much difficulty do you have with your knee?",
      "data": {
        "type": "radio",
        "options": "None | Mild | Moderate | Severe | Extreme",
        "points": "4/3/2/1/0"
      }
    }
  ],
  "results": {}
}
