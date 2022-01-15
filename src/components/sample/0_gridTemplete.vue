<template>
  <v-container fluid>
    <v-card outlined class="px-4 pt-5">
      <v-row class="ml-1 mb-0">
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
        <v-text-field
          label="검색1"
          placeholder=" "
          outlined
          dense
          class="mx-4 my-0 pa-0"
          width="30"
          v-model="srch1"
          :rules="srchRules1"
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
                <v-col md="3" lg="3" xl="3" class="pb-0">
                  <CmnDateDialog
                    :date="srchDtFr"
                    :dateValue.sync="srchDtFr"
                    title="조회기간 From"
                  />
                </v-col>
                <v-col md="3" lg="3" xl="3" class="pb-0">
                  <CmnDateDialog
                    :date="srchDtTo"
                    :dateValue.sync="srchDtTo"
                    title="조회기간 To"
                  />
                </v-col>
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
            item-key="aprvStepCd"
            show-select
            no-data-text="데이터가 없습니다."
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>FAQ</v-toolbar-title>

                <!-- 컴럼표시 선택 -->
                <!--
                <v-btn text icon @click="openSelHdr"
                  ><v-icon>mdi-cogs</v-icon></v-btn
                >
                <SelectHeader
                  :open="selHdrOpen"
                  :headers="dataHeaders"
                  :dialogClose.sync="selHdrOpen"
                />
                -->
                <!-- 컴럼표시 선택 -->

                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <!-- popup 다이얼로그 -->
                <v-btn color="btnOpenPop" class="mb-2" @click="openNewItem"
                  >추가</v-btn
                >
                <!--
                <SysPrjMngPop
                  :open="dialogOpen"
                  :mode="dialogMode"
                  :popitem="popItem"
                  editdialog="true"
                  :dialogClose.sync="dialogOpen"
                  @saved="afterSave()"
                />
                -->
                <!-- popup 다이얼로그 end-->
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                color="btnOpenPop"
                @click="openEditItem(item)"
              >
                edit
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

export default {
  mixins: [baseMixin],
  name: "PageName",
  props: {
    msg: String
  },
  mounted: function() {},
  created: function() {
    //화면 로드 완료시 호출
  },
  data() {
    return {
      //조회값
      combodata: [],
      srchDtFr: new Date().toISOString().substr(0, 10),
      srchDtTo: new Date().toISOString().substr(0, 10),
      srch0: "",
      srch1: "",

      //검색패널
      srchPanel: "",
      useSrchPanel: true,

      //변수선언
      selKey: "",
      selected: [],

      //data table1
      dataHeaders: [
        {
          text: "번호",
          align: "left",
          value: "prjCd",
          width: "130",
          fix: true,
          show: true
        },
        {
          text: "구분",
          align: "left",
          value: "prjNm",
          width: "180",
          fix: true,
          show: true
        },
        {
          text: "제목",
          align: "left",
          value: "prjNm",
          width: "180",
          fix: true,
          show: true
        },
        {
          text: "등록자",
          align: "left",
          value: "prjStrtDt",
          width: "100",
          fix: true,
          show: true
        },
        {
          text: "등록일",
          align: "left",
          value: "prjEndDt",
          width: "100",
          show: true
        },
        {
          text: "수정",
          value: "action",
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
        prjCd: "",
        prjNm: "",
        prjStrtDt: "",
        prjEndDt: "",
        prjTypeCd: "Y",
        prjStatCd: "Y",
        blngOrgCd: "",
        srvcAdmnId: "",
        cspCd: "",
        colaToolCd: "",
        scmToolCd: "",
        cicdToolCd: ""
      },
      //데이터 초기화용
      initItem: {
        prjCd: "",
        prjNm: "",
        prjStrtDt: new Date().toISOString().substr(0, 10),
        prjEndDt: new Date().toISOString().substr(0, 10),
        prjTypeCd: "Y",
        prjStatCd: "Y",
        blngOrgCd: "",
        srvcAdmnId: "",
        cspCd: "",
        colaToolCd: "",
        scmToolCd: "",
        cicdToolCd: ""
      },

      //다이얼로그 활성
      dialogOpen: false,
      dialogMode: "",
      //컬럼선택 다이얼로그
      selHdrOpen: false
    };
  },
  components: {
    // SysPrjMngPop
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
      this.dialogMode = "new";
      this.dialogOpen = true;
    },
    openEditItem(value) {
      //입력다이얼로그 띄우기
      this.selectBaseInfo(value);
      this.dialogMode = "edit";
      this.dialogOpen = true;
    },
    async afterSave() {
      this.getList();
    },
    async getList() {
      try {
        //조회 파라메터
        var params = {
          srch1: this.srch1
        };
        let res = await this.gfn_utils.axiosPost(
          "/system/srchPrjList.sys",
          params
        );
        // console.log(res.menuList);
        this.gridList = res.srchList;
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    async selectBaseInfo(vl) {
      //this.popItem=Object.assign({}, this.initItem);

      var sqlParam = { prjCd: vl.prjCd };
      var params = { tableNm: "TB_PRJ", srchKeys: sqlParam };

      console.log(params);
      let res = await this.gfn_utils.axiosPost(
        "/common/srchBaseInfo.cmn",
        params
      );

      this.popItem = Object.assign({}, res.baseInfo);

      if (this.popItem.prjStrtDt == "" || this.popItem.prjStrtDt == null) {
        this.popItem.prjStrtDt = new Date().toISOString().substr(0, 10);
      }
      if (this.popItem.prjEndDt == "" || this.popItem.prjEndDt == null) {
        this.popItem.prjEndDt = new Date().toISOString().substr(0, 10);
      }
      this.popItem.prjStrtDt = this.gfn_utils.formatDate(
        this.popItem.prjStrtDt,
        "YYYY-MM-DD"
      );
      this.popItem.prjEndDt = this.gfn_utils.formatDate(
        this.popItem.prjEndDt,
        "YYYY-MM-DD"
      );

      console.log(res);
    }
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
