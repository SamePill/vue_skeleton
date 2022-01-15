import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import VueCookies from "vue-cookies";
import vuetify from "@/plugins/vuetify";
import i18n from '@/plugins/i18n';
import '@/plugins/gtag';
import App from "@/App.vue";
import router from "@/router";
import { store } from "@/store";
import "babel-polyfill";


// import axios from 'axios'; // Axios 임포트

//token 생성 :  http://localhost:28080/swagger-ui.html

const requireComponent = require.context(
  // The relative path of the components folder
  "./components/include",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  console.log(componentName);
  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

new Vue({
  vuetify,
  router,
  store,
  VueCookies,
  i18n,
  render: h => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    // if (store.getters.isTokenSet) {
    //   store.dispatch('autoLogin')
    // }
  }
}).$mount("#app");
