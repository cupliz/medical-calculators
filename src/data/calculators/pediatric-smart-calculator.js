import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import blue from "@material-ui/core/colors/blue";
import ResultCardHeader from "../../components/Calculator/results/ResultCardHeader";
import ResultSmartCalc from "../../components/Calculator/results/ResultSmartCalc";
import { fetchDatabase } from "../../store/modules/calculator";
import { getSheetData } from "../../utils/gapi";

const unitData = {
  age: [{ value: 12, unit: "yr" }, { value: 1, unit: "mo" }, { value: 0.034, unit: "days" }],
  weight: [{ value: 1, unit: "kg" }, { value: 0.45359237, unit: "lb" }]
};

const filterUnit = (arr, select) => {
  return arr.filter(item => (item.unit === select ? item.value : null))[0]
    .value;
};

class FormulaComponent extends Component {
  state = {
    sourceString: []
  };

  componentDidMount = async () => {
    let database = await getSheetData("All");
    let sourceString = await getSheetData("Source Strings");
    sourceString = await this.sourceString2json(sourceString)
    database = this.database2json(database);
    this.props.fetchDatabase(database);
    this.setState({sourceString})
  };
  sourceString2json = async (sourceString)=>{
    const output = [];
    if (sourceString.length) {
      sourceString.splice(0, 1);
      await sourceString.map(ss => {
        output.push({
          drug: ss[0],
          sn: ss[1],
          title: ss[2],
          string: ss[3]
        })
      })
    }
    return output
  }
  database2json = database => {
    if (database.length) {
      database.splice(0, 1);
      const output = [];
      for (let i = 0; i < database.length; i++) {
        const data = database[i];
        output.push({
          drug: data[0],
          sn: data[1],
          indicationGroup: data[3],
          indication: data[4],
          subIndication: data[5],
          doseStage: data[7],
          weightMin: data[8] || 0,
          weightMax: data[9] ? parseInt(data[9].split("<").join("")) : 0,
          ageMin: data[10] || 0,
          ageMax: data[11] ? parseInt(data[11].split("<").join("")) : 0,
          route: data[12],
          fixedDose: data[13] || 0,
          dailymgperkgLow: data[14] || 0,
          dailymgperkgHigh: data[15] || 0,
          divisor: data[16] || 0,
          frequency: isNaN(data[17]) ? data[17] : `q${data[17]}hr`,
          maxSigleDose: data[18] || "",
          duration: data[19] || "",
          additionalInfo: data[20] || "",
          outputString: data[21] || ""
        });
      }
      return output;
    } else {
      return [];
    }
  }
  toFloat(input, zero=2){
    if(Math.round(input) !== input) {
      input = input.toFixed(zero);
    }
    return input
  }
  handleFormulaCalc = (drugName, indicationGroup, input_age_mth, input_wt_kg) => {
    let dosingInfo = {};
    let dosingRecom = {};
    const { database } = this.props.calculator;
    const {sourceString} = this.state
    if (database) {
      const indicationGroupDB = database.filter(
        db => db.indicationGroup === indicationGroup && db.drug === drugName
      );
      let indications = indicationGroupDB.map(igdb => igdb.indication);
      indications = _.uniq(indications);
      if (indications.length) {
        for (let j = 0; j < indications.length; j++) {
          const indication = indications[j];
          const indicationDB = indicationGroupDB.filter(
            igdb => igdb.indication === indication
          );
          dosingRecom[j] = { value: "" };
          if (indication) {
            // console.log('indication')
            // if (indication === "Severe infections") {
            if (indicationDB.length) {
              dosingRecom[j].value = this.getDosingRecomendation( indication, indicationDB, input_age_mth, input_wt_kg );
            }
            // }
          } else {
            // console.log('indicationGroup')
            dosingRecom[j].value = this.getDosingRecomendation( indicationGroup, indicationGroupDB, input_age_mth, input_wt_kg )
          }
        }
      }
      for (let i = 0; i < sourceString.length; i++) {
        const ss = sourceString[i];
        if(ss.drug===drugName && ss.title===indicationGroup){
          dosingInfo[ss.title] = {
            title: ss.title,
            bgColor: blue[500],
            html: ss.string.replace(/(?:\r\n|\r|\n)/g, '<br>')
          }
        }
      }
    }
    const result = { info: dosingInfo, recom: dosingRecom };
    return result;
  };
  calculateDosingRecomendation = (tbl, input_wt_kg) => {
    // console.log('calculateDosingRecomendation...')
    let final_output = ''
    if(tbl.dailymgperkgLow){
      // console.log('dailymgperkgLow')
      let ddLow = tbl.dailymgperkgLow*input_wt_kg/tbl.divisor
      let ddHigh = tbl.dailymgperkgHigh*input_wt_kg/tbl.divisor
      ddLow = ddLow > parseInt(tbl.maxSigleDose) ? tbl.maxSigleDose : this.toFloat(ddLow)
      ddHigh = ddHigh > parseInt(tbl.maxSigleDose) ? tbl.maxSigleDose : this.toFloat(ddHigh)
      final_output = `${tbl.route} ${ddLow}mg to ${ddHigh}mg ${tbl.frequency}${tbl.duration && ", " + tbl.duration}` 
    } else if (tbl.dailymgperkgHigh){
      // console.log('dailymgperkgHigh', tbl.sn)
      let ddHigh = tbl.dailymgperkgHigh*input_wt_kg/tbl.divisor
      ddHigh = ddHigh > parseInt(tbl.maxSigleDose) ? tbl.maxSigleDose : this.toFloat(ddHigh)
      final_output = `${tbl.route} ${ddHigh}mg ${tbl.frequency}${tbl.duration && ", " + tbl.duration}` 
    } else if (tbl.fixedDose){
      // console.log('fixedDose')
      final_output = `${tbl.route} ${tbl.fixedDose}mg ${tbl.frequency}${tbl.duration && ", " + tbl.duration}` 
    }
    final_output += tbl.additionalInfo ? `; ${tbl.additionalInfo}` : ''
    return final_output
  }
  getDosingRecomendation = (indication, array, input_age_mth, input_wt_kg) => {
    let output = ''
    let u40or = []
    let o40or = []
    for (let x = 0; x < array.length; x++) {
      const t = array[x];
      // console.log(t.drug, t.sn, input_age_mth, t.ageMax)
      if (input_age_mth < t.ageMax) {
        // console.log('<3months')
        output = this.calculateDosingRecomendation(t, input_wt_kg)
        break;
      }
      if(input_age_mth >= t.ageMin){
        const checkUnderWeightLimit = t.weightMax && input_wt_kg<t.weightMax
        const checkOverWeightLimit = t.weightMin && input_wt_kg>=t.weightMin
        if(checkUnderWeightLimit && !t.weightMin){
          // console.log('under <40')
          if(t.doseStage.includes('or1') || t.doseStage.includes('or2')){
            u40or.push(this.calculateDosingRecomendation(t, input_wt_kg))
          }
        }else if(checkOverWeightLimit && !t.weightMax){
          // console.log('over >40', input_wt_kg, t.weightMin, t.weightMax)
          if(t.doseStage.includes('or1') || t.doseStage.includes('or2')){
            o40or.push(this.calculateDosingRecomendation(t, input_wt_kg))
          }
        }else{
          console.log('weight filled', t.weightMin, t.weightMax)
        }
        // if(checkOverWeightLimit && checkUnderWeightLimit){
        //   console.log('wieght both filled')
        //   output += `<br>${t.doseStage} ${this.calculateDosingRecomendation(t, input_wt_kg)}, `          
        // }
      }
    }
    output += u40or.length ? u40or.join(' or '): ''
    output += o40or.length ? o40or.join(' or '): ''
    return `${indication}: ${output} <br /><br />`
  };

  render() {
    const { classes, data } = this.props;
    const { questions } = data;
    // extract needed field vars
    let drugName = null;
    let indicationGroup = null;
    let age = 0;
    let weight = 0;

    questions.map((question, index) => {
      const { calculate } = question;
      if (calculate) {
        const { input, select } = calculate;
        if (index === 0) {
          drugName = input;
        }
        if (index === 1) {
          indicationGroup = select;
        }
        if (index === 2) {
          age = input * filterUnit(unitData.age, select)
        }
        if (index === 3) {
          weight = input * filterUnit(unitData.weight, select)
        }
      }
      return calculate;
    });

    if (drugName && indicationGroup) {
      const calcFormula = this.handleFormulaCalc(drugName, indicationGroup, age, parseFloat(weight));
      return (
        <ResultCardHeader classes={classes}>
          <ResultSmartCalc data={calcFormula} />
        </ResultCardHeader>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = state => ({
  ...state
});
export default connect(
  mapStateToProps,
  { fetchDatabase }
)(FormulaComponent);

export const config = {
  id: "pediatric-smart-calculator",
  title: "Pediatric Smart Calculator",
  type: "formula",
  questions: [
    {
      group: "Drug Name",
      data: [
        {
          type: "input/search",
          placeholder: "Enter drug name",
          values: "Drug"
        }
      ]
    },
    {
      group: "Indication",
      data: [
        {
          type: "select",
          placeholder: "Enter indication",
          values: "Indication Group"
        }
      ]
    },
    {
      group: "Age",
      data: [
        {
          type: "input/select",
          placeholder: "Enter patient age",
          values: ["yr", "mo", "days"]
        }
      ]
    },
    {
      group: "Weight",
      data: [
        {
          type: "input/select",
          placeholder: "Enter patient weight",
          values: ["kg", "lb"]
        }
      ]
    }
  ],
  results: {},
  notes: {
    type: "unordered-list",
    content: [
      "Calculated using the 4-2-1 rule",
      "For the first 10 kg of body weight, 4 mL of fluid is administered per kg",
      "For the second 10 kg, 2 mL/kg/hr is administered",
      "For each additional kg over 20kg, 1mL/kg/hr should be given",
      "The formula comes from elegant work done in the 1950s that correlated caloric expenditure with fluid loss"
    ]
  },
  references: {
    type: "ordered-list",
    content: [
      "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. Vol. 19, 1957 823-832."
    ]
  },
  formula: {
    type: "paragraph",
    content: ["Calculated using the 4-2-1 rule; see notes"]
  }
};