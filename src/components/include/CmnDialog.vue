<template>
  <v-dialog v-model="dialogOpen" scrollable persistent max-width="450">
    <v-card>
      <v-card-title class="dialogTitle dialogTitleText--text">{{
        alertTitle
      }}</v-card-title>

      <!--
        {{popitem}}
        <br>
        {{procDiv}}
        -->

      <v-card-text class="subline font-weight-bold mt-3">{{
        alertMsg
      }}</v-card-text>
      <v-expansion-panels
        v-if="alertMsgDetail.length > 0 && openAlertDiaolog"
        flat
      >
        <v-expansion-panel>
          <v-expansion-panel-header>상세 내용</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ alertMsgDetail }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn ref="btnclose0" color="green darken-1" text @click="close"
          >확인</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { store } from "@/store";

export default {
  props: [],
  data() {
    return {
      formTitle: "승인 단계 코드 관리"
      //부모창에서 받은 값을 local변수에 넣음
    };
  },
  watch: {},
  methods: {
    //연산처리
    close() {
      store.commit("setAlertDialog", false);

      store.commit("setAlertTitle", "");
      store.commit("setAlertMsg", "");
      store.commit("setAlertDetail", "");

      this.$emit("close");
    }
  },
  computed: {
    dialogOpen: {
      // getter
      get: function() {
        // this.$nextTick(() => this.$refs.btnclose0.$el.focus().focus());
        return this.$store.getters.alertDialog;
      },
      // setter
      set: function(newValue) {
        store.commit("setAlertDialog", newValue);

        store.commit("setAlertTitle", "");
        store.commit("setAlertMsg", "");
        store.commit("setAlertDetail", "");
      }
    },
    alertTitle() {
      return this.$store.getters.alertTitle;
    },
    alertMsg() {
      return this.$store.getters.alertMsg;
    },
    alertMsgDetail() {
      return this.$store.getters.alertDetail;
    },
    opened: {
      get: function() {
        return this.open;
      },
      set: function(val) {
        console.log(val);
        this.$emit("update:confirmClose", val);
        // this.open=val;
      }
    }
  }
};
</script>
