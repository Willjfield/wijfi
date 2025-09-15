import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

export default createVuetify({

  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.indigo.lighten5, 
          secondary: colors.indigo.lighten4,
          surface: colors.indigo.lighten5,
          text: colors.indigo.darken3,
          dropShadow: '#778899',
          linkText:'#646cff',
          linkTextHover:'#535bf2',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.indigo.darken3,
          secondary: colors.indigo.lighten4,
          surface: colors.indigo.darken1,
          surfaceSemiTransparent: colors.indigo.darken1+'.5',
          text: colors.indigo.lighten5,
          dropShadow: '#fff',
          linkText:'#eee',
          linkTextHover:'#fff',
        }
      }
    },
  },

  components,
  directives,

})
