export default [
  /* test 영역 */
  {
    // login2
    path: "/login",
    name: "Login",
    props: true,
    meta: {
      title: "테스트 페이지",
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/components/core/Login_plugins.vue")
  },

  /* 공통 */
  {
    path: "/",
    name: "Landing",
    meta: {
      title: ""
    },
    component: () =>
      import(/* webpackChunkName: "Landing" */ "@/components/Landing.vue")
  },
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: ""
    },
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/components/Home.vue")
  },
  {
    path: "/Sample",
    name: "Sample",
    meta: {
      title: "Sample"
    },
    component: () =>
      import(/* webpackChunkName: "Sample" */ "@/components/sample/Sample.vue")
  },
  {
    // test
    path: "/system/test",
    name: "test",
    props: true,
    meta: {
      title: "테스트 페이지",
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "test" */ "@/components/sample/test.vue")
  },
];
