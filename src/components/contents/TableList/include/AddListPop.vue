<template>
  <v-dialog v-model="opened" scrollable persistent max-width="1024px">
    <v-card>
      <v-card-title class="dialogTitle dialogTitleText--text">
        <span class="headline">{{ formtitle }}</span>
      </v-card-title>
      <v-card-text class="mb-n8">
        <v-form ref="popForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.allcNm"
                  :rules="allcNmRule"
                  label="제휴사명"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.allcNmEng"
                  label="영문명"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.bizNm"
                  :rules="bizNmRule"
                  label="사업자명"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.bizRegNo"
                  :rules="bizRegNoRule"
                  label="사업자등록번호"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.ceoNm"
                  :rules="ceoNmRule"
                  label="대표자명"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="2" md="2" lg="2" xl="2" class="py-2">
                <v-row justify="center">
                  <v-img
                    height="120px"
                    width="100px"
                    :src="logoinfo.fileUrl"
                    aspect-ratio="2"
                    contain
                  ></v-img>
                  <br><br>
                  <h5>{{logoinfo.physNm}}</h5>
                </v-row>
              </v-col>
              <v-col cols="12" sm="10" md="10" lg="10" xl="10" class="py-2">
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
                    <v-file-input
                      label="이미지 파일"
                      outlined
                      dense
                      show-size
                      clearable
                      v-model="physFile"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="8" md="8" lg="8" xl="8" class="py-2">
                    <v-text-field
                      dense
                      outlined
                      placeholder=" "
                      v-model="popitem.tel"
                      :rules="telRule"
                      label="전화번호"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="py-2">
                    <v-switch
                      class="mt-n3"
                      v-model="popitem.arYn"
                      :label="`AR여부: ${popitem.arYn.toString()}`"
                      true-value="Y"
                      false-value="N"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="py-2">
                    <v-switch
                      class="mt-n3"
                      v-model="popitem.asYn"
                      :label="`AS여부: ${popitem.asYn.toString()}`"
                      true-value="Y"
                      false-value="N"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="py-2">
                    <v-switch
                      class="mt-n3"
                      v-model="popitem.asctReprYn"
                      :label="`AS센터`"
                      true-value="Y"
                      false-value="N"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="py-2">
                    <v-switch
                      class="mt-n3"
                      v-model="popitem.rpmnReprYn"
                      :label="`기사AS`"
                      true-value="Y"
                      false-value="N"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="py-2">
                    <v-switch
                      class="mt-n3"
                      v-model="popitem.sendReprYn"
                      :label="`택배AS`"
                      true-value="Y"
                      false-value="N"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.tag"
                  :rules="tagRule"
                  label="태그"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="2" md="2" lg="2" xl="2" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  readonly
                  color="orange"
                  v-model="popitem.shopZip"
                  label="우편번호"
                ></v-text-field>
              </v-col>              
              <v-col cols="12" sm="1" md="1" lg="1" xl="1" class="py-3">
                <!--
                <v-btn color="btnClose" text outlined @click="srchAddr">검색</v-btn>                
                -->
                <v-icon
                  medium
                  class="mr-2"
                  color="btnOpenPop"
                  @click="srchAddr()"
                >
                  mdi-magnify
                </v-icon>                
              </v-col>              
              <v-col cols="12" sm="9" md="9" lg="9" xl="9" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  readonly
                  color="orange"
                  v-model="popitem.shopAddr"
                  label="주소"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="popitem.shopAddrDtl"
                  label="상세주소"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  readonly
                  color="orange"
                  v-model="popitem.shopLat"
                  label="위도"
                ></v-text-field>                
              </v-col>
              <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  readonly
                  color="orange"
                  v-model="popitem.shopLon"
                  label="경도"
                ></v-text-field>                
              </v-col> -->
            </v-row>
            <v-divider />


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
    <!-- <SearchAddress
      :open="addrOpen"
      :addrInfo.sync="addrInfo"
      :dialogClose.sync="addrOpen"
      @saved="afterAddr()">
    </SearchAddress> -->
    <!-- <MarkdownEditor
      :key="keyMDEditor"
      :open="dialogOpen"
      :popitem="subPopItem"
      mode="return"
      :procDiv="btnDiv"
      :dialogTitle="popTitle"
      boolTitle="false"
      :tableInfo="tableInfo"
      :dialogClose.sync="dialogOpen"
      @saved="afterSave()"
    /> -->
  </v-dialog>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";

// import "highlight.js/styles/github.css";
// import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// import { Viewer } from "@toast-ui/vue-editor";

export default {
  mixins: [baseMixin],
  props: ["open", "popitem", "mode", "logoinfo"],
  data() {
    return {
      keyOnelIntr : 10,
      keySvcFee : 20,
      keyReprStnd : 30,
      keyWrrtPird : 40,
      keyOpTm : 50,
      key:0,
      //부모창에서 받은 값을 local변수에 넣음
      //opened:this.editdialog,
      //popData:this.popitem
      formtitle: "제휴사 관리",
      physFile: null,
      preview: "",

      btnDiv: "",
      popTitle: "",
      dialogOpen: false,

      //주소검색 팝업
      addrOpen: false,



      //pop dialog 데이터 전달용
      subPopItem: {
        title: "",
        mdtxt: ""
      },
      //데이터 초기화용
      initItem: {
        title: "",
        mdtxt: ""
      },
      addrInfo:{
        addr1:"",
        addr2:"",
        zip:"",
        lon:"",
        lat:""
      },
      tableInfo: {
        tableName: "ALLC_BASE",
        inputValues: {},
        mdCol: "",
        titleCol: ""
      },
      rtntxt: ""
    };
  },
  components: {
    Viewer
  },
  watch: {
    physFile: function(val) {
      if (!val) {
        this.preview = "";
        this.logoinfo.fileUrl = "";
        return;
      }
      var reader = new FileReader();
      reader.onload = e => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        this.preview = e.target.result;
        this.logoinfo.fileUrl = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(val);
    }
  },
  methods: {
    //연산처리
    srchAddr(){
      this.addrInfo = {
        addr1:"",
        addr2:"",
        zip:"",
        lon:"",
        lat:""
      };
      this.addrOpen = true;
    },
    afterAddr(){
      this.popitem.shopAddr = this.addrInfo.addr1;
      this.popitem.shopAddrDtl = this.addrInfo.addr2;
      this.popitem.shopLat = this.addrInfo.lat;
      this.popitem.shopLon = this.addrInfo.lon;
      this.popitem.shopZip = this.addrInfo.zip;      
    },
    close() {
      this.physFile = null;
      this.opened = false;
    },
    editOpTm() {
      this.key = this.keyOpTm;
      this.popTitle = "운영시간";
      this.subPopItem = Object.assign({}, this.initItem);
      this.tableInfo.mdCol = "opTm";
      this.subPopItem.mdtxt = this.popitem.opTm;
      this.dialogOpen = true;
    },
    editOnelIntr() {
      this.key = this.keyOnelIntr;
      this.popTitle = "한줄소개";
      this.subPopItem = Object.assign({}, this.initItem);
      this.tableInfo.mdCol = "onelIntr";
      this.subPopItem.mdtxt = this.popitem.onelIntr;
      this.dialogOpen = true;
    },
    editSvcFee() {
      this.key = this.keySvcFee;
      this.popTitle = "서비스요금";
      this.subPopItem = Object.assign({}, this.initItem);
      this.tableInfo.mdCol = "svcFee";
      this.subPopItem.mdtxt = this.popitem.svcFee;
      this.dialogOpen = true;
    },
    editReprStnd() {
      this.key = this.keyReprStnd;
      this.popTitle = "수리기준";
      this.subPopItem = Object.assign({}, this.initItem);
      this.tableInfo.mdCol = "reprStnd";
      this.subPopItem.mdtxt = this.popitem.reprStnd;
      this.dialogOpen = true;
    },
    editWrrtPird() {
      this.key = this.keyWrrtPird;
      this.popTitle = "보증기간";
      this.subPopItem = Object.assign({}, this.initItem);
      this.tableInfo.mdCol = "wrrtPird";
      this.subPopItem.mdtxt = this.popitem.wrrtPird;
      this.dialogOpen = true;
    },
    afterSave() {
      console.log(this.subPopItem.mdtxt);
      if (this.tableInfo.mdCol == "onelIntr") {
        this.keyOnelIntr += 1;
        this.popitem.onelIntr = this.subPopItem.mdtxt;
      } else if (this.tableInfo.mdCol == "svcFee") {
        this.keySvcFee += 1;
        this.popitem.svcFee = this.subPopItem.mdtxt;
      } else if (this.tableInfo.mdCol == "reprStnd") {
        this.keyReprStnd += 1;
        this.popitem.reprStnd = this.subPopItem.mdtxt;
      } else if (this.tableInfo.mdCol == "wrrtPird") {
        this.keyWrrtPird += 1;
        this.popitem.wrrtPird = this.subPopItem.mdtxt;
      } else if (this.tableInfo.mdCol == "opTm") {
        this.keyOpTm += 1;
        this.popitem.opTm = this.subPopItem.mdtxt;
      }
      this.subPopItem = Object.assign({}, this.initItem);
    },
    async del() {
      var params = this.popitem;
      let res = await this.gfn_utils.axiosPost(
        "/admin/partner/delPartner",
        params
      );
      console.log(res);
    },
    async save() {
      try {
        if (this.$refs.popForm.validate()) {
          // console.log("popData:DATA");
          // console.log(this.popData);
          var params = this.popitem;

          let formData = new FormData();

          formData.append("file", this.physFile);
          formData.append(
            "params",
            new Blob([JSON.stringify(params)], { type: "application/json" })
          );

          if (this.mode == "new") {
            let res = await this.gfn_utils.axiosPost(
              "/admin/partner/regiPartner",
              formData
            );
            console.log(res);
          } else {
            let res = await this.gfn_utils.axiosPost(
              "/admin/partner/modiPartner",
              formData
            );
            console.log(res);
          }
          this.$refs.popForm.resetValidation();

          //parent의 메서드 호출
          this.$emit("saved");
          this.physFile = null;
          this.gfn_utils.openSnackbar("정상 처리 되었습니다.", "success");
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

    editMode: function() {
      if (this.mode == "edit") {
        return true;
      } else {
        return false;
      }
    },
    tagRule: {
      get: function() {
        return [value => this.gfn_rules.maxLength(value, 100)];
      }
    },
    telRule: {
      get: function() {
        return [value => this.gfn_rules.maxLength(value, 15)];
      }
    },
    allcNmRule: {
      get: function() {
        return [
          value => this.gfn_rules.required(value),
          value => this.gfn_rules.maxLength(value, 50),
          value => this.gfn_rules.minLength(value, 1)
        ];
      }
    },
    bizNmRule: {
      get: function() {
        return [value => this.gfn_rules.maxLength(value, 50)];
      }
    },
    ceoNmRule: {
      get: function() {
        return [value => this.gfn_rules.maxLength(value, 50)];
      }
    },
    bizRegNoRule: {
      get: function() {
        return [
          value => this.gfn_rules.number(value),
          value => this.gfn_rules.maxLength(value, 13)
        ];
      }
    },

    /*------------------------------*/
    cdRule: {
      get: function() {
        return [
          value => this.gfn_rules.required(value),
          value => this.gfn_rules.maxLength(value, 30),
          value => this.gfn_rules.minLength(value, 1)
        ];
      }
    },

    descRule: {
      get: function() {
        return [
          value => this.gfn_rules.maxLength(value, 100),
          value => this.gfn_rules.minLength(value, 2)
        ];
      }
    },

    optRule: {
      get: function() {
        return [value => this.gfn_rules.maxLength(value, 50)];
      }
    },

    sortOrdrRule: {
      get: function() {
        return [
          value => this.gfn_rules.required(value),
          value => this.gfn_rules.number(value),
          value => this.gfn_rules.maxLength(value, 3)
        ];
      }
    },

    opened: {
      get: function() {
        return this.open;
      },
      set: function(val) {
        this.$refs.popForm.resetValidation();
        this.$emit("update:dialogClose", val);
        //this.closed = newValue;
      }
    },
    previewOnelIntr :  {
      get : function(){
        return this.popitem.allcId + this.keyOnelIntr;
      }      
    },
    previewSvcFee :  {
      get : function(){
        return this.popitem.allcId + this.keySvcFee;
      }      
    },
    previewReprStnd :  {
      get : function(){
        return this.popitem.allcId + this.keyReprStnd;
      }      
    },
    previewWrrtPird :  {
      get : function(){
        return this.popitem.allcId + this.keyWrrtPird;
      }      
    },
    previewOpTm :  {
      get : function(){
        return this.popitem.allcId + this.keyOpTm;
      }      
    },
    keyMDEditor :  {
      get : function(){
        return this.key;
      }      
    },

  }
};
</script>
