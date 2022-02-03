export default [
  /* test 영역 */
  {
    path: "/TableList",
    name: "TableList",
    meta: {
      title: "TableList"
    },
    component: () =>
      import(/* webpackChunkName: "TableList" */ "@/components/contents/TableList/TableList.vue")
  },
];
