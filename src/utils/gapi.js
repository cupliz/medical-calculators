import _ from 'lodash'
import * as d3 from 'd3';
import newDatabaseCSV from "../db/NEW_Database.csv"
import sourceStringsCSV from "../db/Source Strings.csv"

export const csvToJSON = async (type) => {
  const newDatabase = await d3.csv(newDatabaseCSV)
  let data = []
  switch (type) {
    case 'Source Strings':
      const sourceStrings = await d3.csv(sourceStringsCSV)
      data = parseSourceStrings(sourceStrings)
      break;
    case 'Drug':
      data = parseDrugs(newDatabase)
      break;
    case 'Indication Group':
      break;
    case 'Indication':
      break;
    default:
      data = parseNewDatabase(newDatabase)
      break;
  }
  return data
}
const parseSourceStrings = (database) => {
  const output = database.map(ss => {
    return {
      drug: ss['Drug'],
      sn: ss['SN'],
      title: ss['Title'],
      string: ss['String (where the line starts with "-", display as nested bullet point']
    };
  });
  return output
}
const parseNewDatabase = (database) => {
  const output = database.map((data)=>{
    return {
      drug: data['Drug'],
      sn: data['SN'],
      indicationGroup: data['Indication Group'],
      indication: data['Indication'],
      subIndication: data['Sub-indication'],
      doseStage: data['dose_stage'],
      weightMin: data['weight_min_kg'] || 0,
      weightMax: data['weight_max_kg'] ? parseFloat(data['weight_max_kg'].split("<").join("")) : 0,
      ageMin: data['age_min_mth'] || 0,
      ageMax: data['age_max_mth'] ? parseFloat(data['age_max_mth'].split("<").join("")) : 0,
      route: data['route'],
      doseUnit: data['dose_unit'],
      fixedDose: data['fixed dose'] || 0,
      dailymgperkgLow: data['daily_doseperkg_high'] || 0,
      dailymgperkgHigh: data['daily_doseperkg_low'] || 0,
      divisor: data['divisor'] || 0,
      maxSigleDose: data['max_single_dose'] || "",
      frequency: isNaN(data['frequency']) ? data['frequency'] : `q${data['frequency']}hr`,
      duration: data['duration'] || "",
      additionalInfo: data['additional_info'] || "",
    }
  })
  return output;
}
const parseDrugs = (database) => {
  const data = database.map((d)=>d['Drug'])
  const sortedData = _.uniq(data)
  const filterEmpty = _.compact(sortedData)
  return filterEmpty
}

// const spreadsheetId = '1rGe8nsGOsd_qedACKONYw5cIo_PHDeM7a4exq8CQcl0'
// const apiKey = 'AIzaSyD8k4EJEdB4rdpIT2NMrZGIeqkDCm8uTyw'
// export const getSheetData = async (type) =>{
//   let range = ''
//   switch (type) {
//     case 'Source Strings':
//       range = 'Source Strings!A:D'
//       break;
//     case 'Drug':
//       range = 'NEW_Database!A:A'
//       break;
//     // case 'Indication Group':
//     //   range = 'NEW_Database!D:D'
//     //   break;
//     // case 'Indication':
//     //   range = 'NEW_Database!E:E'
//     //   break;
//     default:
//       // range = 'NEW_Database!A:X'
//       break;
//   }
//   if(range) {
//     const URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
//     const {data} = await axios.get(URL)
//     return data ? data.values : []
//   }else{
//     return []
//   }
// }
// sourceString2json = async sourceString => {
//   let output = [];
//   if (sourceString.length) {
//     sourceString.splice(0, 1);
//     output = await sourceString.map(ss => {
//       return {
//         drug: ss[0],
//         sn: ss[1],
//         title: ss[2],
//         string: ss[3]
//       };
//     });
//   }
//   return output;
// };
// database2json = database => {
//   if (database.length) {
//     database.splice(0, 1);
//     const output = [];
//     for (let i = 0; i < database.length; i++) {
//       const data = database[i];
//       output.push({
//         drug: data[0],
//         sn: data[1],
//         indicationGroup: data[3],
//         indication: data[4],
//         subIndication: data[5],
//         doseStage: data[7],
//         weightMin: data[8] || 0,
//         weightMax: data[9] ? parseFloat(data[9].split("<").join("")) : 0,
//         ageMin: data[10] || 0,
//         ageMax: data[11] ? parseFloat(data[11].split("<").join("")) : 0,
//         route: data[12],
//         doseUnit: data[13],
//         fixedDose: data[14] || 0,
//         dailymgperkgLow: data[15] || 0,
//         dailymgperkgHigh: data[16] || 0,
//         divisor: data[17] || 0,
//         maxSigleDose: data[18] || "",
//         frequency: isNaN(data[19]) ? data[19] : `q${data[19]}hr`,
//         duration: data[20] || "",
//         additionalInfo: data[21] || "",
//         outputString: data[22] || ""
//       });
//     }
//     return output;
//   } else {
//     return [];
//   }
// };