import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import blue from "@material-ui/core/colors/blue";
import ResultCardHeader from "../../components/Calculator/results/ResultCardHeader";
import ResultSmartCalc from "../../components/Calculator/results/ResultSmartCalc";
import { fetchDatabase } from "../../store/modules/calculator";
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
  };

  handleFormulaCalc = (drugName, indicationGroup, input_age_mth, input_wt_kg) => {
    let dosingInfo = {};
    let dosingRecom = {};
    const { database } = this.props.calculator;
    const {sourceString} = this.state
    if (database) {
      const indicationGroupDB = database.filter(
        db => db.indicationGroup === indicationGroup
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
            // if (indication === "Severe infections") {
            if (indicationDB.length) {
              const tbl = this.getDosingRecomendation( indicationDB, input_age_mth, input_wt_kg );
              dosingRecom[j].value = this.calculateDosingRecomendation(indication, tbl, input_wt_kg) 

              // dosingInfo[j] = { title: indication };
              // const acc = this.getDosingInformation(
              //   indicationDB,
              //   input_age_mth,
              //   input_wt_kg
              // );
              // dosingInfo[j].bgColor = blue[(j + 4) * 100];
              // dosingInfo[j].html = acc;
            }
            // }
          } else {
            const tbl = this.getDosingRecomendation( indicationGroupDB, input_age_mth, input_wt_kg );
            dosingRecom[j].value = this.calculateDosingRecomendation(indicationGroup, tbl, input_wt_kg)

            // dosingInfo[j] = { title: indicationGroup };
            // const acc = this.getDosingInformation(
            //   indicationGroupDB,
            //   input_age_mth,
            //   input_wt_kg
            // );
            // dosingInfo[j].bgColor = blue[(j + 4) * 100];
            // dosingInfo[j].html = acc;
          }
        }
      }
      for (let i = 0; i < sourceString.length; i++) {
        const ss = sourceString[i];
        if(ss.drug===drugName && ss.title===indicationGroup){
          console.log(ss.string)
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
  calculateDosingRecomendation = (indication, tbl, input_wt_kg) => {
    const daily_dose = tbl.dailymgperkgHigh ? input_wt_kg * tbl.dailymgperkgHigh : tbl.fixedDose;
    const single_dose = daily_dose / tbl.divisor;
    tbl.maxSigleDose = tbl.maxSigleDose ? tbl.maxSigleDose : tbl.fixedDose;
    const final_dose = single_dose > parseInt(tbl.maxSigleDose) ? tbl.maxSigleDose : single_dose;
    return `${indication}: ${tbl.route} ${final_dose.toFixed(2) + "mg"} ${tbl.frequency}${tbl.duration &&
      ", " + tbl.duration} <br /> ${tbl.additionalInfo} <br />`;
  }
  // getDosingInformation = array => {
  //   let html = "";
  //   let u40t = "";
  //   let o40t = "";
  //   let under40 = [];
  //   let over40 = [];
  //   for (let y = 0; y < array.length; y++) {
  //     const t = array[y];
  //     if (t.ageMax) {
  //       html += `${"≤" + t.ageMax} months: ≤${t.dailymgperkgHigh} mg/kg/day ${
  //         t.route
  //       } divided ${t.frequency} for ${t.duration}; ${
  //         t.additionalInfo
  //       } <br /><br/ >`;
  //     } else {
  //       if (t.weightMax) {
  //         u40t = `${">" + t.ageMin} months and <${t.weightMax} kg: `;
  //         under40.push( `${t.dailymgperkgHigh} mg/kg/day ${t.route} divided ${t.frequency}`
  //         );
  //       } else {
  //         o40t = `>${t.weightMin} kg: `;
  //         over40.push(`${t.fixedDose}mg ${t.route} ${t.frequency}`);
  //       }
  //     }
  //   }
  //   html += under40.length ? u40t + under40.join(" or ") + "<br/ ><br/ >" : "";
  //   html += over40.length ? o40t + over40.join(" or ") + "<br/ ><br/ >" : "";
  //   return html;
  // };
  getDosingRecomendation = (array, input_age_mth, input_wt_kg) => {
    let tbl = {};
    for (let x = 0; x < array.length; x++) {
      const t = array[x];
      if (input_age_mth < t.ageMax) {
        tbl = t;
        break;
      } else {
        if (input_wt_kg < t.weightMax && t.doseStage === "or1") {
          tbl = t;
          break;
        } else if (input_wt_kg >= t.weightMax && t.doseStage === "or1") {
          tbl = t;
        } else {
          tbl = t;
        }
      }
    }
    return tbl;
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
          age = input * filterUnit(unitData.age, select);
        }
        if (index === 3) {
          weight = input * filterUnit(unitData.weight, select);
        }
      }
      return calculate;
    });

    if (drugName && indicationGroup) {
      const calcFormula = this.handleFormulaCalc(drugName, indicationGroup, age, weight);
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
