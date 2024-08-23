// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from './i18n/config';
console.log('process.env.NUXT_BASE_URL', process.env.NUXT_BASE_URL);

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: [
      // 扫描顶级模块
      'composables',
      // ... 或扫描带有特定名称和文件扩展名的一级嵌套模块
      'composables/*/*.{ts,js,mjs,mts}',
      // ... 或扫描给定目录中的所有模块
      'composables/**'
    ]
  },
  //自动注册组件
  components: [
    { path: '~/components/verifition' },
    { path: '~/components/verifition/Verify' },
    '~/components'
  ],
  runtimeConfig: {
    //  只能在服务器端上访问
    apiSecret: '123',
    // public 命名空间中定义的，在服务器端和客户端都可以普遍访问
    public: {
      baseURL: process.env.NUXT_BASE_URL
    }
  },
  modules: [
    '@ant-design-vue/nuxt',
    '@nuxtjs/i18n',
    "nuxt-svgo"],
  antd: {
    extractStyle: true,
  },
  svgo: {
    componentPrefix: 'svg', //指定组件前缀
    autoImportPath: './assets/svg/',//批量导入路径
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://192.168.2.130:5000", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
      '/db': {
        target: "http://192.168.2.131:100", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      }
    },
  },
  i18n: i18nConfig,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})