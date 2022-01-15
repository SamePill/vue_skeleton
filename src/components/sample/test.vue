<template>
  <v-container fluid>
    <v-row>
      <v-btn dark color="red darken-2" @click="snackbar = true">
        Open Snackbar
      </v-btn>
      <v-snackbar v-model="snackbar" :multi-line="multiLine">
        {{ text }}
        <v-btn color="red" @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-row>
    <v-row>
      <v-btn text @click="test()">
        SnackBartest
      </v-btn>
    </v-row>
    <v-row>
      <v-btn text @click="test2()">
        Dialogtest
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";
//import CmnSnackBar from "@/components/include/CmnSnackBar.vue"

export default {
  mixins: [baseMixin],
  name: "PageName",
  props: {
    msg: String
  },
  components: {
    //CmnSnackBar
  },
  mounted: function() {},
  created: function() {
    //화면 로드 완료시 호출
  },
  data() {
    return {
      //조회값
      combodata: [],
      multiLine: true,
      snackbar: false,
      text: "I'm a multi-line snackbar."
    };
  },
  methods: {
    test() {
      this.gfn_utils.openSnackbar(
        "먼저 그룹코드를 선택하여야 합니다.",
        "error"
      );
    },
    test2() {
      this.gfn_utils.openAlertDiaolog("오류", "코드를 선택하세요.");
    }
  }
};
</script>
