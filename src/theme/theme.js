import { createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'
import {
  ALERT_RED,
  CLEAR_GREEN,
  DEEP_BLUE,
  DOC_BLUE_400,
  DOC_BLUE_50,
  DOC_BLUE_700,
  DOC_BLUE_700_2,
  DOC_BLUE_DEFAULT,
  FAB,
  FIELD_GREY_BG,
  ICON_DARK_GREY,
  ICON_RED,
  ICON_TURQUOISE,
  ICON_YELLOW,
  MID_ORANGE,
  SEPARATOR_GREY,
  WARM_GREY
} from './colors/colors'

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  brand: {
    colors: {
      primary: DOC_BLUE_DEFAULT,
      darkPrimary: DOC_BLUE_700,
      userSpeech: DOC_BLUE_400,
      50: DOC_BLUE_50,
      icons: DEEP_BLUE,
      highlight: DOC_BLUE_700_2,
      botSpeech: WARM_GREY,
      secondary: FAB,
      noInteraction: CLEAR_GREEN,
      significant: MID_ORANGE,
      serious: ALERT_RED,
      iconTurquoise: ICON_TURQUOISE,
      iconYellow: ICON_YELLOW,
      iconRed: ICON_RED,
      iconDarkGrey: ICON_DARK_GREY,
      separatorGrey: SEPARATOR_GREY,
      fieldGreyBg: FIELD_GREY_BG
    }
  }
})

export default theme
