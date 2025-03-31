// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-nodemailer',
  ],
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  imports: {
    dirs: [
      'interfaces',
    ],
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: [
    'assets/css/main.css',
  ],
  fonts: {
    families: [
      {
        provider: 'local',
        name: 'Wedges',
        src: '/fonts/wedges/Wedges.ttf',
      },
      {
        name: 'Just Another Hand',
        provider: 'google',
      },
      {
        name: 'Inter',
        provider: 'google',
      },
    ],
  },
  nodemailer: {
    from: 'Third Avenue Care Connect',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
})
