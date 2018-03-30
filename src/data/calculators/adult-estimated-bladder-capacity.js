import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    height: [
        { value: 1, unit: 'cm' },
        { value: 2.54, unit: 'in' }
    ],
    depth: [
        { value: 1, unit: 'cm' },
        { value: 2.54, unit: 'in' }
    ],
    width: [
        { value: 1, unit: 'cm' },
        { value: 2.54, unit: 'in' }
    ],
    bladderVol: [
        { value: 1, unit: 'mL' },
        { value: 1, unit: 'cm³' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        bladderVolSelectUnit: 'mL',
        bladderVolSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        height,
        depth,
        width,
        shape,
        selectValue
    ) => {
        // Bladder Volume = Height x Transverse Depth x Weight x Shape
        const bladderVol = height * depth * width * shape
        return (bladderVol / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.bladderVol, value)
        this.setState({ bladderVolSelectUnit: value, bladderVolSelectValue: selectValue })
    }

    handleDecimalChange = action => {
        const oldDecimal = this.state.decimal
        if (action === '+') {
            this.setState({ decimal: oldDecimal + 1 })
        } else {
            if (oldDecimal === 0) {
                return
            }
            this.setState({ decimal: oldDecimal - 1 })
        }
    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let shapeValue = null
        let heightValue = null
        let heightUnitValue = null
        let depthValue = null
        let depthUnitValue = null
        let widthValue = null
        let widthUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    shapeValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        heightValue = input
                        heightUnitValue = filterUnit(unitData.height, select)
                    }
                    if (index === 2) {
                        depthValue = input
                        depthUnitValue = filterUnit(unitData.depth, select)
                    }
                    if (index === 3) {
                        widthValue = input
                        widthUnitValue = filterUnit(unitData.width, select)
                    }
                }
            }
            return calculate
        })

        if (shapeValue && heightValue && depthValue && widthValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Estimated Bladder Capacity'
                        value={this.handleCalc(
                            shapeValue,
                            heightValue * heightUnitValue,
                            depthValue * depthUnitValue,
                            widthValue * widthUnitValue,
                            this.state.bladderVolSelectValue
                        )}
                        selectValue={this.state.bladderVolSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.bladderVol.map(option => (
                            <MenuItem key={option.unit} value={option.unit}>
                                {option.unit}
                            </MenuItem>
                        ))}
                    </ResultCardFormulaValueSelectFragment>
                    <Decimal
                        classes={classes}
                        decimal={this.state.decimal}
                        onDecimalChange={this.handleDecimalChange}
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
    "id": "adult-estimated-bladder-capacity",
    "title": "Estimated Bladder Capacity",
    "type": "formula",
    "questions": [
        {
            "group": "Shape of Bladder",
            "data": [
                {
                    "type": "radio",
                    "options": "Cuboidal | Ellipsoid | Triangular Prism-Shaped",
                    "points": "0.89/0.81/0.66"
                }
            ]
        },
        {
            "group": "Height",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Height",
                    "values": ["cm", "in"]
                }
            ]
        },
        {
            "group": "Transverse Depth",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Height",
                    "values": ["cm", "in"]
                }
            ]
        },
        {
            "group": "Width",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Height",
                    "values": ["cm", "in"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Variations in bladder shape can lead to errors in ultrasonic estimation of bladder volume",
            "Linear regression analysis yield optimal correction coefficients of .72 for the whole data set and .89, .81, and .66 for cuboidal, ellipsoid, and triangular prism-shaped bladders, respectively."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Bih LI, Ho CC, Tsai SJ, Lai YC, Chow W. Bladder shape impact on the accuracy of ultrasonic estimation of bladder volume. Arch Phys Med Rehabil. 1998 Dec;79(12):1553-6."
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "Estimated Bladder Capacity = Height x Transverse Depth x Width x Shape Correction Coefficient"
        ]
    }
}
