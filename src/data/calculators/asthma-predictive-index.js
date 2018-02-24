import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const getCalculateGroupPoints = calculate => {
    return calculate
        .map(item => parseFloat(item.points))
        .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
    state = {}

    handleFormulaCalc = (
        wheezingCriteria,
        majorCriteria,
        minorCriteria
    ) => {
        // Strict Criteria: >= 3 episodes of wheezing per year, AND >=1 major criteria OR >=2 minor criteria
        // Loose Criteria: < 3 episodes of wheezing per year, AND >=1 major criteria OR >=2 minor criteria
        if (
            (wheezingCriteria ===3 && majorCriteria >=1 || minorCriteria >= 2)
        ) {
            return 'Positive Strict Index, 75% of children had active asthma at 15 years'
        } else if (wheezingCriteria ===1 && majorCriteria >=1 || minorCriteria >=2) {
            return 'Positive Loose Index, 59% of children had active asthma at 15 years'
        } else {
            return 'Unlikely to develop active asthma'
        }
    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let wheezingCriteria = null
        let majorCriteria = 0
        let minorCriteria = 0

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    wheezingCriteria = calculate["points"]
                }
                if (index === 1) {
                    majorCriteria = getCalculateGroupPoints(calculate)
                }
                if (index === 2) {
                    minorCriteria = getCalculateGroupPoints(calculate)
                }
            }
            return calculate
        })

        if (wheezingCriteria || majorCriteria || minorCriteria) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption={this.handleFormulaCalc(
                            wheezingCriteria,
                            majorCriteria,
                            minorCriteria
                        )}
                        values={[`${wheezingCriteria} Wheezing Criteria`,`${majorCriteria} Major Criteria`, `${minorCriteria} Minor Criteria`]}
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
    "id": "asthma-predictive-index",
    "title": "Asthma Predictive Index",
    "type": "formula",
    "questions": [
        {
            "group": "Wheezing Criteria",
            "showPoints": false,
            "data": [
                {
                    "type": "radio",
                    "options": "≥3 episodes/year | <3 episodes/year",
                    "points": "3/1"
                }
            ]
        },
        {
            "group": "Major Criteria",
            "showPoints": false,
            "data": [
                {
                    "type": "checkbox",
                    "label":
                        "Parent with asthma",
                    "points": "1"
                },
                {
                    "type": "checkbox",
                    "label":
                        "Patient with eczema",
                    "points": "1"
                }
            ]
        },
        {
            "group": "Minor Criteria",
            "showPoints": false,
            "data": [
                {
                    "type": "checkbox",
                    "label": "Patient has allergic rhinitis",
                    "points": "1"
                },
                {
                    "type": "checkbox",
                    "label": "Wheezing apart from colds",
                    "points": "1"
                },
                {
                    "type": "checkbox",
                    "label":
                        "Eosinophilia (≥4% on CBC)",
                    "points": "1"
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Strict Criteria: ≥3 episodes of wheezing per year AND ≥1 Major Criteria OR ≥2 Minor Criteria",
            "Loose Criteria : <3 episodes of wheezing per year AND ≥1 Major Criteria OR ≥2 Minor Criteria",
            "In the derivation study, 59% of children with a positive loose index had active asthma at school age (defined at 15 years)",
            "In the derivation study, 76% of those with a positive strict index had active asthma at school age (defined at 15 years)"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Castro-Rodríguez JA, et al. A clinical index to define risk of asthma in young children with recurrent wheezing. Am J Respir Crit Care Med. 2000; 162: 1403–1406."
        ]
    }
}
