<template>
  <v-container>
    <v-row align="center" justify="center" style="height: 700px;">
      <v-card tile width="450px">
        <v-card-title class="dialogTitle dialogTitleText--text">
          <span class="headline">0000</span>
        </v-card-title>
        <v-card-actions>
          <v-row align="center"  justify="center"  style="height: 60px;">
            <div id="g_id_onload"
              data-client_id="00000000-aaaaaa.apps.googleusercontent.com"
              data-auto_prompt="false"
              @data-callback="handleCredentialResponse"
              >
            </div>
            <v-col align-self="center">
              <div class="g_id_signin" 
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions>
          <v-row align="center"  style="height: 60px;">
            <div 
              class="fb-login-button" 
              data-max-rows="1"
              data-size="large" 
              data-button-type="login_with"
              data-layout="default" 
              data-width=""
              data-auto-logout-link="true" 
              data-use-continue-as="true"
              data-scope="public_profile,email"
              onlogin="checkLoginState();">
            </div> 
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



<script src="https://accounts.google.com/gsi/client" async defer></script>
<script>
  function handleCredentialResponse(credential) {
      console.log("credential: " + credential); // Don't send this directly to your server!
  }
  //Google Login
    // function handleCredentialResponse(response) {
    //   console.log("Encoded JWT ID token: " + response.credential);
    // }
    // window.onload = function () {
    //   google.accounts.id.initialize({
    //     client_id: "601444116522-oem8akr8scfnnqfjlm3sn9o21qjkb3oh.apps.googleusercontent.com",
    //     callback: handleCredentialResponse
    //   });
    //   google.accounts.id.renderButton(
    //     document.getElementById("buttonDiv"),
    //     { theme: "outline", size: "large" }  // customization attributes
    //   );
    //   google.accounts.id.prompt(); // also display the One Tap dialog
    // }

</script>
<script>
  //FB Login
  FB.getLoginStatus(function(response) {
    // Called after the JS SDK has been initialized.
    statusChangeCallback(response); // Returns the login status.
  });
  
  function checkLoginState() {
    // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {
      // See the onlogin handler
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    // Called with the results from FB.getLoginStatus().
    console.log("statusChangeCallback");
    console.log(response); // The current login status of the person.
    if (response.status === "connected") {
      // Logged into your webpage and Facebook.
      testAPI();
    } else {
      // Not logged into your webpage or we are unable to tell.
      document.getElementById("status").innerHTML =
        "Please log " + "into this webpage.";
    }
  }

  function testAPI() {
    // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me", function(response) {
      console.log("Successful login for: " + response.name);
      document.getElementById("status").innerHTML =
        "Thanks for logging in, " + response.name + "!";
    });
  }


//return
// {
//     status: 'connected',
//     authResponse: {
//         accessToken: '...',
//         expiresIn:'...',
//         signedRequest:'...',
//         userID:'...'
//     }
// }

</script>

<script>
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

    } catch (e) {
      this.isVisible = true;
    }
  },
  createed: function() {

  },
  mounted: function() {
  },
  components: {
    
  },

  data: () => ({
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
    handleCredentialResponse(credential) {
      alert("handleCredentialResponse");
      console.log("credential: " + credential); // Don't send this directly to your server!
    },
    
    samefeelLogin(div, authInfo){
      console.log(div);
    },
    onSignIn(googleUser) {
      alert("onSignIn");
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      var access_token = googleUser.getAuthResponse().access_token;
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    //Google Login API End

    //Google Login API 2 Start
    // googleLoginBtn(){
    //    window.gapi.signin2.render('my-signin2', 
    //    { scope: 'profile email',
    //      width: 240,
    //      height: 50,
    //      longtitle: true, 
    //      theme: 'dark', 
    //      onsuccess: this.onSuccess, 
    //      onfailure: this.onFailure, });
    //      setTimeout(function () { 
    //        //display Node이기 때문에 시간차를 두고 코드로 클릭을 한다. 
    //        document.querySelector('.abcRioButton').click(); }, 1500) 
    // }, 
    // //구글 로그인 이후 실행되는 콜백함수(성공) 
    // async onSuccess(googleUser) { 
    //   const user_join_type = "g" ;
    //   const googleEmail = googleUser.getBasicProfile().pu;
    //   console.log(googleEmail);
    //   // const res = await fetch('https://123.121.123.1/api/sns_signup_check', {
    //   //    method: "POST", headers: { "Content-Type": "application/json", },
    //   //    body: JSON.stringify({ email: `${googleEmail}`, user_join_type: user_join_type }), }) 
    //   //    const data = await res.json(); this.checkSnSLogin(data, googleEmail,user_join_type); 
    // }, //구글 로그인 콜백함수 (실패) 
    // onFailure(error) { 
    //   // eslint-disable-next-line 
    //   console.log(error); 
    // },
    //Google Login API 2 End

    
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
