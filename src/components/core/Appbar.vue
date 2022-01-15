<template>
  <div>
    <!--
    <v-navigation-drawer dark v-model="sidebar" app disable-resize-watcher>
    -->
    <v-navigation-drawer
      dark
      v-model="sidebar"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list>
        <v-list-item class="hidden-lg-and-up">
          <v-list-item-content>{{ appTitle }} </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <!-- 메뉴 고정 처리 -->
        <!--
        <v-list-group no-action v-for="(menu, index) in menuItems_manual" :key="index">
          <v-list-item slot="activator">
            <v-list-item-title>{{ menu.menuNm }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in menu.children"
            :key="index"
            :to="{ name: item.menuCd }"
            exact
          >
            <v-list-item-content class="d-inline mt-3">
              {{ item.menuNm }}
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        -->
        <!-- 메뉴 가변 처리 -->
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{
            name: item.menuCd,
            params: { iam: item.menuCd, notadd: item.notadd }
          }"
          exact
        >
          <v-list-item-content class="d-inline mt-3">
            {{ item.menuNm }}
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-group no-action v-for="(menu, index) in menuItems" :key="index">
          
          <v-list-item :to="{ name: menu.menuCd }" :key="index" exact>
            <v-list-item-title>{{ menu.menuNm }}</v-list-item-title>
          </v-list-item>
          
          
         
        </v-list-group> -->
      </v-list>

      <v-list-group prepend-icon="mdi-account-circle">
        <!-- <v-list-item slot="activator" >
          <v-list-item-title>
            <v-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-list-item-title>
        </v-list-item> -->
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>
        <v-list-item
          v-for="(item, index) in profileMenu"
          :key="index"
          exact
          @click="profileClick(item.menuCd)"
        >
          <v-list-item-content class="d-inline mt-3">
            {{ item.menuNm }}
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
    <!-- 측면 메뉴버튼 end-->
    <!--------------------------------------------------------------------------------------------->

    <!-- 상단메뉴버튼 (테블릿 또는 PC) -->
    <v-app-bar
      dark
      app
      :hide-on-scroll="false"
      elevation="5"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <!-- <v-toolbar app> -->
      <v-app-bar-nav-icon @click="sidebar = !sidebar">
        <!--
          class="hidden-lg-and-up"
        -->
      </v-app-bar-nav-icon>

      <v-toolbar-title class="headline text-uppercase ml-0">
        <div>
          <!-- <div v-resize-text> -->
          <router-link
            :to="{ name: 'Home' }"
            tag="span"
            style="cursor: pointer"
            >{{ appTitle }} </router-link
          > 
        </div>
        <!-- <h5>{{ this.$router.currentRoute.meta.title }}</h5> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <LocaleChanger/>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- 가변메뉴 -->
        <!--        
        <v-menu offset-y v-for="(menu, index) in menuItems" :key="index">
          <template v-slot:activator="{ on }">
            <v-btn slot="activator" text v-on="on">
              &nbsp; {{ menu.menuNm }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in menu.children"
              :key="item.menuCd"
              :to="{ name: item.menuCd }"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.menuNm }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        -->
        <!-- 사용자 프로파일 -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn slot="activator" text v-on="on" >
              <v-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              active-class="white--text"
              v-for="item in profileMenu"
              :key="item.menuCd"
              :value="selMenu"
              @click="profileClick(item.menuCd)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.menuNm }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <!-- 상단메뉴 end -->
    <MyInfo
      :open="dialogOpen"
      :popitem="popItem"
      :dialogClose.sync="dialogOpen"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as gfn_utils from "@/utils/gfnUtils.js";
import MyInfo from "@/components/core/MyInfo.vue";
import LocaleChanger from '@/components/core/LocaleChanger'

// import ResizeText from "vue-resize-text";

export default {
  name: "Appbar",
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,

      meta: [
        { name: "msapplication-TileColor", content: "#ffc40d" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "apple-mobile-web-app-title",
          content: this.$store.getters.appTitle
        },
        { name: "application-name", content: this.$store.getters.appTitle }
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", color: "#5bbad5", href: "/safari-pinned-tab.svg" },
        { rel: "favicon", href: "/favicon.ico" }
      ]
    };
  },
  components: {
    LocaleChanger,
    MyInfo
  },
  directives: {
    //ResizeText
  },


  data() {
    return {
      dialogOpen: false,
      popItem: {},
      selMenu: "",
      sidebar: false,
      //sidebarShow: true,
      menuItems: [
        {
          menuNm: "Sample",
          menuCd: "Sample",
          icon: "mdi-home",
          notadd: false
        },
        {
          menuNm: "Gallery",
          menuCd: "Gallery",
          icon: "mdi-home",
          notadd: false
        },
        // {
        //   menuNm: "Like",
        //   menuCd: "Like",
        //   icon: "mdi-home",
        //   notadd: true
        // },
        // {
        //   menuNm: "My Gallery",
        //   menuCd: "MyGallery",
        //   icon: "mdi-home",
        //   notadd: true
        // }
      ]
    };
  },
  computed: {
    // menuItems() {
    //   //스토어에서 메뉴정보 가저옴
    //    return  this.$store.getters.menuList

    // },
    ...mapGetters(["appTitle", "isTokenSet", "user"]),

    profileMenu() {
      return [
        {
          menuCd: "Login",
          menuNm: this.$t("user.LOGIN"),
          click: "logIn"
        }
      ];
    },
    profileMenuLogined() {
      return [
        {
          menuCd: "prflMng",
          menuNm: "내정보",
          click: "prflMng"
        },
        {
          menuCd: "logOut",
          menuNm: this.$t("user.LOGOUT"),
          click: "logOut"
        }
      ];
    }
    // admin() {
    //   return this.user !== null ? this.user.role === "admin" : false;
    // }
  },
  methods: {
    async userLogout() {
      //this.$store.dispatch('userLogout')
      gfn_utils.clearCookiesLoginUserInfo();
      this.$router.replace({ name: "Login" });
    },
    async selectUserInfo() {
      this.popItem = {};
      var params = {};

      console.log(params);
      let res = await gfn_utils.axiosPost(
        "/admin/common/getLoginAdminInfo",
        params
      );

      this.popItem = Object.assign({}, res.adminInfo);
    },
    profileClick(val1) {
      if (val1 == "prflMng") {
        console.log("prflMng");
        this.selectUserInfo();
        this.dialogOpen = true;
      } else if (val1 == "logOut") {
        console.log("logout");
        //로그아웃 팜업
        let rs = confirm("로그아웃 하시겠습니까?");
        if (rs) {
          //로그아웃 처리 호출 및 로그인페이지로 이동
          this.userLogout();
          //this.$router.replace({name: 'login'});
        } else {
          return;
        }
      } else {
        this.$router.replace({ name: "Login" });
      }
    }
  }
};
</script>
