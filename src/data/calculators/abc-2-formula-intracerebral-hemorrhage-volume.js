import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    shape: [
        { value: 1, unit: 'cm' }
    ],
    length: [
        { value: 1, unit: 'cm' }
    ],
    width: [
        { value: 1, unit: 'cm' }
    ],
    slices: [
        { value: 1, unit: 'slices' }
    ],
    thickness: [
        { value: 1, unit: 'mm' }
    ],
    hemVol: [
        { value: 1, unit: 'mL' },
        { value: 1, unit: 'cm³' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        hemVolSelectUnit: 'mL',
        hemVolSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        shape,
        length,
        width,
        slices,
        thickness
        selectValue
    ) => {
        // hemVol = length * width * thickness * # slices / hemorrahge shape
        const hemVol = (length * width * (thickness/100) * slices) / shape
        return (hemVol / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.hemVol, value)
        this.setState({ hemVolSelectUnit: value, hemVolSelectValue: selectValue })
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
        let shape = null
        let lengthValue = null
        let lengthUnitValue = null
        let widthValue = null
        let widthUnitValue = null
        let slicesValue = null
        let slicesUnitValue = null
        let thicknessValue = null
        let thicknessUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    shape = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        lengthValue = input
                        lengthUnitValue = filterUnit(unitData.length, select)
                    }
                    if (index === 2) {
                        widthValue = input
                        widthUnitValue = filterUnit(unitData.width, select)
                    }
                    if (index === 3) {
                        slicesValue = input
                        slicesUnitValue = filterUnit(unitData.slices, select)
                    }
                    if (index === 4) {
                        thicknessValue = input
                        thicknessUnitValue = filterUnit(unitData.thickness, select)
                    }
            }
            return calculate
        })

        if (shapeValue && lengthValue && widthValue && slicesValue && thicknessValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Estimated Hemorrhage Volume'
                        value={this.handleCalc(
                            shapeValue,
                            lengthValue * lengthUnitValue,
                            widthValue * widthUnitValue,
                            slicesValue * slicesUnitValue,
                            thicknessValue * thicknessUnitValue,
                            this.state.hemVolSelectValue
                        )}
                        selectValue={this.state.hemVolSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.hemVol.map(option => (
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
    "id": "abc-2-formula-intracerebral-hemorrhage-volume",
    "title": "ABC/2 Formula for Intracerebral Hemorrhage Volume",
    "type": "formula",
    "questions": [
        {
            "group": "Hemorrhage Shape",
            "data": [
                {
                    "type": "radio",
                    "options": "Round | Ellipsoid | Irregular, Separated or Multinodular",
                    "points": "2/2/3"
                }
            ]
        },
        {
            "group": "Hemorrhage Length",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Length",
                    "values": ["cm"]
                }
            ]
        },
        {
            "group": "Hemorrhage Width",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Width",
                    "values": ["cm"]
                }
            ]
        },
        {
            "group": "# of CT Slices (Slice with ≥75% Area of Hemorrhage Counts as 1 slice; Slice with 25-75% Area of Hemorrhage counts as 0.5 slices, Slice with <25% Area of Hemorrhage counts as 0 slices",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter # of CT Slices",
                    "values": ["slices"]
                }
            ]
        },
        {
            "group": "CT Slice Thickness",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Slice Thickness",
                    "values": ["mm"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Note the volume of an ellipsoid is 4/3 x π x (ABC/2), if π is estimated to be ~3 then the volume becomes ABC/2",
            "CT slice measurements of length and width should be taken with the largest area of hemorrhage",
            "Note that CT slices are typically measured in mm and not cm"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Rashmi, U K, Brott T, Broderick JP, et al. The ABCs of Measuring Intracerebral Hemorrhage Volumes, Stroke. 1996;27:1304-1305"
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "Volume of Hemorrhage = Length x Width x Slice Width x # Slices with Hemorrhage Present / Hemorrhage Shape "
        ]
    }
}
