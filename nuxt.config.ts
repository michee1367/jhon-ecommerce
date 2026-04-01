// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  //modules: ['@sidebase/nuxt-auth'],
  devtools: { enabled: true },
  css:["~/assets/scss/main.scss"],
  app:{
    head:{
      script: [
        { src: '/js/demo-theme.min.js?1685973381', body: true },
        { src: '/js/tabler.min.js?1685973381', body: true },
        { src: '/js/demo.min.js?1685973381', body: true },
        { src: 'https://accounts.google.com/gsi/client', defer:true,async:true, body: true },
      ]

    }
  },
  modules:[
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      goole_client_id:process.env.GOOGLE_CLIENT_ID,
      google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
      auth_secret:process.env.AUTH_SECRET,
      auth_origin:process.env.AUTH_ORIGIN,
      google_url:process.env.GOOGLE_URL,
      auth_redirect:process.env.AUTH_REDIRECT
    }
  }
  /*auth: {
    provider: {
      type: 'authjs'
    }
  }*/
})
