export default [
  /* test 영역 */
  {
    path: "/Gallery",
    name: "Gallery",
    meta: {
      title: "Gallery"
    },
    component: () =>
      import(/* webpackChunkName: "Gallery" */ "@/components/contents/Gallery/Gallery.vue")
  },
  {
    path: "/ImgUpload",
    name: "ImgUpload",
    meta: {
      title: "New Content"
    },
    component: () =>
      import(
        /* webpackChunkName: "ImgUpload" */ "@/components/contents/Gallery/ImgUpload.vue"
      )
  },
  {
    path: "/ShowDetail/:postSeq",
    name: "ShowDetail",
    meta: {
      title: "ShowDetail"
    },
    component: () =>
      import(
        /* webpackChunkName: "ShowDetail" */ "@/components/contents/Gallery/ShowDetail.vue"
      )
  },
  {
    path: "/ModifyPost/:postSeq",
    name: "ModifyPost",
    meta: {
      title: "ModifyPost"
    },
    component: () =>
      import(
        /* webpackChunkName: "ShowDetail" */ "@/components/contents/Gallery/ModifyPost.vue"
      )
  },
];
