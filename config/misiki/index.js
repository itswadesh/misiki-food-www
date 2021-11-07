const pwa = {
  manifest: {
    short_name: 'Misiki',
    name: 'Misiki Store',
    description: 'Misiki store front',
    theme_color: '#fc7019',
  },
}

const colors = {
  primary: {
    100: '#ffa066' /* light orange */,
    500: '#fc7019' /* orange */,
    700: '#f86103' /* dark orange */,
  },

  secondary: {
    100: '#fded8e' /* light yellow */,
    500: '#fbe143' /* yellow */,
    700: '#fadd2a' /* dark yellow */,
  },

  accent: '#000000' /* black */,

  success: '#32CD32' /* lime green */,

  error: '#eb0000' /* red */,
}

const fontFamily = {
  sans: ['Inter'],
}

module.exports = { pwa, colors, fontFamily }
