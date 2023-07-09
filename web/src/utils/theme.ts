const materialColors = {
  red: {
    bg: '#EE9A9A',
    text: '#D32F2F',
  },

  //changed
  lightRed: {
    bg: '#EE9A9A',
    text: '#D32F2F',
  },
  pink: {
    bg: '#f48fb1',
    text: '#c2185b',
  },
  purple: {
    bg: '#ce93d8',
    text: '#7b1fa2',
  },
  deepPurple: {
    bg: '#b39ddb',
    text: '#512da8',
  },
  indigo: {
    bg: '#9fa8da',
    text: '#303f9f',
  },
  blue: {
    bg: '#90caf9',
    text: '#1976d2',
  },
  lightBlue: {
    bg: '#81d4fa',
    text: '#0288d1',
  },
  cyan: {
    bg: '#80deea',
    text: '#0097a7',
  },
  teal: {
    bg: '#80cbc4',
    text: '#00796b',
  },
  green: {
    bg: '#a5d6a7',
    text: '#388e3c',
  },
  lightGreen: {
    bg: '#c5e1a5',
    text: '#689f38',
  },
  lime: {
    bg: '#e6ee9c',
    text: '#afb42b',
  },
  yellow: {
    bg: '#fff59d',
    text: '#fbc02d',
  },
  //chnaged
  lightYellow: {
    bg: '#fff59d',
    text: '#fbc02d',
  },
  amber: {
    bg: '#ffe082',
    text: '#ffa000',
  },
  orange: {
    bg: '#ffcc80',
    text: '#f57c00',
  },
  deepOrange: {
    bg: '#ffab91',
    text: '#e64a19',
  },
  brown: {
    bg: '#bcaaa4',
    text: '#5d4037',
  },
  grey: {
    bg: '#eeeeee',
    text: '#616161',
  },
  blueGrey: {
    bg: '#b0bec5',
    text: '#455a64',
  },
};

const statusColors = {
  processing: materialColors.brown,
  arrived: materialColors.orange,
  assigned: materialColors.purple,
  started: materialColors.blue,
  declined: materialColors.red,
  cancelled: materialColors.blueGrey,
  completed: materialColors.green,
  Ride: materialColors.green,
  'Food Delivery': materialColors.red,
  Delivery: materialColors.purple,
  Active: materialColors.green,
  Inactive: materialColors.red,
  Paused: materialColors.grey,
  Draft: materialColors.grey,
  Verified: materialColors.green,
  Landlord: materialColors.blue,
  Tenant: materialColors.green,
  'Service provider': materialColors.purple,
  Processing: materialColors.purple,
  Hired: materialColors.blue,
  Closed: materialColors.red,
};

export const generalColors = {
  primary: '#2857FF',
  primaryMedium: 'rgba(238,60,163,1)',
  primaryLight: 'rgba(242,108,185,1)',
  secondary: '#49DF88',
  secondaryMedium: 'rgba(96,192,228,1)',
  secondaryLight: 'rgba(135,207,234,1)',
  white: 'rgba(255,255,255,1)',
  lightBG: '#FAFAFA',
  border: '#F0F0F0',
  danger: '#D32F2F',
};

export const fontColors = {
  primary: '#2857FF',
  primaryMedium: 'rgba(110,115,104,1)',
  primaryLight: 'rgba(146,149,141,1)',
  secondary: 'rgba(181,184,179,1)',
  secondaryMedium: 'rgba(195,198,194,1)',
  secondaryLight: 'rgba(209,211,208,1)',
  dark: 'rgba(15, 17, 12, 1)',
};

export const otherColors = {
  white: 'rgba(255,255,255,1)',
  whiteLight: 'rgba(255,255,255,0.5)',
  lightBG: 'rgba(242,242,242,1)',
};

export const sizes = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  xxl: 50,
  '3xl': 75,
  '4xl': 100,
};
export const screenSizes = {
  xs: '480px',
  sm: '576px',
  md: '766px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};
export const devices = {
  mobileXS: ` (min-width: ${screenSizes.xs})`,
  mobileSM: ` (min-width: ${screenSizes.sm})`,
  tablet: ` (min-width: ${screenSizes.md})`,
  laptop: ` (min-width: ${screenSizes.lg})`,
  laptopXL: ` (min-width: ${screenSizes.xl})`,
  Desktop: ` (min-width: ${screenSizes.xxl})`,
};

export const heading = {
  h1: { fontSize: 96, lineHeight: 112, letterSpacing: -2.5, fontWeight: 500 },
  h2: { fontSize: 60, lineHeight: 80, letterSpacing: -1.5, fontWeight: 500 },
  h3: { fontSize: 48, lineHeight: 56, letterSpacing: -0.5, fontWeight: 500 },
  h4: { fontSize: 34, lineHeight: 44, fontWeight: 500 },
  h5: { fontSize: 24, lineHeight: 36, fontWeight: 500 },
  h6: { fontSize: 20, lineHeight: 32, fontWeight: 500 },
  h7: { fontSize: 18, lineHeight: 27, fontWeight: 500 },
};

export const text = {
  b1: {
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0.15,
    fontWeight: 'normal',
  },
  b2: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.44,
    fontWeight: 'normal',
  },
  b3: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.1,
    fontWeight: 500,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: 'normal',
  },
  overline: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    fontWeight: 500,
  },
};

const createTheme = (isDarkMode: any) => {
  const theme = {
    isDarkMode,
    colors: {
      generalColors,
      fontColors,
      statusColors,
      otherColors,
      materialColors,
      ...generalColors,
    },

    // colors: {
    //   ...statusColor,
    //   ...generalColors,
    //   ...inputElementColors,
    //   defaultBackgroundColor: isDarkMode ? '#333333' : 'white',
    //   defaultTextColor: isDarkMode ? 'white' : 'black',
    //   alterTextColor: isDarkMode ? 'black' : 'white',
    //   dimBackgroundColor: isDarkMode ? '#3D3D3D' : '#F8F6FA',
    //   sectionHeaderBackground: isDarkMode ? '#524B38' : '#e3e4df',
    //   dimTextColor: isDarkMode ? '#E0E0E1' : '#21252B',
    //   defaultBorderColor: isDarkMode ? '#525252' : '#C1C1C1',
    // },
    devices,
    sizes,
    heading,
    text,
    fontFamily: 'Poppins',
  };

  return theme;
};

export default createTheme;

export const ThemeType = createTheme(false);
