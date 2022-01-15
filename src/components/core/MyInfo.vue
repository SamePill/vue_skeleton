<template>
  <v-dialog v-model="opened" scrollable persistent max-width="800px">
    <v-card>
      <v-card-title class="dialogTitle dialogTitleText--text">
        <span class="headline">{{ formtitle }}</span>
      </v-card-title>
      <v-card-text class="mb-n8">
        <v-form ref="popForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.adminId"
                  label="관리자 ID"
                  :readonly="mode == 'edit' ? true : false"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="oldPass"
                  label="기존 패스워드"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  :rules="passRule"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="newPass1"
                  label="신규 패스워드"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="newPass2"
                  label="패스워드 확인"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.userNm"
                  label="관리자명"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.nick"
                  label="별명"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.emal"
                  label="이메일"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.hp"
                  label="휴대전화"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pt-10">
        <!--
          <v-btn color="btnDelete" text @click="del">삭제</v-btn>
          -->
        <v-spacer></v-spacer>
        <v-btn color="btnClose" text @click="close">취소</v-btn>
        <v-btn color="btnPopSave" text @click="save">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";

export default {
  mixins: [baseMixin],
  props: ["open", "popitem", "mode"],
  data() {
    return {
      //부모창에서 받은 값을 local변수에 넣음
      //opened:this.editdialog,
      //popData:this.popitem
      formtitle: "내 정보 관리",
      show1: false,

      oldPass: "",
      newPass1: "",
      newPass2: ""
    };
  },
  components: {},
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
    close() {
      this.opened = false;
    },
    async save() {
      try {
        if (this.$refs.popForm.validate()) {
          if (this.oldPass == null) {
            this.gfn_utils.openSnackbar("패스워드를 입력해 주세요.", "warning");
            return;
          }
          if (this.newPass1 != this.newPass2) {
            this.gfn_utils.openSnackbar(
              "신규 패스워드가 확인패스워드와 일치하지 않습니다.",
              "warning"
            );
            return;
          }

          // console.log("popData:DATA");
          // console.log(this.popData);
          var params = this.popitem;
          params.oldPass = this.oldPass;
          params.newPas1 = this.newPass1;
          params.newPass2 = this.newPass2;

          this.popitem.logoFileSeq = 0;

          let res = await this.gfn_utils.axiosPost(
            "/admin/common/saveAdminInfo",
            params
          );
          console.log(res);

          this.$refs.popForm.resetValidation();

          //parent의 메서드 호출
          this.gfn_utils.openSnackbar("정상 처리 되었습니다.", "success");
          this.$emit("saved");
          this.opened = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
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
    passRule: {
      get: function() {
        return [
          value => this.gfn_rules.required(value),
          value => this.gfn_rules.maxLength(value, 15)
        ];
      }
    },

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
        this.oldPass = "";
        this.newPass2 = "";
        this.newPass1 = "";
        this.$refs.popForm.resetValidation();
        this.$emit("update:dialogClose", val);
        //this.closed = newValue;
      }
    }
  }
};
</script>
