const pwa = {
  manifest: {
    short_name: 'Misiki',
    name: 'Misiki Store',
    description: 'Misiki store front',
  },
}
const colors = {
  primary: {
    500: '#6366f1', // brown
  },
  secondary: {
    100: '#d1fae5' /* green-300  */,
    200: '#32CD32', // green
    400: '#78f547', // light green
    500: '#55C451' /* lightgreen */,
    600: '#3db340' /* just-dark-green  */,
  },
  accent: {
    100: '#fee2e2' /* light-red */,
    500: '#f59e0b' /* yellow-500 */,
    900: '#eb0000;', // red
  },
}
const fontFamily = {
  sans: ['Inter'],
}
module.exports = { pwa, colors, fontFamily }
