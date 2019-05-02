import React, { Component } from "react";
import _ from "lodash";
import ResultCardHeader from "../../components/Calculator/results/ResultCardHeader";
import ResultSmartCalc from "../../components/Calculator/results/ResultSmartCalc";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import { getSheetData } from "../../utils/gapi";

const unitData = {
  age: [{ value: 1, unit: "mo" }, { value: 12, unit: "yr" }],
  weight: [{ value: 1, unit: "kg" }, { value: 0.45359237, unit: "lb" }]
};

const filterUnit = (arr, select) => {
  return arr.filter(item => (item.unit === select ? item.value : null))[0]
    .value;
};

class FormulaComponent extends Component {
  state = {
    database: [],
    indications: []
  };

  componentDidMount = async () => {
    let database = await getSheetData("All");
    let indications = await getSheetData("Indication");
    indications.splice(0, 1);
    indications = indications.map(d => d[0]);
    indications = _.uniq(indications);
    indications = _.without(indications, undefined);
    database = this.xls2json(database);
    await this.setState({ database, indications });
  };
  xls2json = database => {
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
          frequency: data[17] || "",
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
  };

  handleFormulaCalc = (
    drugName,
    indicationGroup,
    input_age_mth,
    input_wt_kg
  ) => {
    const { database, indications } = this.state;
    let dosingInfo = {};
    let dosingRecom = {};
    for (let i = 0; i < indications.length; i++) {
      const indication = indications[i];
      const indicationTables = database.filter(db => {
        if (
          db.drug === drugName &&
          db.indicationGroup === indicationGroup &&
          db.indication === indication
        ) {
          return db;
        }
      });
      // if (indication === "Severe infections") {
      if (indicationTables.length) {
        dosingRecom[indication] = { caption: indication, value: "" };
        const tbl = this.getDosingRecomendation(indicationTables,input_age_mth,input_wt_kg)
        const daily_dose = tbl.dailymgperkgHigh ? input_wt_kg * tbl.dailymgperkgHigh : tbl.fixedDose;
        let single_dose = daily_dose / tbl.divisor;
        tbl.maxSigleDose  = tbl.maxSigleDose ? tbl.maxSigleDose : tbl.fixedDose
        single_dose = single_dose > tbl.maxSigleDose ? tbl.maxSigleDose : single_dose;
        const final_output = `${tbl.route} ${single_dose && daily_dose + "mg"} ${tbl.frequency && "q" + tbl.frequency + "hr"} ${tbl.duration && "±" + tbl.duration}`;
        dosingRecom[indication].value = final_output;

        dosingInfo[indication] = { title: indication };
        const acc = this.getDosingInformation(indicationTables,input_age_mth,input_wt_kg)
        dosingInfo[indication].bgColor = blue[(i+4)*100]
        dosingInfo[indication].html = acc
      }
      // }
    }
    const result = { info: dosingInfo, recom: dosingRecom };
    return result;
  };
  getDosingInformation = (indicationTables,input_age_mth,input_wt_kg) =>{
    let html = ''
    let u40t = ''
    let o40t = ''
    let under40 = []
    let over40 = []
    for (let y = 0; y < indicationTables.length; y++) {
      const t = indicationTables[y];
      if(t.ageMax){
        html += `${"≤" + t.ageMax} months: ≤${t.dailymgperkgHigh} mg/kg/day ${t.route} divided q${t.frequency}hr for ${t.duration}; ${t.additionalInfo} <br /><br/ >`
      }else{
        if(t.weightMax){
          u40t = `${">"+t.ageMin} months and <${t.weightMax} kg: `
          under40.push(`${t.dailymgperkgHigh} mg/kg/day ${t.route} divided q${t.frequency}hr`)
        }else{
          o40t = `>${t.weightMin} kg: `
          over40.push(`${t.fixedDose}mg ${t.route} q${t.frequency}hr`)
        }
      }
      
    }
    html += u40t+under40.join(' or ')+'<br/ ><br/ >'
    html += o40t+over40.join(' or ')+'<br/ ><br/ >'
    return html
  }
  getDosingRecomendation = (indicationTables,input_age_mth,input_wt_kg) =>{
    let tbl = {};
    for (let x = 0; x < indicationTables.length; x++) {
      const t = indicationTables[x];
      if (input_age_mth <= t.ageMax) {
        tbl = t;
        break;
      } else {
        if (input_wt_kg < t.weightMax && t.doseStage === 'or1') {
          tbl = t;
          break;
        }
        if (input_wt_kg >= t.weightMax && t.doseStage === 'or1') {
          tbl = t;
        }
      }
    }
    return tbl
  }

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
          age = input * filterUnit(unitData.age, select);
        }
        if (index === 3) {
          weight = input * filterUnit(unitData.weight, select);
        }
      }
      return calculate;
    });

    if (drugName && indicationGroup && age && weight) {
      const calcFormula = this.handleFormulaCalc(
        drugName,
        indicationGroup,
        age,
        weight
      );
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
export default FormulaComponent;

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
          values: ["yr", "mo"]
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
