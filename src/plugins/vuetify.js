import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

export default createVuetify({

  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.indigo.darken1, // #E53935
          secondary: colors.indigo.lighten2, // #FFCDD2
        }
      },
    },
  },

  components,
  directives,

})
