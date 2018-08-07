module.exports = {
  srcDir: './src/nuxt',
  buildDir: './build/nuxt',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Yomitai',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Kindleの新刊を探しやすく' }
    ],
    link: [
      // FIXME
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-MTPDTRV' }],
    'bootstrap-vue/nuxt',
    '~modules/typescript.js',
  ],
  /*
  ** Plugins
  */
  plugins: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },

  axios: {
    browserBaseURL: '/',
  },
}
