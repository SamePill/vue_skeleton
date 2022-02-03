<template>
  <v-container fluid>
    <v-card outlined class="px-4 py-8 mb-3">
      <v-row class="ml-1 mb-0">
        <!--
        <v-select
          :items="CODES.BLNG_ORG_CD_ALL"
          item-text="cdNm"
          item-value="cdVal"
          dense
          label="구분"
          placeholder=" "
          outlined
          class="my-0 pa-0"
          v-model="srch0"
        ></v-select>
        <v-combobox
          v-model="srch1Combo"
          :items="partnerList"
          item-text="companyNm"
          item-value="companyId"
          label="거래처명"
          dense
          outlined
        ></v-combobox>
       -->
        <v-text-field
          label="거래처명"
          placeholder=" "
          outlined
          dense
          class="mx-4 my-0 pa-0"
          width="30"
          v-model="srch1"
        ></v-text-field>
        <v-spacer />
        <v-btn
          class="mx-3"
          v-on="null"
          depressed
          outlined
          color="btnSearch"
          @click="getList"
        >
          검색
        </v-btn>
      </v-row>
      
      <v-row v-if="useSrchPanel">
        <v-expansion-panels v-model="srchPanel" flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              상세검색
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="mt-0 mb-n2">
                <!-- <v-col cols="12" sm="2" md="2" lg="2" xl="2">
                  <v-select
                    :items="CODES.YN_ALL"
                    item-text="cdNm"
                    item-value="cd"
                    dense
                    label="삭제 여부"
                    placeholder=" "
                    outlined
                    class="my-0 pa-0"
                    hide-details
                    v-model="exSrch1"
                  ></v-select>
                </v-col> -->
                <v-spacer />
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
    <v-row>
      <v-col md="12" lg="12" xl="12">
        <v-card outlined class="px-4 pt-2">
          <v-data-table
            v-model="selected"
            :headers="filterHeaders"
            :items="gridList"
            item-key="companyId"
            no-data-text="데이터가 없습니다."
            :footer-props="{
              itemsPerPageOptions: [10, 30, 50, 100]
            }"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>거래처</v-toolbar-title>

                <!-- 컴럼표시 선택 -->
                <v-btn text icon @click="openSelHdr"
                  ><v-icon>mdi-cogs</v-icon></v-btn
                >
                <SelectHeader
                  :open="selHdrOpen"
                  :headers="dataHeaders"
                  :dialogClose.sync="selHdrOpen"
                />
                <!-- 컴럼표시 선택 -->

                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <!-- 엑셀 다운로드  https://www.npmjs.com/package/vue-json-excel -->
                <download-excel
                  :data="gridList"
                  :fields="excelFields"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                  name="거래처 목록.xls"
                >
                  <v-btn color="btnXls" class="mb-2 mr-2" text
                    ><v-icon>mdi-download</v-icon></v-btn
                  >
                </download-excel>
                <!-- 엑셀 다운로드  end-->

                <!-- popup 다이얼로그 -->
                <v-btn color="btnOpenPop" class="mb-2" @click="openNewItem"
                  >추가</v-btn
                >
                <!-- <AddListPop
                  :open="dialogOpen"
                  :mode="dialogMode"
                  :popitem="popItem"
                  :logoinfo="logoInfo"
                  editdialog="true"
                  :dialogClose.sync="dialogOpen"
                  @saved="afterSave()"
                /> -->
                <!-- popup 다이얼로그 end-->
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                medium
                class="mr-2"
                color="btnOpenPop"
                @click="openEditItem(item)"
              >
                edit
              </v-icon>
            </template>
            <template v-slot:item.action0="{ item }">
              <v-icon
                medium
                class="mr-2"
                color="btnOpenPop"
                @click="openUploadFile(item)"
              >
                mdi-paperclip
              </v-icon>
            </template>
            <template v-slot:item.action1="{ item }">
              <v-icon
                medium
                class="mr-2"
                color="btnOpenPop"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";
import JsonExcel from "vue-json-excel";
// import AddListPop from "@/components/TableList/include/AddListPop.vue";


export default {
  mixins: [baseMixin],
  name: "PageName",
  props: {
    msg: String
  },
  mounted: function() {
    this.getList();
    // this.selectPartnerList();
  },
  created: function() {
    //화면 로드 완료시 호출
  },
  data() {
    return {
      //조회값
      partnerList: [{}],

      combodata: [],
      srchDtFr: new Date().toISOString().substr(0, 10),
      srchDtTo: new Date().toISOString().substr(0, 10),
      srch0: "",
      srch1: "",
      exSrch1: "",
      srch1Combo: { companyId: "", companyNm: "" },
      exSrch2: "",

      //검색패널
      srchPanel: "",
      useSrchPanel: true,

      //변수선언
      selKey: "",
      selected: [],

      //excl
      excelFields: {
        번호: "no",
        거래처ID: "companyId",
        거래처명: "companyNm",
        사업자번호: "bizRegNo",
        대표: "ceoNm",
        태그: "tag",
        전화번호: "tel",
        삭제여부: "delYn"
      },
      dummyData:[
        {
          no: "1",
          companyId : "A0001",
          companyNm : "구글",
          companyNmEng : "Google",
          logoFileSeq : "0",
          tag : "#alphabet,#gmail",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "SiliconValley",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "2",
          companyId : "A0002",
          companyNm : "삼성",
          companyNmEng : "Samsung",
          logoFileSeq : "0",
          tag : "#CellPhone,#TV",
          tel : "+82-000-000-0000",
          companyAddr : "Korea",
          companyAddrDtl : "Seoul",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "3",
          companyId : "A0003",
          companyNm : "현대",
          companyNmEng : "Hyundai",
          logoFileSeq : "0",
          tag : "#car",
          tel : "+1-000-000-0000",
          companyAddr : "Korea",
          companyAddrDtl : "Seoul",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "4",
          companyId : "A0004",
          companyNm : "테슬라",
          companyNmEng : "Tesla",
          logoFileSeq : "0",
          tag : "#model3",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "5",
          companyId : "A0005",
          companyNm : "펩시",
          companyNmEng : "Pepsi",
          logoFileSeq : "0",
          tag : "#cola",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "6",
          companyId : "A0006",
          companyNm : "코카콜라",
          companyNmEng : "CocaCola",
          logoFileSeq : "0",
          tag : "#fanta",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "New York",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "7",
          companyId : "A0007",
          companyNm : "버거킹",
          companyNmEng : "BuggerKing",
          logoFileSeq : "0",
          tag : "#waffer",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "???",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "8",
          companyId : "A0008",
          companyNm : "스타벅스",
          companyNmEng : "Starbuks",
          logoFileSeq : "0",
          tag : "#americano",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "Seattle",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "9",
          companyId : "A0009",
          companyNm : "마이크로소프트",
          companyNmEng : "MS",
          logoFileSeq : "0",
          tag : "#windows,#office",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "somewhere",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "10",
          companyId : "A0010",
          companyNm : "엘지",
          companyNmEng : "LG",
          logoFileSeq : "0",
          tag : "#TV",
          tel : "+82-000-000-0000",
          companyAddr : "Korea",
          companyAddrDtl : "Seoul",
          regDt : "2001-01-01",
          delYn : "N"
        },
        {
          no: "11",
          companyId : "A0011",
          companyNm : "애플",
          companyNmEng : "Apple",
          logoFileSeq : "0",
          tag : "#iphone",
          tel : "+1-000-000-0000",
          companyAddr : "US",
          companyAddrDtl : "Callifornia",
          regDt : "2001-01-01",
          delYn : "N"
        },
      ],
      //data table1
      dataHeaders: [
        {
          text: "번호",
          align: "left",
          value: "no",
          width: "80",
          fix: true,
          show: true
        },
        {
          text: "거래처ID",
          align: "left",
          value: "companyId",
          width: "100",
          fix: true,
          show: true
        },
        {
          text: "거래처명",
          align: "left",
          value: "companyNm",
          width: "180",
          fix: true,
          show: true
        },
        {
          text: "영문명",
          align: "left",
          value: "companyNmEng",
          width: "180",
          fix: true,
          show: true
        },
        {
          text: "로고파일",
          align: "left",
          value: "logoFileSeq",
          width: "100",
          show: false
        },
        {
          text: "태그",
          align: "left",
          value: "tag",
          width: "100",
          show: false
        },
        {
          text: "연락처",
          align: "left",
          value: "tel",
          width: "100",
          show: true
        },
        {
          text: "주소",
          align: "left",
          value: "companyAddr",
          width: "100",
          show: false
        },
        {
          text: "주소상세",
          align: "left",
          value: "companyAddrDtl",
          width: "100",
          show: false
        },
        {
          text: "등록일",
          align: "left",
          value: "regDt",
          width: "100",
          show: true
        },
        {
          text: "삭제여부",
          align: "left",
          value: "delYn",
          width: "80",
          show: true
        },
        {
          text: "수정",
          value: "action",
          width: "80",
          sortable: false,
          fix: true,
          show: true
        },
        {
          text: "삭제",
          value: "action1",
          width: "80",
          sortable: false,
          fix: true,
          show: true
        }
      ],
      dialog: "",
      sortBy: "",
      gridList: [],

      //pop dialog 데이터 전달용
      popItem: {
        companyId: "",
        companyNm: "",
        logoFileSeq: "",
        delYn: "N",
        tag: "",
        tel: "",
        companyAddr: "",
        companyAddrDtl: ""
      },
      //데이터 초기화용
      initItem: {
        companyId: "",
        companyNm: "",
        logoFileSeq: "",
        delYn: "N",
        tag: "",
        tel: "",
        companyAddr: "",
        companyAddrDtl: ""
      },

      logoInfo: {
        bkitNm: "",
        etag: null,
        fileSeq: "",
        fileUrl: "",
        keyNm: null,
        physNm: null,
        regDttm: null,
        regUserId: null,
        thmbFileSeq01: null,
        thmbFileSeq02: null,
        thmbFileSeq03: null,
        uptDttm: null,
        uptUserId: null
      },
      logoInfoInit: {
        bkitNm: "",
        etag: null,
        fileSeq: "",
        fileUrl: "",
        keyNm: null,
        physNm: null,
        regDttm: null,
        regUserId: null,
        thmbFileSeq01: null,
        thmbFileSeq02: null,
        thmbFileSeq03: null,
        uptDttm: null,
        uptUserId: null
      },
      //다이얼로그 활성
      dialogOpen: false,
      dialogMode: "",
      //컬럼선택 다이얼로그
      selHdrOpen: false
    };
  },
  components: {
    downloadExcel: JsonExcel,
    // AddListPop
  },
  watch: {
    dialogOpen: function(val) {
      if (val == false) {
        this.popItem = Object.assign({}, this.initItem);
      } else {
        console.log("open!!!!!");
      }
    }
  },
  computed: {
    //캐쉬에 있는 값으로 연산
    filterHeaders: {
      get: function() {
        var arr2 = this.dataHeaders.filter(function(el) {
          return el.show == true;
        });
        return arr2;
      }
    },
    srchRules1: {
      get: function() {
        return [
          this.gfn_rules.required,
          value => this.gfn_rules.minLength(value, 4),
          value => this.gfn_rules.maxLength(value, 20)
        ];
      }
    }
  },
  methods: {
    //연산처리



    //헤더표시 컬럼 조정
    openSelHdr() {
      this.selHdrOpen = true;
    },

    openNewItem() {
      //입력다이얼로그 띄우기
      this.popItem = Object.assign({}, this.initItem);
      this.logoInfo = Object.assign({}, this.logoInfoInit);
      this.dialogMode = "new";
      this.dialogOpen = true;
    },

    openEditItem(value) {
      //입력다이얼로그 띄우기
      this.selectBaseInfo(value);
      this.dialogMode = "edit";
      this.dialogOpen = true;
    },

    async deleteItem(item) {
      var r = confirm("삭제 하시겠습니까?");

      if (r == true) {
        // var sqlParam = { companyId: item.companyId, delYn: "Y" };
        // var params = { tableNm: "company_BASE", updateKeys: sqlParam };

        // console.log(params);
        // await this.gfn_utils.axiosPost("/common/delFlagChange", params);
        
        this.gfn_utils.openSnackbar("정상 처리 되었습니다.", "success");
        this.getList();
      } else {
        return;
      }
    },
    async afterSave() {
      this.getList();
    },
    async getList() {
      try {
        //조회 파라메터
        // var params = {
        //   srch1: this.srch1Combo.companyId,
        //   exSrch1: this.exSrch1,
        //   exSrch2: this.exSrch2
        // };
        // let res = await this.gfn_utils.axiosPost(
        //   "/partner/getPartnerList",
        //   params
        // );
        // // console.log(res.menuList);
        // this.gridList = res.dataList;

        this.gridList = this.dummyData;

      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    async selectBaseInfo(vl) {
      // this.popItem = Object.assign({}, this.initItem);

      // var sqlParam = { companyId: vl.companyId };
      // var params = { tableNm: "company_BASE", srchKeys: sqlParam };

      // console.log(params);
      // let res = await this.gfn_utils.axiosPost(
      //   "/common/getBaseInfo",
      //   params
      // );
      // console.log(res);
      // this.popItem = Object.assign({}, res.baseInfo);
      // this.selectLogInfo(this.popItem.logoFileSeq);

      this.popItem ;


    },
    startDownload() {
      console.log("excel Downloiad Start");
    },
    finishDownload() {
      console.log("excel Downloiad Finish");
    }
    // async selectLogInfo(vl) {
    //   this.logoInfo = Object.assign({}, this.logoInfoInit);

    //   var sqlParam = { fileSeq: vl };
    //   var params = { tableNm: "FILE_BASE", srchKeys: sqlParam };

    //   console.log(params);
    //   let res = await this.gfn_utils.axiosPost(
    //     "/common/getBaseInfo",
    //     params
    //   );

    //   this.logoInfo = Object.assign({}, res.baseInfo);

    //   console.log(res);
    // },
    // async selectPartnerList() {
    //   //this.popItem=Object.assign({}, this.initItem);
    //   var params = {};
    //   let res = await this.gfn_utils.axiosPost(
    //     "/partner/getPartnerCombo",
    //     params
    //   );

    //   this.partnerList = Object.assign([], res.dataList);
    // },
  }
};
</script>

<style scoped>
.v-expansion-panel-header {
  padding: 0px 26px;
  min-height: 30px;
}
.v-expansion-panel-content__wrap {
  padding: 0 15px 0px;
}
</style>
