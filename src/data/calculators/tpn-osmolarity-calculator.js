import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'


class FormulaComponent extends Component {

    nvl = (var1, var2) => {
        if (var1 === null || var1 === undefined){
            return var2
        } else{
            return var1
        }
    }

    handleCalc = (
        aminoAcidPercent,
        aminoAcid,
        dextrosePercent,
        dextrose,
        lipidPercent,
        lipid,
        sterileWater,
        cacl,
        cagluc,
        kcl,
        kace,
        kphos,
        mgsulf,
        nacl,
        naace,
        naphos,
        mvi,
        mte
    ) => {
        let totalVolBase;
        let aaosm;
        let dexosm;
        let fatosm;
        let solnosm;
        let finalosm

        aaosm=aminoAcidPercent * 0.1 * aminoAcid;
        dexosm=dextrosePercent * 0.05 * dextrose;
        // lipid is 260 mOsmol/L for 10 & 20%, 293 mOsmol/L for 30%
        if (lipidPercent === 30) {          
            fatosm = 0.293 * lipid;
        } else {
            fatosm = 0.26 * lipid;
        }
        solnosm = fatosm + dexosm + aaosm;
        totalVolBase = Math.round(aminoAcid + dextrose + lipid + sterileWater)

        if (totalVolBase === 0) {
            finalosm=0;
        }
        else{
            mvi = 4.1 * this.nvl(mvi, 0);
            mte = 0.36 * this.nvl(mte, 0);
            cacl = 1.46 * this.nvl(cacl, 0);
            cagluc = 1.46 * this.nvl(cagluc, 0);
            kcl = 2 * this.nvl(kcl, 0);
            kace = 2 * this.nvl(kace, 0);
            kphos = 2.47 * this.nvl(kphos, 0);
            mgsulf = this.nvl(mgsulf, 0);
            nacl = 2 * this.nvl(nacl, 0);
            naace = 2 * this.nvl(naace, 0);
            naphos = 4 * this.nvl(naphos, 0);

            finalosm = (solnosm + mvi + mte + cacl + cagluc + kcl + kace + kphos + mgsulf + nacl + naace + naphos) / (totalVolBase * 0.001);
        }

        return [totalVolBase, Math.round(finalosm)];
    }

    handleResults = (
        results,
    ) => {
        let ret = []
        ret[0] = `Base solution`
        ret[1] = `Total volume: ${results[0]}ml`
        ret[2] = `Additives (per Bag)`
        ret[3] = `Osmolarity: ${results[1]}mOsmol/L`
        return ret
    };

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let aminoAcidPercent = null
        let aminoAcid = null
        let dextrosePercent = null
        let dextrose = null
        let lipidPercent = null
        let lipid = null
        let sterileWater = null
        let cacl = null
        let cagluc = null
        let kcl = null
        let kace = null
        let kphos = null
        let mgsulf = null
        let nacl = null
        let naace = null
        let naphos = null
        let mvi = null
        let mte = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const {input} = calculate
                // Base solution
                if (index === 0) {
                    aminoAcidPercent = calculate["points"]
                }
                if (index === 1) {
                    aminoAcid = input*1
                }
                if (index === 2) {
                    dextrosePercent = calculate["points"]
                }
                if (index === 3) {
                    dextrose = input*1
                }
                if (index === 4) {
                    lipidPercent = calculate["points"]
                }
                if (index === 5) {
                    lipid = input*1
                }
                if (index === 6) {
                    sterileWater = input*1
                }
                // Additives (per Bag)
                if (index === 7) {
                    cacl = input*1
                }
                if (index === 8) {
                    cagluc = input*1
                }
                if (index === 9) {
                    kcl = input*1
                }
                if (index === 10) {
                    kace = input*1
                }
                if (index === 11) {
                    kphos = input*1
                }
                if (index === 12) {
                    mgsulf = input*1
                }
                if (index === 13) {
                    nacl = input*1
                }
                if (index === 14) {
                    naace = input*1
                }
                if (index === 15) {
                    naphos = input*1
                }
                if (index === 16) {
                    mvi = input*1
                }
                if (index === 17) {
                    mte = input*1
                }
            }
            return calculate
        })

        if (aminoAcidPercent !== null && dextrosePercent !==null && lipidPercent !==null && aminoAcid && dextrose && lipid && sterileWater) {
            const results = this.handleCalc(
                aminoAcidPercent,
                aminoAcid,
                dextrosePercent,
                dextrose,
                lipidPercent,
                lipid,
                sterileWater,
                cacl,
                cagluc,
                kcl,
                kace,
                kphos,
                mgsulf,
                nacl,
                naace,
                naphos,
                mvi,
                mte
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Osmolarity"
                        values={[results[1]+' mOsmol/L']}
                    />
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={this.handleResults(results)}
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
    "id": "tpn-osmolarity-calculator",
    "title": "TPN Osmolarity Calculator",
    "type": "formula",
    "questions": [
        {
            "group": "Amino acid percent",
            "data": [
                {
                    "type": "radio",
                    "options": "3.5% | 5.5% | 7% | 8% | 8.5% | 10% | 15%",
                    "points": "3.5/5.5/7/8/8.5/10/15"
                }
            ]
        },
        {
          "group": "Amino acid",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter amino acid",
              "values": ["ml"]
            }
          ]
        },
        {
            "group": "Dextrose percent",
            "data": [
                {
                    "type": "radio",
                    "options": "5% | 10% | 20% | 30% | 40% | 50% | 70%",
                    "points": "5/10/20/30/40/50/70"
                }
            ]
        },
        {
          "group": "Dextrose",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter dextrose",
              "values": ["ml"]
            }
          ]
        },
        {
            "group": "Lipid percent",
            "data": [
                {
                    "type": "radio",
                    "options": "10% | 20% | 30%",
                    "points": "10/20/30"
                }
            ]
        },
        {
          "group": "Lipid",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter lipid",
              "values": ["ml"]
            }
          ]
        },
        {
          "group": "Sterile Water",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter sterile water",
              "values": ["ml"]
            }
          ]
        },
        {
          "group": "Ca Cl   ",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter ca cl",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "Ca Gluconate",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter ca gluconate",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "K Cl",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter K Cl",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "K Acetate",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter K Acetate",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "K Phosphate",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter K Phosphate",
              "values": ["mmol"]
            }
          ]
        },
        {
          "group": "Mg Sulfate",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Mg Sulfate",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "Na Cl",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Na Cl",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "Na Acetate",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Na Acetate",
              "values": ["mEq"]
            }
          ]
        },
        {
          "group": "Na Phosphate",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Na Phosphate",
              "values": ["mmol"]
            }
          ]
        },
        {
          "group": "Adult MVI-12",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Adult MVI-12",
              "values": ["ml"]
            }
          ]
        },
        {
          "group": "MTE-4",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter MTE-4",
              "values": ["ml"]
            }
          ]
        },
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "In a central TPN the contribution of MVI and MTE to the total mOsmol is minimal, therefore they are usually excluded in the calculation. With a peripheral PN solution, these components become more important. "
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
        ]
    }
}