import { defineConfig } from 'vitepress'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'

// https://vitepress.dev/reference/site-config
const base = process.env.VITEPRESS_BASE || (process.env.NODE_ENV === 'production' ? '/blog/' : '/');

// Plugin to copy article assets during build
function copyAssets() {
  return {
    name: 'copy-assets',
    buildStart() {
      // During build, copy assets to dist
      const src = join(process.cwd(), 'blog/articles')
      const dest = join(process.cwd(), 'blog/.vitepress/dist/articles')
      
      if (!existsSync(src)) return
      
      function copyRecursive(srcDir: string, destDir: string) {
        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true })
        }
        
        const entries = readdirSync(srcDir, { withFileTypes: true })
        for (const entry of entries) {
          const srcPath = join(srcDir, entry.name)
          const destPath = join(destDir, entry.name)
          
          if (entry.isDirectory()) {
            if (entry.name === 'assets' || entry.name.match(/^(portfolio|fingerprinting|fixing-fingerprinting)$/)) {
              copyRecursive(srcPath, destPath)
            }
          } else if (entry.isFile() && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(entry.name)) {
            copyFileSync(srcPath, destPath)
          }
        }
      }
      
      try {
        copyRecursive(src, dest)
      } catch (e) {
        // Ignore errors
      }
    }
  }
}

export default defineConfig({
  base,
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
        load(id, ssr) {
          // Only strip CSS that causes Node ESM errors during SSR (Vuetify component .css files).
          // Do NOT strip VitePress theme CSS or vuetify/styles - they must load for the client.
          const isVuetifyComponentCss = id.includes('node_modules/vuetify') && id.includes('/lib/components/') && id.endsWith('.css');
          if (ssr && isVuetifyComponentCss) {
            return 'export default {}'
          }
        }
      },
      copyAssets()
    ]
  }
});
