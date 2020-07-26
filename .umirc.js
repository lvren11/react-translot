
// ref: https://umijs.org/config/
export default {
  disableCSSModules: true,
  treeShaking: true,
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout/UserLayout',
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: './user/login',
        },
        {
          path: '/user/register',
          name: 'register',
          component: './user/register',
        },
        {
          component: './404/404',
        },
      ],
    },
    // {
    //   path: '/index1',
    //   component: '../layouts/IndexLayout/IndexLayout',
    //   routes: [
    //     {
    //       path:'/index1',
    //       name:'index1',
    //       component: './index1/index1',
    //     },
    //     {
    //       component: './404/404',
    //     },
    //   ],
    // },
    {
      path: '/setting',
      component: '../layouts/CenterLayout/CenterLayout',
      routes: [
        {
          path:'/setting/:id/changepassword',
          name:'changepassword',
          component: './setting/changepassword',
        },
        {
          path:'/setting/:id/changeother',
          name:'changeother',
          component: './setting/changeother',
        },
        {
          path:'/setting/:id/articledo',
          name:'articledo',
          component: './setting/articledo',
        },
        {
          path:'/setting/:id/delete',
          name:'delete',
          component: './setting/delete',
        },
        {
          path:'/setting/:id/comment',
          name:'commentdo',
          component: './setting/comment',
        },
        {
          path:'/setting/:id/deletecomment',
          name:'deletecomment',
          component: './setting/deletecomment',
        },
        {
          path:'/setting/:id/inform',
          name:'inform',
          component: './setting/inform',
        },
        {
          path:'/setting/:id/progress',
          name:'progress',
          component: './setting/progress',
        },
        {
          component: './404/404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path:'/publish',
          name:'publish',
          component:'./publish/publish'
        },
        {
          path:'/search',
          name:'search',
          component:'./home/search'
        },
        {
          path:'/sortprice',
          name:'sortprice',
          component:'./home/sortprice'
        },
        {
          path:'/sorttime',
          name:'sorttime',
          component:'./home/sorttime'
        },
        {
          path:'/direct/:id',
          name:'direct',
          component:'./direct/direct'
        },
        {
          path: '/accept_article/:id',
          name: 'accept',
          component: './accept_article/accept_article',
        },
        {
          path:'/center/:id',
          name:'center',
          component:'./center/center'
        },
        {
          path: '/',
          name: 'home',
          component: './home/home',
        },
        {
          path: '/article/:id',
          name: 'detail',
          component: './article/article',
        },
        {
          component: './404/404',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Translot',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      pathRewrite: { '^/api': '/api' },
      changeOrigin: true
    },
    '/avatar': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: { '^/avatar': '/avatar' },
    },
  },
  history: 'hash',
  publicPath:'./',
}
