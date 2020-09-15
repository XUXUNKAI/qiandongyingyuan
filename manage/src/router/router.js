export const routes = [

  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'movie',
        name: 'Movie',
        component: () => import('../views/Movie.vue')
      },
      {
        path: 'releaseMovie', // /:movieId? 该路由参数可有可无，有只有一个
        name: 'ReleaseMovie',
        component: () => import('../views/ReleaseMovie.vue')
      }
    ]
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
  
]