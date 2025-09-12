import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

export default createVuetify({

  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.indigo.lighten4, 
          secondary: colors.indigo.darken3,
          surface: colors.indigo.accent1,
          text: colors.indigo.darken3
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.indigo.darken3,
          secondary: colors.indigo.lighten4,
          surface: colors.indigo.accent4,
          text: colors.indigo.darken3

        }
      }
    },
  },

  components,
  directives,

})
