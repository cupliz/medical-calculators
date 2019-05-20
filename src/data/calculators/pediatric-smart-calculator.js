import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {
  ResultCardText,
  ResultCardDropDown
} from "../../components/Calculator/results/ResultSmartCalc";
import { fetchDatabase } from "../../store/modules/calculator";
import { csvToJSON } from "../../utils/gapi";

const unitData = {
  age: [
    { value: 12, unit: "yr" },
    { value: 1, unit: "mo" },
    { value: 0.034, unit: "days" }
  ],
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
    const database = await csvToJSON('NEW_Database')
    const sourceString = await csvToJSON('Source Strings')
    this.props.fetchDatabase(database);
    this.setState({ sourceString });
  };
  toFloat(input) {
    if (Math.round(input) !== input) {
      input = Math.round(input * 100) / 100;
    }
    return input;
  }
  calculateDosingRecomendation = (tbl, input_wt_kg) => {
    let final_output = "";
    if (tbl.dailymgperkgLow) {
      let ddLow = (tbl.dailymgperkgLow * input_wt_kg) / tbl.divisor;
      let ddHigh = (tbl.dailymgperkgHigh * input_wt_kg) / tbl.divisor;
      ddLow =
        ddLow > parseFloat(tbl.maxSigleDose)
          ? tbl.maxSigleDose
          : this.toFloat(ddLow);
      ddHigh =
        ddHigh > parseFloat(tbl.maxSigleDose)
          ? tbl.maxSigleDose
          : this.toFloat(ddHigh);
      final_output = `${tbl.route} ${ddLow} ${tbl.doseUnit} to ${ddHigh} ${tbl.doseUnit} ${tbl.frequency}${tbl.duration && ", " + tbl.duration}`;
    } else if (tbl.dailymgperkgHigh) {
      let ddHigh = (tbl.dailymgperkgHigh * input_wt_kg) / tbl.divisor;
      ddHigh =
        ddHigh > parseFloat(tbl.maxSigleDose)
          ? tbl.maxSigleDose
          : this.toFloat(ddHigh);
      final_output = `${tbl.route} ${ddHigh} ${tbl.doseUnit} ${
        tbl.frequency
      }${tbl.duration && ", " + tbl.duration} `;
    } else if (tbl.fixedDose) {
      final_output = `${tbl.route} ${tbl.fixedDose} ${tbl.doseUnit} ${
        tbl.frequency
      }${tbl.duration && ", " + tbl.duration}`;
    }
    final_output += tbl.additionalInfo ? ` ${tbl.additionalInfo}` : "";
    return final_output;
  };
  getDosingRecomendation = (indication, array, input_age_mth, input_wt_kg) => {
    // this function is checking if condition of user input meet the database
    let output = [];
    let underOR = [];
    let overOR = [];
    let otherDS = [];
    let subIndicationArr = {};
    let subIndicationOR = [];
    for (let x = 0; x < array.length; x++) {
      const t = array[x];
      // start filtering data and store it into array for each case
      if (t.ageMax) {
        if (!t.ageMin && input_age_mth < t.ageMax) {
          // check if agemax is not empty & agemin is empty
          this.weightCheck(t, input_wt_kg, {output, overOR, underOR, otherDS,subIndicationOR,subIndicationArr})
        }
        if ( t.ageMin && input_age_mth >= t.ageMin && input_age_mth < t.ageMax ) {
          // check if both agemax & agemin is not empty
          this.weightCheck(t, input_wt_kg, {output, overOR, underOR, otherDS,subIndicationOR,subIndicationArr})
        }
      }
      if (!t.ageMax) {
        if (t.ageMin && input_age_mth >= t.ageMin) {
          // check if both agemax is empty & agemin is not empty
          this.weightCheck(t, input_wt_kg, {output, overOR, underOR, otherDS,subIndicationOR,subIndicationArr})
        }
        if (!t.ageMin) {
          // check if both agemax & agemin empty
          this.weightCheck(t, input_wt_kg, {output, overOR, underOR, otherDS,subIndicationOR,subIndicationArr})
        }
      }
    }
    // generate string output from the collected data 
    output.push(underOR.length ? underOR.join(" or ") : "")
    output.push(overOR.length ? overOR.join(" or ") : "")
    output.push(otherDS.length ? otherDS.join("; ") : "")
    if (Object.keys(subIndicationArr).length) {
      for (let i = 0; i < Object.keys(subIndicationArr).length; i++) {
        const subIndication = Object.keys(subIndicationArr)[i];
        output.push(`<br>${subIndication}: ${subIndicationArr[subIndication]}`)
      }
    }
    return output.length ? `<b>${indication}:</b> ${output.join(' ')} <br /><br />` : "";
  };
  weightCheck = (t, input_wt_kg, {output, overOR, underOR, otherDS,subIndicationOR,subIndicationArr}) => {
    if (t.weightMax && !t.weightMin && input_wt_kg < t.weightMax) {
      // console.log('13 wieghtmax not empty & weightmin empty then check if input_wt_kg < wtmax ', t.sn)
      if (t.subIndication) {
        this.calculateSubIndication(t,input_wt_kg,{subIndicationOR,subIndicationArr})
      } else {
        this.calculateDoseStage(t,input_wt_kg,{overOR, underOR, otherDS, output}, 'under')
      }
    }
    if (!t.weightMax && t.weightMin && input_wt_kg >= t.weightMin) {
      // console.log('14 check wieghtmax empty & weightmin not empty then check if input_wt_kg >= t.weightMin ', t.sn)
      if (t.subIndication) {
        this.calculateSubIndication(t,input_wt_kg,{subIndicationOR,subIndicationArr})
      } else {
        this.calculateDoseStage(t,input_wt_kg,{overOR, underOR, otherDS, output})
      }
    }
    if (t.weightMax && t.weightMin && input_wt_kg >= t.weightMin && input_wt_kg < t.weightMax) {
      // console.log('15 check if both wieghtmax & weightmin is not empty then check if input_wt_kg >= t.weightMin && input_wt_kg < t.weightMax ', t.sn)
      if (t.subIndication) {
        this.calculateSubIndication(t,input_wt_kg,{subIndicationOR,subIndicationArr})
      } else {
        this.calculateDoseStage(t,input_wt_kg,{overOR, underOR, otherDS, output})
      }
    }
    if (!t.weightMax && !t.weightMin) {
      // console.log('16 check if both wieghtmax & weightmin is empty ', t.sn)
      if (t.subIndication) {
        this.calculateSubIndication(t,input_wt_kg,{subIndicationOR,subIndicationArr})
      } else {
        this.calculateDoseStage(t,input_wt_kg,{overOR, underOR, otherDS, output})
      }
    }
  }
  calculateSubIndication = (t,input_wt_kg,array) => {
    if ( t.doseStage.includes("or1") || t.doseStage.includes("or2") ) {
      array.subIndicationOR.push( this.calculateDosingRecomendation(t, input_wt_kg) );
      array.subIndicationArr[t.subIndication] = array.subIndicationOR.join( " or " );
    } else {
      array.subIndicationArr[ t.subIndication ] = this.calculateDosingRecomendation(t, input_wt_kg);
    }
  }
  calculateDoseStage = (t,input_wt_kg,array,type=null) => {
    // this function is checking dose stage value and show proper output for each dose stage
    if ( t.doseStage.includes("or1") || t.doseStage.includes("or2") ) {
      let dotComma = t.doseStage.split(";");
      if (dotComma.length > 1) {
        if(type==='under'){
          array.underOR.push( `${dotComma[1] && dotComma[1]} ${this.calculateDosingRecomendation( t, input_wt_kg )}, ` );
        }else{          array.overOR.push( `${dotComma[1] && dotComma[1]} ${this.calculateDosingRecomendation( t, input_wt_kg )}, ` );
        }
      } else {
        if(type==='under'){
          array.underOR.push( `${this.calculateDosingRecomendation(t, input_wt_kg)} ` );
        }else{
          array.overOR.push( `${this.calculateDosingRecomendation(t, input_wt_kg)} ` );
        }
      }
    } else if (t.doseStage) {
      array.otherDS.push( `${t.doseStage}: ${this.calculateDosingRecomendation( t, input_wt_kg )}` );
    } else {
      array.output.push(this.calculateDosingRecomendation(t, input_wt_kg))
    }
  }
  handleFormulaCalc = ( drugName, indicationGroup, input_age_mth, input_wt_kg ) => {
    let dosingInfo = [];
    let dosingRecom = [];
    const { database } = this.props.calculator;
    const { sourceString } = this.state;
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
          let dosingRecomValue = "";
          if (indication) {
            // if (indication === "Severe infections") {
            if (indicationDB.length) {
              dosingRecomValue = this.getDosingRecomendation(
                indication,
                indicationDB,
                input_age_mth,
                input_wt_kg
              );
            }
            // }
          } else {
            dosingRecomValue = this.getDosingRecomendation(
              indicationGroup,
              indicationGroupDB,
              input_age_mth,
              input_wt_kg
            );
          }
          if (dosingRecomValue) {
            dosingRecom.push(dosingRecomValue);
          }
        }
      }
      for (let i = 0; i < sourceString.length; i++) {
        const ss = sourceString[i];
        if (ss.Drug === drugName && ss.Title === indicationGroup) {
          dosingInfo.push({
            title: ss.Title,
            html: ss.String.replace(/(?:\r\n|\r|\n)/g, "<br>")
          });
        }
      }
    }
    const result = { info: dosingInfo, recom: dosingRecom };
    return result;
  };

  render() {
    const { classes, data } = this.props;
    const { questions } = data;
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
        parseFloat(age),
        parseFloat(weight)
      );
      return (
        <Card>
          <CardHeader
            className={classes.header}
            title={
              <Typography className={classes.title}>
                {" "}
                Calculated Dose(s){" "}
              </Typography>
            }
          />
          <CardContent>
            <ResultCardText data={calcFormula.recom} />
          </CardContent>
          <ResultCardDropDown data={calcFormula.info} />
        </Card>
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
  notes: {},
  references: {},
  formula: {}
};
