import Vue from "vue";
import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";
//import Vuetify from "vuetify/lib/framework";
//import colors from "vuetify/es5/util/colors"
//import "@mdi/font/css/materialdesignicons.css"
// import { preset } from "vue-cli-plugin-vuetify-preset-rally/preset"

Vue.use(Vuetify);

export default new Vuetify({
  /* veu base color variants
    primary - Primary
    secondary - Secondary
    success - Success
    warning - Warning
    danger - Danger
    info - Info
    light - Light
    dark - Dark
  */
  // preset,
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: "#1EB980",
        secondary: "#045D56",
        tertiary: "#FF6859",
        quaternary: "#FFCF44",
        quinary: "#B15DFF",
        senary: "#72DEFF",
        /* custom btn color*/

        btnSave: "#1EB980",
        btnSearch: "#1EB980",
        btnPopSave: "#1EB980",
        btnPopSearch: "#1EB980",
        btnOK: "#1EB980",
        btnClose: "#1EB980",
        btnOpenPop: "#1EB980",
        btnDel: "#1EB980",
        btnXls: "#191970",

        /* dialog title color */
        dialogTitle: "#607d8b",
        dialogTitleText: "#FFFFFF",
        dialogSubTitle: "#708090",
        dialogSubTitleText: "#FFFFFF"
      },
      light: {
        primary: "#1EB980",
        secondary: "#045D56",
        tertiary: "#FF6859",
        quaternary: "#FFCF44",
        quinary: "#B15DFF",
        senary: "#72DEFF",
        /* custom btn color*/

        btnSave: "#1EB980",
        btnSearch: "#1EB980",
        btnPopSave: "#1EB980",
        btnPopSearch: "#1EB980",
        btnOK: "#1EB980",
        btnClose: "#1EB980",
        btnOpenPop: "#1EB980",
        btnDel: "#1EB980",
        btnXls: "#191970",

        /* dialog title color */
        dialogTitle: "#607d8b",
        dialogTitleText: "#FFFFFF",
        dialogSubTitle: "#708090",
        dialogSubTitleText: "#FFFFFF"
      }
    }
  }
  //iconfont: "mdi"
});
