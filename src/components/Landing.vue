<template>
  <v-container fluid>
    <br />
  </v-container>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";

export default {
  mixins: [baseMixin],
  name: "Landing",
  data: () => ({
    loginInfo: {}
  }),
  created: async function() {
    console.log("#####################  Landing..........");

    this.$router.replace({
      name: "Gallery",
      params: {
        menuNm: "Gallery",
        menuCd: "Gallery",
        icon: "mdi-home",
        notadd: false
      }
    });

    // try {
    //   //로그인 체크
    //   await this.gfn_utils.axiosPost(
    //     "/admin/login/isValid",
    //     this.loginInfo,
    //     false,
    //     false
    //   );

    //   console.log("Login 확인완료!!!!!!");
    //   this.$router.replace({ name: "Street" });
    // } catch (e) {
    //   // console.log(e);
    //   this.$router.replace({ name: "Login" });
    //   //this.$router.replace({name: 'Street'});
    // }
  }
};
</script>
