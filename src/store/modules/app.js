import packageJson from "../../../package.json";

//stoe 값 호출
const getters = {
  showLoading: state => state.showLoading,
  appTitle: state => state.appTitle,
  appVersion: state => state.appVersion,
  appCurrentPage: state => state.appCurrentPage,
  //alertDialog
  alertDialog: state => state.alertDialog,
  alertTitle: state => state.alertTitle,
  alertMsg: state => state.alertMsg,
  alertDetail: state => state.alertDetail,
  //snackbar
  snackbarOpen: state => state.snackbarOpen,
  snackbarMsg: state => state.snackbarMsg,
  snackbarColor: state => state.snackbarColor,
  commCode: state => state.commCode,
  hasCommCode: state => state.hasCommCode,

  //login info
  loginUserId: state => state.loginUserId,
  loginUserNm: state => state.loginUserNm,
  loginNick: state => state.loginNick,
  loginHp: state => state.loginHp,
  loginEmal: state => state.loginEmal,
  loginAccToken: state => state.loginAccToken,
  clientId: state => state.clientId,

  //로그인시 메뉴
  menuList: state => state.menus,
  hasMenuList: state => state.hasMenuList,

  //
  catCode: state => state.catCode,
  hasCatCode: state => state.hasCatCode,
  catChildCode: state => state.catChildCode,
  hasCatChildCode: state => state.hasCatChildCode
};

//비동기식 값 변경
const actions = {
  setAppVersion({ commit }, payload) {
    commit("setAppVersion", payload);
  }
};

//동기식 값 변경처리
const mutations = {
  ["setAppVersion"](state, version) {
    state.appVersion = version;
  },
  ["setPageName"](state, title) {
    state.appCurrentPage = title;
  },
  ["setLoading"](state, value) {
    state.showLoading = value;
  },
  //alertDialog
  ["setAlertDialog"](state, value) {
    state.alertDialog = value;
  },
  ["setAlertTitle"](state, value) {
    state.alertTitle = value;
  },
  ["setAlertMsg"](state, value) {
    state.alertMsg = value;
  },
  ["setAlertDetail"](state, value) {
    state.alertDetail = value;
  },
  //snackbar
  ["setSnackbarOpen"](state, value) {
    state.snackbarOpen = value;
  },
  ["setSnackbarMsg"](state, value) {
    state.snackbarMsg = value;
  },
  ["setSnackbarColor"](state, value) {
    state.snackbarColor = value;
  },
  ["setCommCode"](state, value) {
    state.commCode = value;
  },
  ["setHasCommCode"](state, value) {
    state.hasCommCode = value;
  },
  //login
  ["setLoginUserId"](state, value) {
    state.loginUserId = value;
  },
  ["setLoginUserNm"](state, value) {
    state.loginUserNm = value;
  },
  ["setLoginNick"](state, value) {
    state.loginNick = value;
  },
  ["setLoginHp"](state, value) {
    state.loginHp = value;
  },
  ["setLoginEmal"](state, value) {
    state.loginEmal = value;
  },
  ["setLoginAccToken"](state, value) {
    state.loginAccToken = value;
  },
  ["setClientId"](state, value) {
    state.clientId = value;
  },

  ["setMenuList"](state, value) {
    state.menus = value;
  },
  ["setHasMenuList"](state, value) {
    state.hasMenuList = value;
  },
  //카테고리
  ["setCatCode"](state, value) {
    state.catCode = value;
  },
  ["setHasCatCode"](state, value) {
    state.hasCatCode = value;
  },
  ["setCatChildCode"](state, value) {
    state.catChildCode = value;
  },
  ["setHasCatChildCode"](state, value) {
    state.hasCatChildCode = value;
  }
};

const state = {
  appTitle: "Nyan",
  appVersion: packageJson.version,
  appCurrentPage: "",
  showLoading: false,
  //alertDialog
  alertDialog: false,
  alertTitle: "",
  alertMsg: "",
  alertDetail: "",
  //snackbar
  snackbarMsg: "",
  snackbarOpen: false,
  snackbarColor: "primary",
  //common Code
  commCode: [],
  hasCommCode: false,

  //login info
  loginUserId: "",
  loginUserNm: "",
  loginNick: "",
  loginHp: "",
  loginEmal: "",
  loginAccToken: "",
  clientId: "",

  menus: [],
  hasMenuList: false,

  //catg Code
  catCode: [],
  hasCatCode: false,
  catChildCode: [],
  hasCatChildCode: false
};

export default {
  state,
  getters,
  actions,
  mutations
};
