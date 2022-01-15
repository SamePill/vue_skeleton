<template>
  <v-app>
    <!--------------------------------------------->
    <!-- floating button -->
    <!--------------------------------------------->
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        color="pink"
        fab
        dark
        fixed
        bottom
        right
        @click="top"
        style="bottom: 96px;"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <template
      v-if="
        this.$route.path.indexOf('/login') >= 0 ||
          this.$route.path == null ||
          this.$route.path == '/'
      "
    >
      <!-- 로그인일 때 사요않함 -->
    </template>
    <template v-else>
      <Appbar />
    </template>

    <!--------------------------------------------->
    <!-- 공지사항 영역  (추후 사용검토)  -->
    <!--------------------------------------------->
    <!--
    <v-system-bar window color="yellow">
      <v-icon>mdi-message</v-icon>
      <span>공지사항 - 긴급작업이 있습니다.</span>
      <v-spacer></v-spacer>
      <v-icon >mdi-close</v-icon>
    </v-system-bar>
    -->

    <!--
    <br><br><br>     
    {{ this.$router.currentRoute }}
    <v-divider />
    {{ $route.path }}
    <v-divider />
    {{ this.$router.currentRoute.name }}
    <v-divider />
    {{ this.$router.currentRoute.meta.title }}
    -->

    <loading />
    <v-main fluid>
      <template
        v-if="
          this.$route.path.indexOf('/login') >= 0 ||
            this.$route.path == null ||
            this.$route.path == '/'
        "
      >
        <!-- 로그인일 때 제외 -->
      </template>
      <!-- 페이지 제목                                -->
      <template v-else>
        <!-- <v-row justify="center"> -->
          <!-- <v-col cols="12" sm="12" md="12" lg="12" xl="12"> -->
            <h1>{{ this.$router.currentRoute.meta.title }}</h1>
          <!-- </v-col> -->
        <!-- </v-row> -->
      </template>
      <transition name="fade" mode="out-in">
        <v-row justify="center" class="mx-4">
          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
            <!--------------------------------------------->
            <!-- router-view (main) -->
            <!--------------------------------------------->
            <router-view />
            <!--------------------------------------------->
            <!-- router-view (main) end -->
            <!--------------------------------------------->
          </v-col>
        </v-row>
      </transition>
      <!-- 공통 다이얼로그 처리 -->
      <CmnDialog />
      <!-- 공통 snackbar -->
      <CmnSnackBar />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Appbar from "@/components/core/Appbar.vue";
// import Navbar from "@/components/core/Navbar.vue";
import Footer from "@/components/core/Footer.vue";
import Loading from "@/components/core/Loading.vue";

export default {
  name: "app",
  metaInfo() {
    return {
      title: this.appTitle
    };
  },
  data: () => ({
    nav: true,
    fab: false,
    alert: true
  }),
  components: {
    Appbar,
    // Navbar,
    Loading,
    Footer
  },
  computed: {
    appTitle() {
      return this.$store.getters.appTitle;
    },
    alertDialog() {
      return this.$store.getters.alertDialog;
    }
  },
  methods: {
    top() {
      this.$vuetify.goTo(0);
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    }
  },
  watch: {}
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
