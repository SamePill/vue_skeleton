<template>
  <v-dialog v-model="opened" scrollable persistent max-width="900px">
    <v-card>
      <v-card-title class="dialogTitle dialogTitleText--text">
        <span class="headline"> LogIn</span>
      </v-card-title>
      <v-card-text class="mb-n8">
        <v-container>
          <v-row align="center" justify="center" style="height: 700px;">
            <v-card tile width="450px">
              <v-card-title class="dialogTitle dialogTitleText--text">
                <span class="headline">Log In</span>
              </v-card-title>
              <v-card-actions>
                <v-row align="center"  justify="center"  style="height: 60px;">
                  <v-col align-self="center">
                    <div id="g_id_onload"
                      data-client_id="601444116522-oem8akr8scfnnqfjlm3sn9o21qjkb3oh.apps.googleusercontent.com"
                      data-auto_prompt="false"
                      data-callback="onSignCallBack">
                    </div>
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
        </v-container>
      </v-card-text>
      <v-card-actions class="pt-10">
        <v-spacer></v-spacer>
        <v-btn color="btnPopSave" text @click="close(false)">임시 사용자로 계속하기</v-btn>
        <v-btn color="btnPopSave" text @click="close(true)">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
//Google Login

function onSignCallBack(credential) {
  samefeelLogin("google", credential);
  console.log("credential: " + credential); // Don't send this directly to your server!
}

function samefeelLogin(div, authInfo){
  console.log(div);
}
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}
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
import baseMixin from "@/utils/baseMixin.js";
import handyUploader from "handy-uploader/src/components/handyUploader";

export default {
  mixins: [baseMixin],
  props: ["open", "popitem", "params"],
  components: {
    handyUploader
  },
  data() {
    return {
      //부모창에서 받은 값을 local변수에 넣음
      //opened:this.editdialog,
      //popData:this.popitem
      formtitle: "Image Upload",
      handyAttachments: [],
      closeBreak:false
    };
  },
  watch: {
    //child에서 값이 변할때 parents에 값 전달처리
    // opened : function(val){
    //   if(val == false){
    //     console.log("colsed!!!!!");
    //     this.$emit('update:getclose', val)
    //   }else{
    //     console.log("open!!!!!");
    //   }
    // }
  },
  methods: {
    //연산처리
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
    },
    close(closeBreak) {
      this.closeBreak= closeBreak;
      this.opened = false;
    },
  },
  computed: {
    /*
    //부모에서 받은 데이터를 data:에서 처리 하거나 computed:로 처리
    popData2: function () {
      console.log("popitem:props");
      console.log(this.popitem);
      return this.popitem;
    }
    */

    editMode: function() {
      if (this.mode == "edit") {
        return true;
      } else {
        return false;
      }
    },
    opened: {
      get: function() {
        return this.open;
      },
      set: function(val) {
        this.$emit("update:dialogClose", val);
        console.log(this.params);
        if(!this.closeBreak){
          this.$emit("saved", this.params);
        }
        //this.closed = newValue;
      }
    }
  }
};
</script>
