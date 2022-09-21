module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#FFA500",
          "primary-content": "#040505",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#FFA500",
          "primary-content": "#131616",
        }
      },
      'cmyk',
      // {
      //   mytheme: {
      //     primary: '#5C7F67',
      //     secondary: '#ECF4E7',
      //     accent: '#FAE5E5',
      //     neutral: '#5D5656',
      //     'base-100': '#E9E7E7',
      //     info: '#3ABFF8',
      //     success: '#36D399',
      //     warning: '#FBBD23',
      //     error: '#F87272',
      //   },
      // },
    ],
  },
  plugins: [require('daisyui')],
};
