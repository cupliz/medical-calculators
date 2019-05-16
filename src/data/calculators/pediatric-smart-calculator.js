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
import { getSheetData } from "../../utils/gapi";

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
    let database = await getSheetData("NEW_Database");
    let sourceString = await getSheetData("Source Strings");
    sourceString = await this.sourceString2json(sourceString);
    database = this.database2json(database);
    this.props.fetchDatabase(database);
    this.setState({ sourceString });
  };
  sourceString2json = async sourceString => {
    let output = [];
    if (sourceString.length) {
      sourceString.splice(0, 1);
      output = await sourceString.map(ss => {
        return {
          drug: ss[0],
          sn: ss[1],
          title: ss[2],
          string: ss[3]
        };
      });
    }
    return output;
  };
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
          weightMax: data[9] ? parseFloat(data[9].split("<").join("")) : 0,
          ageMin: data[10] || 0,
          ageMax: data[11] ? parseFloat(data[11].split("<").join("")) : 0,
          route: data[12],
          doseUnit: data[13],
          fixedDose: data[14] || 0,
          dailymgperkgLow: data[15] || 0,
          dailymgperkgHigh: data[16] || 0,
          divisor: data[17] || 0,
          maxSigleDose: data[18] || "",
          frequency: isNaN(data[19]) ? data[19] : `q${data[19]}hr`,
          duration: data[20] || "",
          additionalInfo: data[21] || "",
          outputString: data[22] || ""
        });
      }
      return output;
    } else {
      return [];
    }
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
      final_output = `${tbl.route} ${ddLow}${tbl.doseUnit} to ${ddHigh} ${
        tbl.doseUnit
      } ${tbl.frequency}${tbl.duration && ", " + tbl.duration}`;
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
    let output = "";
    let underOR = [];
    let overOR = [];
    let otherDS = [];
    let subIndicationArr = {};
    let subIndicationOR = [];
    for (let x = 0; x < array.length; x++) {
      const t = array[x];
      if (t.ageMax) {
        if (!t.ageMin && input_age_mth < t.ageMax) {
          if (t.weightMin && !t.weightMax && input_wt_kg >= t.weightMin) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
          if (t.weightMax && !t.weightMin && input_wt_kg < t.weightMax) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
          if (
            t.weightMax &&
            t.weightMin &&
            input_wt_kg < t.weightMax &&
            input_wt_kg >= t.weightMin
          ) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
          if (!t.weightMax && !t.weightMin) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
        }
        if (
          t.ageMin &&
          t.ageMax &&
          input_age_mth >= t.ageMin &&
          input_age_mth < t.ageMax
        ) {
          if (t.weightMin && !t.weightMax && input_wt_kg >= t.weightMin) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
          if (t.weightMax && !t.weightMin && input_wt_kg < t.weightMax) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
          if (
            t.weightMax &&
            t.weightMin &&
            input_wt_kg < t.weightMax &&
            input_wt_kg >= t.weightMin
          ) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
          if (!t.weightMax && !t.weightMin) {
            if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
              let dotComma = t.doseStage.split(";");
              if (dotComma.length > 1) {
                overOR.push(
                  `${dotComma[1] &&
                    dotComma[1]} ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}, `
                );
              } else {
                overOR.push(
                  `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                );
              }
            } else if (t.doseStage) {
              otherDS.push(
                `${t.doseStage}: ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}`
              );
            } else {
              output = this.calculateDosingRecomendation(t, input_wt_kg);
            }
          }
        }
      }
      if (!t.ageMax) {
        if (t.ageMin && input_age_mth >= t.ageMin) {
          if (t.weightMax && !t.weightMin) {
            if (input_wt_kg < t.weightMax) {
              if (t.subIndication) {
                if (
                  t.doseStage.includes("or1") ||
                  t.doseStage.includes("or2")
                ) {
                  subIndicationOR.push(
                    this.calculateDosingRecomendation(t, input_wt_kg)
                  );
                  subIndicationArr[t.subIndication] = subIndicationOR.join(
                    " or "
                  );
                } else {
                  subIndicationArr[
                    t.subIndication
                  ] = this.calculateDosingRecomendation(t, input_wt_kg);
                }
              } else {
                if (
                  t.doseStage.includes("or1") ||
                  t.doseStage.includes("or2")
                ) {
                  let dotComma = t.doseStage.split(";");
                  if (dotComma.length > 1) {
                    underOR.push(
                      `${dotComma[1] &&
                        dotComma[1]} ${this.calculateDosingRecomendation(
                        t,
                        input_wt_kg
                      )}, `
                    );
                  } else {
                    underOR.push(
                      `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                    );
                  }
                } else if (t.doseStage) {
                  otherDS.push(
                    `${t.doseStage}: ${this.calculateDosingRecomendation(
                      t,
                      input_wt_kg
                    )}`
                  );
                } else {
                  output = this.calculateDosingRecomendation(t, input_wt_kg);
                }
              }
            }
          }
          if (!t.weightMax && t.weightMin) {
            if (input_wt_kg >= t.weightMin) {
              if (t.subIndication) {
                if (
                  t.doseStage.includes("or1") ||
                  t.doseStage.includes("or2")
                ) {
                  subIndicationOR.push(
                    this.calculateDosingRecomendation(t, input_wt_kg)
                  );
                  subIndicationArr[t.subIndication] = subIndicationOR.join(
                    " or "
                  );
                } else {
                  subIndicationArr[
                    t.subIndication
                  ] = this.calculateDosingRecomendation(t, input_wt_kg);
                }
              } else {
                if (
                  t.doseStage.includes("or1") ||
                  t.doseStage.includes("or2")
                ) {
                  let dotComma = t.doseStage.split(";");
                  if (dotComma.length > 1) {
                    overOR.push(
                      `${dotComma[1] &&
                        dotComma[1]} ${this.calculateDosingRecomendation(
                        t,
                        input_wt_kg
                      )}, `
                    );
                  } else {
                    overOR.push(
                      `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                    );
                  }
                } else if (t.doseStage) {
                  otherDS.push(
                    `${t.doseStage}: ${this.calculateDosingRecomendation(
                      t,
                      input_wt_kg
                    )}`
                  );
                } else {
                  output = this.calculateDosingRecomendation(t, input_wt_kg);
                }
              }
            }
          }
          if (t.weightMax && t.weightMin) {
            if (input_wt_kg >= t.weightMin && input_wt_kg < t.weightMax) {
              if (t.subIndication) {
                if (
                  t.doseStage.includes("or1") ||
                  t.doseStage.includes("or2")
                ) {
                  subIndicationOR.push(
                    this.calculateDosingRecomendation(t, input_wt_kg)
                  );
                  subIndicationArr[t.subIndication] = subIndicationOR.join(
                    " or "
                  );
                } else {
                  subIndicationArr[
                    t.subIndication
                  ] = this.calculateDosingRecomendation(t, input_wt_kg);
                }
              } else {
                if (
                  t.doseStage.includes("or1") ||
                  t.doseStage.includes("or2")
                ) {
                  let dotComma = t.doseStage.split(";");
                  if (dotComma.length > 1) {
                    overOR.push(
                      `${dotComma[1] &&
                        dotComma[1]} ${this.calculateDosingRecomendation(
                        t,
                        input_wt_kg
                      )}, `
                    );
                  } else {
                    overOR.push(
                      `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                    );
                  }
                } else if (t.doseStage) {
                  otherDS.push(
                    `${t.doseStage}: ${this.calculateDosingRecomendation(
                      t,
                      input_wt_kg
                    )}`
                  );
                } else {
                  output = this.calculateDosingRecomendation(t, input_wt_kg);
                }
              }
            }
          }
          if (!t.weightMax && !t.weightMin) {
            if (t.subIndication) {
              if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
                subIndicationOR.push(
                  this.calculateDosingRecomendation(t, input_wt_kg)
                );
                subIndicationArr[t.subIndication] = subIndicationOR.join(
                  " or "
                );
              } else {
                subIndicationArr[
                  t.subIndication
                ] = this.calculateDosingRecomendation(t, input_wt_kg);
              }
            } else {
              if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
                let dotComma = t.doseStage.split(";");
                if (dotComma.length > 1) {
                  overOR.push(
                    `${dotComma[1] &&
                      dotComma[1]} ${this.calculateDosingRecomendation(
                      t,
                      input_wt_kg
                    )}, `
                  );
                } else {
                  overOR.push(
                    `${this.calculateDosingRecomendation(t, input_wt_kg)} `
                  );
                }
              } else if (t.doseStage) {
                otherDS.push(
                  `${t.doseStage}: ${this.calculateDosingRecomendation(
                    t,
                    input_wt_kg
                  )}`
                );
              } else {
                output = this.calculateDosingRecomendation(t, input_wt_kg);
              }
            }
          }
        }
        if (!t.ageMin) {
          if (t.doseStage.includes("or1") || t.doseStage.includes("or2")) {
            let dotComma = t.doseStage.split(";");
            if (dotComma.length > 1) {
              overOR.push(
                `${dotComma[1] &&
                  dotComma[1]} ${this.calculateDosingRecomendation(
                  t,
                  input_wt_kg
                )}, `
              );
            } else {
              overOR.push(
                `${this.calculateDosingRecomendation(t, input_wt_kg)} `
              );
            }
          } else if (t.doseStage) {
            otherDS.push(
              `${t.doseStage}: ${this.calculateDosingRecomendation(
                t,
                input_wt_kg
              )}`
            );
          } else {
            output = this.calculateDosingRecomendation(t, input_wt_kg);
          }
        }
      }
    }
    output += underOR.length ? underOR.join(" or ") : "";
    output += overOR.length ? overOR.join(" or ") : "";
    output += otherDS.length ? otherDS.join("; ") : "";
    if (Object.keys(subIndicationArr).length) {
      for (let i = 0; i < Object.keys(subIndicationArr).length; i++) {
        const subIndication = Object.keys(subIndicationArr)[i];
        output += `<br>${subIndication}: ${subIndicationArr[subIndication]}`;
      }
    }
    return output ? `<b>${indication}:</b> ${output} <br /><br />` : "";
  };
  handleFormulaCalc = (
    drugName,
    indicationGroup,
    input_age_mth,
    input_wt_kg
  ) => {
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
            // if (indication === "Prophylaxis") {
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
        if (ss.drug === drugName && ss.title === indicationGroup) {
          dosingInfo.push({
            title: ss.title,
            html: ss.string.replace(/(?:\r\n|\r|\n)/g, "<br>")
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
