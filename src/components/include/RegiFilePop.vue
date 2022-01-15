<template>
  <v-dialog v-model="opened" persistent max-width="650px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <!--
    {{procDiv}}
    <br>

  -->

      <v-form ref="inputForm">
        <v-card-text class="mb-n8">
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.prntMenuCd"
                  readonly
                  label="상위메뉴명"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  :rules="sortOrdrRules"
                  v-model="popitem.sortOrdr"
                  label="표시순서"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" md="3" lg="3" xl="3" align-self="center">
                <v-switch
                  class="mt-n3"
                  v-model="popitem.screYn"
                  :disabled="nodecnt > 0 ? true : false"
                  :label="`화면여부: ${popitem.screYn.toString()}`"
                  true-value="Y"
                  false-value="N"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  :rules="menuCdRules"
                  :readonly="procDiv == 'edit' ? true : false"
                  v-model="popitem.menuCd"
                  label="메뉴코드"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  :rules="menuNmRules"
                  v-model="popitem.menuNm"
                  label="메뉴명"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="9" md="9" lg="9" xl="9">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.menuDesc"
                  label="메뉴설명"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" md="3" lg="3" xl="3" align-self="center">
                <v-switch
                  class="mt-n3"
                  v-model="popitem.useYn"
                  :label="`사용여부: ${popitem.useYn.toString()}`"
                  true-value="Y"
                  false-value="N"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-3">
          <v-spacer></v-spacer>
          <v-btn color="btnClose" text @click="close">취소</v-btn>
          <v-btn color="btnPopSave" text @click="save">저장</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
//import * as utils from '@/utils/utils.js'
import baseMixin from "@/utils/baseMixin.js";

export default {
  mixins: [baseMixin],
  props: ["open", "popitem", "nodecnt", "mode"],
  data() {
    return {
      formTitle: "메뉴관리"
      //부모창에서 받은 값을 local변수에 넣음
      //procDiv:this.mode,
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
        // console.log("popData:DATA");
        // console.log(this.popData);
        if (this.$refs.inputForm.validate()) {
          var params = this.popitem;
          console.log("params:::::" + params);
          let res = await this.gfn_utils.axiosPost(
            "/system/modiSubMenu.sys",
            params
          );
          console.log(res);
          this.$refs.inputForm.resetValidation();
          //parent의 메서드 호출
          this.$emit("saved");
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
      console.log("popItem:props");
      console.log(this.popItem);
      return this.popItem;
    }
    */

    menuCdRules: {
      get: function() {
        return [
          this.gfn_rules.required,
          //  ,value =>  this.gfn_rules.minLength(value,4)
          value => this.gfn_rules.maxLength(value, 20)
        ];
      }
    },
    menuNmRules: {
      get: function() {
        return [
          this.gfn_rules.required,
          //  ,value =>  this.gfn_rules.minLength(value,4)
          value => this.gfn_rules.maxLength(value, 50)
        ];
      }
    },
    sortOrdrRules: {
      get: function() {
        return [
          this.gfn_rules.required,
          value => this.gfn_rules.maxLength(value, 5),
          value => this.gfn_rules.number(value)
        ];
      }
    },
    menuDescRules: {
      get: function() {
        return [value => this.gfn_rules.maxLength(value, 100)];
      }
    },
    opened: {
      get: function() {
        return this.open;
      },
      set: function(val) {
        console.log(val);
        this.$refs.inputForm.resetValidation();
        this.$emit("update:dialogClose", val);
        // this.open=val;
      }
    },
    procDiv: {
      get: function() {
        return this.mode;
      }
    }
  }
};
</script>
