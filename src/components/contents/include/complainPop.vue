<template>
  <v-dialog v-model="opened" scrollable persistent max-width="500px">
    <v-card>
      <v-card-title class="dialogTitle dialogTitleText--text">
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text >
        <v-form ref="popForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="mt-4">
                <!-- <v-select
                  :items="CODES.MY_PRDT_STAT_CD_ALL"
                  item-text="cdNm"
                  item-value="cdVal"
                  dense
                  label="$t(cmpln.REPORT_TYPE)"
                  placeholder=" "
                  outlined
                  class="ml-4 my-0 pa-0"
                  v-model="cmplDiv"
                ></v-select>      -->
                <v-select
                  :items="reportType"
                  item-text="cdNm"
                  item-value="cdVal"
                  dense
                  :label="$t('cmpln.REPORT_TYPE')"
                  placeholder=" "
                  outlined
                  class="ml-4 my-0 pa-0"
                  v-model="cmplDiv"
                  :rules="cmplTypeRules"
                ></v-select>                     
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-textarea
                  dense
                  outlined
                  placeholder=" "
                  v-model="cmplText"
                  :label="$t('cmpln.REPORT_CONTENT')"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-text>
        <p>{{$t('cmpln.WARNING')}}</p>
        <div class="text--primary">
          {{$t('messages.CMPL_WARNING_1')}}<br>
          {{$t('messages.CMPL_WARNING_2')}}
        </div>
      </v-card-text>

      <v-card-actions class="pt-10">
        <!--
          <v-btn color="btnDelete" text @click="del">삭제</v-btn>
          -->
        <v-spacer></v-spacer>
        <v-btn color="btnClose" text @click="close">{{$t('buttons.CLOSE')}}</v-btn>
        <v-btn color="btnPopSave" text @click="save">{{$t('buttons.SAVE')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";

export default {
  mixins: [baseMixin],
  props: ["open", "postSeq"],
  components: {
    
  },
  data() {
    return {
      //부모창에서 받은 값을 local변수에 넣음
      //opened:this.editdialog,
      //popData:this.popitem
      formTitle: this.$t('cmpln.PAGE_TITLE'),
      //formTitle: "",
      cmplDiv: "",
      cmplText : "",
      reportType : [
        {cdNm:"부적절한 게시물(음란물, 욕설, 잔인함 등)", cdVal:"CPL001"},
        {cdNm:"광고성 게시물", cdVal:"CPL002"},
        {cdNm:"중복 게시물", cdVal:"CPL003"},
        {cdNm:"저작권 위반 게시물", cdVal:"CPL004"}
      ]
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
    close() {
      this.opened = false;
    },
    async save() {
      try {
        if (this.$refs.popForm.validate()) {

          var params = {};
          params.postSeq = this.postSeq;
          params.cmplnTypeCd = this.cmplDiv;
          params.cmplnCtnt = this.cmplText;

          let res = await this.gfn_utils.axiosPost(
            "/v1/P/procCmplnPost.cat",
            params
          );
          console.log(res);
        
          this.$refs.popForm.resetValidation();
          this.gfn_utils.openSnackbar("정상 처리 되었습니다.", "success");
          //parent의 메서드 호출
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
    cmplTypeRules: {
      get: function() {
        return [
          value => this.gfn_rules.required(value),
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
        this.$refs.popForm.resetValidation();
        this.handyAttachments = [];
        this.$emit("update:dialogClose", val);
        //this.closed = newValue;
      }
    }
  }
};
</script>
