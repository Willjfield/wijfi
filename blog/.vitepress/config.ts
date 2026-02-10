import { defineConfig } from 'vitepress'

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
  cleanUrls: true,
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    optimizeDeps: {
      include: ['vuetify']
    },
    resolve: {
      dedupe: ['vue']
    },
    plugins: [
      {
        name: 'ssr-css-handler',
        enforce: 'pre',
        load(id) {
          if (id.endsWith('.css')) {
            return 'export default {}'
          }
        }
      }
    ]
  }
})
