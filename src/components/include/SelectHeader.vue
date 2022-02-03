<template>
  <v-dialog v-model="opened" scrollable persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
        <v-card-text >
          <v-form ref="inputForm">
            <v-container>
              <v-data-table
                v-model="selected"
                :headers="colText"
                :items="editHeaders"
                item-key="value"
                show-select
                hide-default-footer
                disable-pagination
              />
            </v-container>
          </v-form>                 
        </v-card-text>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn color="btnClose" text @click="close">취소</v-btn>
          <v-btn color="btnPopSave" text @click="save">저장</v-btn>
        </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
//import * as utils from '@/utils/utils.js'

export default {
  mixins: [],
  props: ["open", "headers", "popitem", "nodecnt", "mode"],
  data() {
    return {
      formTitle: "표시컬럼",
      colText: [{ text: "항목명", align: "left", value: "text", width: "200" }],
      tmpResult: []
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
    save() {
      // console.log("Result");
      // console.log(this.tmpResult);
      let res = [];
      res = Object.assign(this.tmpResult);

      this.headers.forEach(function(el) {
        if (!el.fix) {
          var found = res.find(function(sel) {
            if (el.value == sel.value) {
              // console.log("match true");
              return true;
            }
          });
          // console.log("found::::::"+found);
          if (found == "undefined" || found == null) {
            el.show = false;
          } else {
            el.show = true;
          }
        } else {
          // console.log("FIXED");
          true;
        }
      });
      //this.$emit('update:updateHeaders', this.selected);
      this.opened = false;
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.headers.filter(function(el) {
          return el.show == true;
        });
      },
      set: function(val) {
        // this.tmpResult = val;
        this.tmpResult = Object.assign(val);
        // console.log(this.tmpResult);
      }
    },
    editHeaders: {
      get: function() {
        return this.headers.filter(function(el) {
          return el.fix != true;
        });
      },
      set: function() {
        // console.log(val);
      }
    },

    opened: {
      get: function() {
        return this.open;
      },
      set: function(val) {
        // console.log(val);

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
