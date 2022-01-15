<template>
  <v-container>
    <v-row align="center" justify="center" style="height: 700px;">
      <v-card tile width="450px">
        <v-card-title class="dialogTitle dialogTitleText--text">
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-actions>
          <v-row align="center"  justify="center"  style="height: 60px;">
              <GoogleLogin :params="gParams" :renderParams="gRenderParams" :logoutButton="gLogout" :onSuccess="gOnSuccess" :onFailure="gOnFailure"></GoogleLogin>            
          </v-row>
        </v-card-actions>
        
        <v-card-actions>
          <v-row align="center" justify="center" style="height: 60px;">
              <v-facebook-login :app-id="fAppId" :login_options="fLoginOptions" :version="fVersion"></v-facebook-login>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row>
      <v-btn color="black" text 
        @click="signOut"
        >
        {{$t('buttons.MORE')}}
      </v-btn>
    </v-row>

  </v-container>
</template>



<script>
import GoogleLogin from 'vue-google-login';
import VFacebookLogin from 'vue-facebook-login-component'
import * as gfn_utils from "@/utils/gfnUtils.js";
import * as gfn_rules from "@/utils/gfnRules.js";

export default {
  async beforeCreate() {
    try {
      // await this.gfn_utils.axiosPost(
      //   "/admin/login/isValid",
      //   this.loginInfo,
      //   false,
      //   false
      // );

      // location.href = "/Street";
    } catch (e) {
      this.isVisible = true;
    }
  },
  createed: function() {

  },
  mounted: function() {
  },
  components: {
    GoogleLogin,
    VFacebookLogin
  },

  data: () => ({
    // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
    gParams: {
        client_id: "601444116522-oem8akr8scfnnqfjlm3sn9o21qjkb3oh.apps.googleusercontent.com"
    },
    gLogout : false,
    // only needed if you want to render the button with the google ui
    gRenderParams: {
        width: 250,
        height: 50,
        longtitle: true
    },

    fAppId : "4431490610233612",
    fLoginOptions : { scope: 'email' },
    fVersion : "v11.0",

    isVisible: false,
    rulesUserId: [
      value => gfn_rules.required(value),
      value => gfn_rules.minLength(value, 3),
      value => gfn_rules.maxLength(value, 50)
    ],
    rulesPwd: [value => gfn_rules.required(value)],
    loginInfo: {},
    loginUserInfo: {}
  }),
  methods: {
    gOnSuccess(googleUser) {
      console.log("######################################################");
      console.log(googleUser);
      // This only gets the user information: id, name, imageUrl and email
      console.log("------------------------------------------------------");
      console.log(googleUser.getBasicProfile());
      console.log("------------------------------------------------------");
    },
    gOnFailure(googleUser){
      console.log(googleUser);
    },    
    async login() {
      if (!this.$refs.formEdit.validate()) {
        return false;
      }
      if (window.$cookies.isKey("clientId")) {
        this.loginInfo.clientId = window.$cookies.get("clientId");
      }
      let res = await gfn_utils.axiosPost("/admin/login/login", this.loginInfo);
      this.loginUserInfo = res.adminInfo;
      console.log(this.loginUserInfo);

      // 쿠키에 로그인 사용자 정보 세팅
      gfn_utils.setCookiesLoginUserInfo(this.loginUserInfo);
      // 쿠키의 로그인 사용자 정보를 가져와서 store에 넣기
      gfn_utils.storeLoginUserInfo();

      console.log("cookies.keys ===> " + window.$cookies.keys());

      await gfn_utils.getMenuList(true);

      this.$router.replace({ name: "Street" });

      //this.gfn_utils.openSnackbar("저장되었습니다.", "success");
    }
  }
};
</script>
<style>
.signin-button {
  width: 210px;
  height: 40px;
}
</style>
