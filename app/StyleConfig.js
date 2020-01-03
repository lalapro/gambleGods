import { Platform, Dimensions, StyleSheet } from 'react-native'

const DIMENSIONS = Dimensions.get('window');
const HEIGHT = DIMENSIONS.height;
const WIDTH = DIMENSIONS.width;
const RETINA4 = DIMENSIONS.width < 375;
const IPHONEX = HEIGHT >= 800;
const ANDROID = Platform.OS === 'android';
const RETINA55 = DIMENSIONS.width > 375;

const phoneConfig = {
  HEIGHT: HEIGHT,
  WIDTH: WIDTH,
  IPHONEX: IPHONEX,
  RETINA4: RETINA4,
  RETINA55: RETINA55,
  ANDROID: ANDROID,
  IPHONE_X_PADDING: 40,
  IPHONE_X_PADDING2: 40,
  STATUSBARHEIGHT: ANDROID ? 55 : IPHONEX ? 15 + 75 : 75
}

const colorConfig = {
  modalOpacity: 'rgba(0, 0, 0, 0.7)',
  lightGreen: 'rgba(230, 251, 240, 1)',
  green: 'rgba(5, 219, 106, 1)',
  purple: `rgba(255, 0, 255, 1)`,
  red: '#E74C3C',
  declineRed: '#ff3030',
  blue: '#3498DB',
  grey: 'rgba(255, 0, 255, 1)',
  white: '#ffffff',
  black: '#000000',
  black2: '#212121', //33,33,33
  black3: '#3d3d3d', //61,61,61
  black4: 'rgba(55,57,61,1)', //55,57,61
  grey1: '#e0e0e0', //224,224,224
  grey2: '#f5f5f5', //245,245,245
  grey3: '#9e9e9e', //158,158,158
  grey4: '#eeeeee', //238,238,238
  grey5: '#d9d9d9', //217,217,216
  grey6: '#f0f0f0', //240,240,240
  grey7: '#bdbdbd', //189,189,189,
  grey8: '#eeeeee'//238,238,238
}

const fontConfig = {
  nobelReg: 'DTLNobelT',
  nobelBold: 'DTLNobelT-Bold',
  dollyReg: 'DollyPro-Regular',
  dollyBold: 'DollyPro-Bold',
}

const fontSettings = {
  nobel10: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 10,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobel12: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 12,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobel16: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 16,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobel18: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 18,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobel20: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 20,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobel22: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 22,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobel26: {
    fontFamily: fontConfig.nobelReg,
    fontSize: 26,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobelBold10: {
    fontFamily: fontConfig.nobelBold,
    fontSize: 10,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobelBold12: {
    fontFamily: fontConfig.nobelBold,
    fontSize: 12,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobelBold14: {
    fontFamily: fontConfig.nobelBold,
    fontSize: 14,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobelBold18: {
    fontFamily: fontConfig.nobelBold,
    fontSize: 18,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobelBold20: {
    fontFamily: fontConfig.nobelBold,
    fontSize: 20,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  nobelBold22: {
    fontFamily: fontConfig.nobelBold,
    fontSize: 22,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  dollyReg12: {
    fontFamily: fontConfig.dollyReg,
    fontSize: 12,
    color: colorConfig.black,
    letterSpacing: 1,
    textAlign: 'center'
  },
  dollyReg14: {
    fontFamily: fontConfig.dollyReg,
    fontSize: 14,
    color: colorConfig.black,
    letterSpacing: 0,
    textAlign: 'center'
  },
  dollyReg16: {
    fontFamily: fontConfig.dollyReg,
    fontSize: 16,
    color: colorConfig.black,
    letterSpacing: 0,
    textAlign: 'center'
  },
}


const dateConfig = {
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}


export default {
  ...phoneConfig,
  ...colorConfig,
  ...dateConfig,
  ...fontSettings,
  ...fontConfig
}
