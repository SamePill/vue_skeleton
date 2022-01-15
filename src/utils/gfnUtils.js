import axios from "axios";
import moment from "moment";
import { store } from "@/store";
import router from "@/router";

const baseUrl = "";

/**
 *
 * @param {*} api //restapi 호출주소
 * @param {*} getParams //파라메터
 */
export const axiosGet = (api, getParams) => {

  getParams.lang = store.getters.locale;

  store.commit("setLoading", true);
  // var apiUrl = baseUrl + api+ ".sys";
  var apiUrl = baseUrl + api;
  console.log("api get url::::" + apiUrl);
  console.log("-------param-------");
  console.log(getParams);
  console.log("userTokn::::" + window.$cookies.get("userTokn"));
  if (window.$cookies.get("userTokn") != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + window.$cookies.get("userTokn") || "";
  }else{
    console.log("TOKEN X");
  }
  return new Promise(function(resolve, reject) {
    axios
      .get(apiUrl, { 
        // headers: {
        //   'Authorization': 'Bearer ' + window.$cookies.get("userTokn") || ""
        // },
        params: getParams
       })
      .then(res => {
        if (res.status === 200) {
          var resData = res.data;
          console.log("-------result-------");
          console.log(resData.data);

          if (resData.rtnCd == "00") {
            store.commit("setLoading", false);
            resolve(resData.rtnData);
          } else {
            openAlertDiaolog("ERROR", resData.rtnMsg);
            store.commit("setLoading", false);
            reject();
            console.log("오류");
          }
        }else{
          openAlertDiaolog("ERROR", res.status);
        }
      })
      .catch(err => {
        store.commit("setLoading", false);
        console.log("오류");
        console.log(err);
        openAlertDiaolog(
          "ERROR",
          "오류가 발생하였습니다. (" + err.response.status + ")"
        );
        //alert(err);
      });
  });
};

/**
 *
 * @param {*} api  //restapi 호출주소
 * @param {*} postParams //파라메터
 * @param {*} loading //로딩바(프로그레스바) 표시 여부
 * @param {*} isErr //어레 표시 여부
 */
export const axiosPost = (api, postParams, loading, isErr) => {
  if (typeof loading == "undefined") {
    loading = true;
  }
  if (loading) {
    store.commit("setLoading", true);
  }

  if (typeof isErr == "undefined") {
    isErr = true;
  }

  //var apiUrl = baseUrl + api + ".app";
  var apiUrl = baseUrl + api;

  console.log(api);
  postParams.lang = store.getters.locale;
  console.log("api post url::::" + apiUrl);
  console.log("-------param-------");
  console.log(postParams);
  console.log("userTokn::::" + window.$cookies.get("userTokn"));
  if (window.$cookies.get("userTokn") != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + window.$cookies.get("userTokn") || "";
  }else{
    console.log("TOKEN X");
  }

  return new Promise(function(resolve, reject) {
    //axiosHttp.post(apiUrl, {body: postParams}).then(
    // axios.post(apiUrl,  JSON.stringify(postParams) ).then(
    axios
      .post(apiUrl, postParams)
      .then(res => {
        if (res.status === 200) {

          var resData = res.data;
          console.log("-------result-------");
          console.log(resData);

          if (resData.rtnCd == "00") {
            store.commit("setLoading", false);
            resolve(resData.rtnData);
          } else {
            store.commit("setLoading", false);
            console.log("오류");
            store.commit("setAlertDialog", true);
            openAlertDiaolog("ERROR", resData.rtnMsg);
            reject(res);
          }
        }else{
          openAlertDiaolog("ERROR", res.status);
        }
      })
      .catch(err => {
        if (loading) {
          store.commit("setLoading", false);
        }

        if (isErr) {
          // console.log(err.response.data);
          // console.log(err.response.status);
          // console.log(err.response.headers);
          if (err.response.status == "404") {
            //응답코드별 처리...
            openAlertDiaolog(
              "ERROR",
              "오류가 발생하였습니다. (" + err.response.status + ")"
            );
          } else if (err.response.status == "403") {
            if ("Landing" != router.currentRoute.name) {
              openAlertDiaolog("ERROR", "로그인 되어있지 않습니다.");
            }

            router.replace({ name: "Login" });
          } else {
            openAlertDiaolog(
              "ERROR",
              "오류가 발생하였습니다. (" + err.response + ")"
            );
          }
        }

        // 스낵바 예제
        // openSnackbar(err.response.status, "error");
        // 상세alert 예제
        // openAlertDiaologWithDetail("ERROR","오류가 발생하였습니다. (" + err.response.status + ")", err.response.data.path);
        //console.log(err);
        reject(err);
        //alert(err)
      });
  });
};

/**
 *
 * @param {*} api  //restapi 호출주소
 * @param {*} postParams //파라메터
 * @param {*} formdata //파일 첨부용 form 파라메터
 * @param {*} loading //로딩바(프로그레스바) 표시 여부
 */
export const axiosPostWithFile = (
  api,
  postParams,
  formdata,
  loading,
  isErr
) => {
  if (typeof loading == "undefined") {
    loading = true;
  }
  if (loading) {
    store.commit("setLoading", true);
  }

  if (typeof isErr == "undefined") {
    isErr = true;
  }

  //var apiUrl = baseUrl + api + ".app";
  var apiUrl = baseUrl + api;

  console.log(api);

  console.log("api post url::::" + apiUrl);
  console.log("-------param-------");
  console.log(postParams);
  console.log(window.$cookies.get("userTokn"));
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + window.$cookies.get("userTokn") || "";

  return new Promise(function(resolve, reject) {
    //axiosHttp.post(apiUrl, {body: postParams}).then(
    // axios.post(apiUrl,  JSON.stringify(postParams) ).then(
    axios
      .post(apiUrl, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        var resData = res.data;
        console.log("-------result-------");
        console.log(resData);

        if (resData.rtnCd == "00") {
          store.commit("setLoading", false);
          resolve(resData.rtnData);
        } else {
          store.commit("setLoading", false);
          console.log("오류");
          store.commit("setAlertDialog", true);
          openAlertDiaolog("ERROR", resData.rtnMsg);
          reject(res);
        }
      })
      .catch(err => {
        if (loading) {
          store.commit("setLoading", false);
        }

        if (isErr) {
          // console.log(err.response.data);
          // console.log(err.response.status);
          // console.log(err.response.headers);
          if (err.response.status == "404") {
            //응답코드별 처리...
            openAlertDiaolog(
              "ERROR",
              "오류가 발생하였습니다. (" + err.response.status + ")"
            );
          } else if (err.response.status == "403") {
            if ("Landing" != router.currentRoute.name) {
              openAlertDiaolog("ERROR", "로그인 되어있지 않습니다.");
            }

            router.replace({ name: "Login" });
          } else {
            openAlertDiaolog(
              "ERROR",
              "오류가 발생하였습니다. (" + err.response + ")"
            );
          }
        }

        // 스낵바 예제
        // openSnackbar(err.response.status, "error");
        // 상세alert 예제
        // openAlertDiaologWithDetail("ERROR","오류가 발생하였습니다. (" + err.response.status + ")", err.response.data.path);
        //console.log(err);
        reject(err);
        //alert(err)
      });
  });
};

export const fileDownloadAxios = (url, fileNm) => {
  axios({
    method: "get",
    url: url,
    responseType: "arraybuffer"
  })
    .then(response => {
      this.forceFileDownload(response, fileNm);
    })
    .catch(() => {
      openAlertDiaolog("ERROR", "파일 다운로드 중 오류가 발생하였습니다.");
    });
};

export const forceFileDownload = (response, fileNm) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileNm); //or any other extension
  document.body.appendChild(link);
  link.click();
};

/**
 * 쿠기에 로그인 정보 저장
 * @param {*} msg //내용
 * @param {*} bgcolor //바탕색 (생략시 primary)
 */
export const setCookiesLoginUserInfo = item => {
  console.log("setToken Cookie  ::");
  console.log(item);
  window.$cookies.config("365d");
  window.$cookies.set("isNewUser", item.isNewUser);
  window.$cookies.set("userId", item.userId);
  window.$cookies.set("userNm", item.userNm);
  window.$cookies.set("userTokn", item.userTokn);
  console.log("getToken Cookie  ::" + window.$cookies.get("userTokn"));
};

export const storeLoginUserInfo = () => {
  console.log("setToken store");
  store.commit("setLoginUserId", window.$cookies.get("userId"));
  store.commit("setLoginUserNm", window.$cookies.get("userNm"));
  store.commit("setLoginAccToken", window.$cookies.get("userTokn"));
};

export const clearCookiesLoginUserInfo = () => {
  window.$cookies.remove("isNewUser");
  window.$cookies.remove("userId");
  window.$cookies.remove("userNm");
  window.$cookies.remove("userTokn");

  store.commit("setLoginUserId", "");
  store.commit("setLoginUserNm", "");
  store.commit("setLoginAccToken", "");
};



/**
 * 토큰 확인 
 */
export const checkToken = () => {

  var rtnDt = "";
  console.log("checkToken LoginCheck ::: ");
  console.log(window.$cookies.get("userTokn"));
  if ("" == window.$cookies.get("userTokn") || null == window.$cookies.get("userTokn")) {
    //store 에 존재하는지 채크
    console.log("No Token ::: " );
    return false;
  } else {
    console.log("Having Token ::: " );
    return true;
  }
};


/**
 * 공통 스낵바 표시
 * @param {*} type //파일타입
 * @param {*} base64 //base64 String
 * @param {*} filename //파일명
 */
export const dataURLtoFile =(type, base64, filename) => {

  if(!type.includes("data:")){
    type = "data:" + type;
  }
  
  var mime = type.match(/:(.*?);/)[1],
      bstr = atob(base64), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
};


/**
 * 공통 스낵바 표시
 * @param {*} msg //내용
 * @param {*} bgcolor //바탕색 (생략시 primary)
 */
export const openSnackbar = (msg, bgcolor) => {
  console.log("공통 스낵바 열기");
  store.commit("setSnackbarOpen", true);
  store.commit("setSnackbarMsg", msg);
  console.log(store.getters.snackbarOpen);
  if (typeof bgcolor != "undefined" && bgcolor.length > 0) {
    store.commit("setSnackbarColor", bgcolor);
  }
};

/**
 * 공통 alert표시 (상세내용 없음)
 * @param {*} title //제목
 * @param {*} msg //메세지
 */
export const openAlertDiaolog = (title, msg) => {
  console.log("공통 알림 열기");
  store.commit("setAlertTitle", title);
  store.commit("setAlertMsg", msg);
  store.commit("setAlertDetail", "");
  store.commit("setAlertDialog", true);
};

/**
 * 공통 alert표시 (상세내용 포함)
 * @param {*} title //제목
 * @param {*} msg //메세지
 * @param {*} detail //상세메세지
 */
export const openAlertDiaologWithDetail = (title, msg, detail) => {
  store.commit("setAlertDialog", true);
  store.commit("setAlertTitle", title);
  store.commit("setAlertMsg", msg);
  store.commit("setAlertDetail", detail);
};

/**
 * 날짜 포멧 변환
 * @param {*} date //날짜
 * @param {*} formatString //날짜포멧 스트링
 */
export const formatDate = (date, formatString) => {
  //var apiUrl = baseUrl + api + ".app";
  return moment(date).format(formatString);
};

/**
 * 날짜 계산
 * @param {*} date //날짜
 * @param {*} formatString //날짜포멧 스트링
 */
export const calDate = (date, div, num) => {
  //var apiUrl = baseUrl + api + ".app";
  var rtnDt = "";
  if (!moment(date, "YYYY-MM-DD").isValid()) {
    openSnackbar("날짜 형식이 잘못 되었습니다. [" + date + "]", "error");
    return;
  } else {
    if ("Y" == div || "y" == div) {
      rtnDt = moment(date).add(num, "y");
    } else if ("M" == div || "m" == div) {
      rtnDt = moment(date).add(num, "M");
    } else if (("D" == div) | ("d" == div)) {
      rtnDt = moment(date).add(num, "d");
    }

    return moment(rtnDt).format("YYYY-MM-DD");
  }
};

/**
 * 페이지 표시 제목 설정
 * @param {*} pageTitle //페이지 제목
 */
export const setPageTitle = pageTitle => {
  //var apiUrl = baseUrl + api + ".app";
  store.commit("setPageName", pageTitle);
  //alert(store.getters.appCurrentPage);
};

/**
 *  라우터를 이용한 페이지 제목 설정
 */
// export const setPageTitleRoute = () => {
//   //var apiUrl = baseUrl + api + ".app";
//   var pageName = this.$router.currentRoute.name;
//   console.log(pageName);
//   store.commit("setPageName", "");
//   //alert(store.getters.appCurrentPage);
// };
export const setPageTitleRoute = () => {
  //var apiUrl = baseUrl + api + ".app";
  var pageName = router.currentRoute.name;
  var pageTitle = "";
  //console.log(store.getters.menuList);
  if (!store.getters.menuList) return "";
  store.getters.menuList.filter(item =>
    item.children.filter(child =>
      child.menuCd == pageName ? (pageTitle = child.menuNm) : ""
    )
  );
  store.commit("setPageName", pageTitle);
  //alert(store.getters.appCurrentPage);
};

/**
 *
 */
export const getMenuList = async ignoreExistYn => {
  try {
    if (ignoreExistYn == false && store.getters.menuList.length > 0) {
      console.log("menuList exist");
    } else {
      console.log("!!!!!!!!!!!!!!!  loading menu !!!!!!!!!!!!!!!!!!!");

      var params = { adminId: window.$cookies.get("loginUserId") };

      let res = await axiosPost("/admin/auth/srchAuthMenuList", params);

      console.log("$$$$$$$$$$$$$$$$$$$$get Menu$$$$$$$$$$$$$$$$$$$$    ");
      console.log(res);

      store.commit("setMenuList", res.menuList.children);

      store.commit("setHasMenuList", true);

      setPageTitleRoute();
    }
  } catch (error) {
    store.commit("setHasMenuList", false);
    console.log(error);
  }
};

