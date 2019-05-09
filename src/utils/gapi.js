import axios from 'axios'
const spreadsheetId = '1rGe8nsGOsd_qedACKONYw5cIo_PHDeM7a4exq8CQcl0'
const apiKey = 'AIzaSyD8k4EJEdB4rdpIT2NMrZGIeqkDCm8uTyw'

export const getSheetData = async (type) =>{
  let range = ''
  switch (type) {
    case 'Source Strings':
      range = 'Source Strings!A:D'
      break;
    case 'Drug':
      range = 'NEW_Database!A:A'
      break;
    case 'Indication Group':
      range = 'NEW_Database!D:D'
      break;
    case 'Indication':
      range = 'NEW_Database!E:E'
      break;
    default:
      range = 'NEW_Database!A:X'
      break;
  }
  if(range) {
    const URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    const {data} = await axios.get(URL)
    return data ? data.values : []
  }else{
    return []
  }
}