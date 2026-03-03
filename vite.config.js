import path from 'path'
import { defineConfig } from 'vite'

const repoName = 'fashion-store'
const isGithubPagesBuild = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGithubPagesBuild ? `/${repoName}/` : '/',
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        catalog: path.resolve(__dirname, 'catalog.html'),
        women: path.resolve(__dirname, 'women.html'),
        men: path.resolve(__dirname, 'men.html'),
        outerwear: path.resolve(__dirname, 'outerwear.html'),
        accessories: path.resolve(__dirname, 'accessories.html'),
        product: path.resolve(__dirname, 'product.html'),
        checkout: path.resolve(__dirname, 'checkout.html'),
        contacts: path.resolve(__dirname, 'contacts.html'),
        about: path.resolve(__dirname, 'about.html'),
        notFound: path.resolve(__dirname, '404.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve('src')}/`,
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/styles/helpers' as *;
        `,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
