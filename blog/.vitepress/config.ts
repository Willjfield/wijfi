import { defineConfig } from 'vitepress'
// import vuetify from '../../src/plugins/vuetify'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Geospatial Blog",
  description: "A blog to document and share my geospatial work",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: 'https://wijfi.com', target: '_self' },
    ],
    search: {
      provider: 'local'
    },
    externalLinkIcon: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Willjfield' },
      { icon: 'mastodon', link: 'https://fosstodon.org/@Wijfi' },
      { icon: 'protonmail', link: 'mailto:willjfield@proton.me' },
    ]
  }, 
  cleanUrls: true
  // vite: {
  //   plugins: [vuetify()]
  // }
  }
)
