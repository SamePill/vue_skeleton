<template>
  <v-container>
    <v-card fixed dense floating class="fixed-bar mt-n2 mb-2 pl-6">
      <v-row>
        <v-col cols="10">
          <v-text-field
            dense
            single-line
            hide-details
            placeholder="Title Or Tag"
            v-model="srchTag"
            label="Title Or Tag"
            prepend-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-icon medium class="my-2" color="btnOpenPop" @click="search">
            mdi-filter-variant
          </v-icon>
        </v-col>
      </v-row>
    </v-card>
    <!-- {{$route.params.notadd}}
    {{$route.params.menuCd}}
    {{this.$router.currentRoute.name }} -->

    <v-row
      class="px-0"
      >
      <v-col
        xs="12" 
        sm="12"
        md="6"
        lg="4"
        xl="4"
        cols="12"
        class="pb-0 px-1"
        v-for="data in dataList"
        :key="data.postSeq"
      >
        <v-card
          class="pa-0"
        >
          <!-- <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template> -->
          <v-card-title v-text="data.title"></v-card-title>          
          <v-hover>
            <template v-slot:default="{ hover }">
              <div
                :class="`elevation-${hover ? 24 : 6}`"
                class="mx-auto pa-0 transition-swing "
                style="cursor: pointer"
              >
                <v-img height="250" :src="data.photoUrl" @click="showDetail(data)">
                  <v-row
                    align="center"
                    no-gutters
                    style="height: 250px;"
                  >
                    <v-col cols="4">
                      <p style="color:white" align="center" >{{data.c1}}</p>
                    </v-col>
                    <v-col cols="4">
                    </v-col>
                    <v-col cols="4">
                      <p style="color:white" class="mr-1" align="center">{{data.c2}}</p>
                    </v-col>
                  </v-row>
                </v-img>
              </div>
            </template>
          </v-hover>
          <v-progress-linear
            background-color="pink lighten-1"
            color="blue"
            :value="data.c1rate"
            height=15
          ></v-progress-linear>
          <!-- <v-card-text v-text="data.postCtnt"></v-card-text> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-btn color="btnClose" text 
                @click="likePreCheck(data)"
                v-bind="attrs"
                v-on="on">
                  <v-icon :color="data.fvrtYn=='N'?'grey':'red'">mdi-heart</v-icon>
                </v-btn>
              </template>
              <span>{{$t('post.LIKE')}}</span>
            </v-tooltip>              
                {{data.fvrtCount}}

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="btnClose" text 
                  @click="share"
                  v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </template>
              <span>{{$t('post.SHARE')}}</span>
            </v-tooltip>

              <!-- <v-btn icon @click="testClean()">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon :color="data.fvrtYn=='N'?'grey':'red'">mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-sword-cross</v-icon>
              </v-btn> -->

            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-8 mb-5">
      <v-btn color="black" text 
        @click="more"
        >
        {{$t('buttons.MORE')}}
      </v-btn>
    </v-row>
    <!-- <imgUploadPop
      :open="newContentOpen"
      :mode="newContentMode"
      :popitem="newContentItem"
      editdialog="true"
      :dialogClose.sync="newContentOpen"
      @saved="afterNewSave()"
    />
    <imgUploadThumPop
      :open="newContentOpenThum"
      :mode="newContentMode"
      :popitem="newContentItem"
      editdialog="true"
      :dialogClose.sync="newContentOpenThum"
      @saved="afterNewSave()"
    />
    <imgUploadTablePop
      :open="newContentOpenTable"
      :mode="newContentMode"
      :popitem="newContentItem"
      editdialog="true"
      :dialogClose.sync="newContentOpenTable"
      @saved="afterNewSave()"
    /> -->
    <loginConfirm
      :open="loginOpen"
      :params="loginParam"
      :dialogClose.sync="loginOpen"
      :loginData.sync="loginData"
      @saved="afterLogin"
    />
    <v-fab-transition>
      <v-btn
        color="blue"
        fab
        dark
        fixed
        bottom
        right
        @click="newContents"
        style="bottom: 26px;"
        v-show="
          $router.currentRoute.name == 'Like'
            ? false
            : $router.currentRoute.name == 'MyGallery'
            ? false
            : true
        "
      >
        ADD
        <!-- <v-icon>mdi-plus</v-icon> -->
      </v-btn>
      <!-- {{ this.$router.currentRoute.name }} -->
    </v-fab-transition>
  </v-container>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";
// import imgUploadPop from "@/components/contents/include/imgUploadPop.vue";
// import imgUploadThumPop from "@/components/contents/include/imgUploadThumPop.vue";
// import imgUploadTablePop from "@/components/contents/include/imgUploadTablePop.vue";
// import loginConfirm from "@/components/contents/include/loginConfirm.vue";

export default {
  mixins: [baseMixin],
  name: "",
  props: {},
  components: {  },
  mounted: function() {
    // this.getList();
  },

  data() {
    return {
      scrolledToBottom: false,
      //pop dialog 데이터 전달용
      newContentItem: {
        faqSeq: "",
        faqDivCd: "",
        faqDivNm: ""
      },
      //데이터 초기화용
      initNewContentItem: {
        faqSeq: "",
        faqDivCd: "",
        faqDivNm: ""
      },

      //다이얼로그 활성
      newContentOpen: false,
      newContentOpenThum: false,
      newContentOpenTable: false,
      newContentMode: "",

      loginData:"",
      loginOpen:false,
      loginParam:"",

      limit: 5,
      lastKey: "",
      srchWord: "",
      srchTag: "",

      hasNextPage : "",
      listCount : "0" ,


      isFixed: true,
      dataList: [
        {photoUrl :"https://cdn.pixabay.com/photo/2021/07/15/18/08/vs-6469147_960_720.jpg",
          title : "누가 더 쓰레기 인가??",
          c1 : "일베",
          c2 : "워마드",
          c1rate: "50"
        },
        {photoUrl :"https://cdn.pixabay.com/photo/2021/07/26/05/59/vs-6493500_960_720.png",
          title : "최고의 코인은?",
          c1 : "이더리움",
          c2 : "비트코인",
          c1rate: "70"
        },
        {photoUrl :"https://cdn.pixabay.com/photo/2021/09/10/09/02/competition-6612629_960_720.jpg",
          title : "아무거나 고르시오?",
          c1 : "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하",
          c2 : "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ",
          c1rate: "50"
        },
      ]
      //
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
  computed: {
    //캐쉬에 있는 값으로 연산
    pageCd: {
      get: function() {
        return this.$route.params.iam;
      }
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.scrolledToBottom = true; // replace it with your code
          //alert("call more");
          if("Y" == this.hasNextPage){
            this.getList();
          } else{
            this.gfn_utils.openSnackbar(this.$t('messages.NO_MORE_POST'), "warning");
          }
        }
      };
    },
    async afterSave() {
      this.getList();
    },
    newContents() {
      this.newContentItem = Object.assign({}, this.initNewContentItem);
      this.newContentMode = "new";
      //this.newContentOpen = true;
      // this.newContentOpenThum = "true";
      // this.newContentOpenTable = "true";

      // //alert(this.srchTag);
      this.$router.push({
        name: "ImgUpload",
        params: {
          menuNm: "New Content",
          menuCd: "ImgUpload",
          icon: "mdi-home",
          notadd: true
        }
      });
    },
    search() {
      this.lastKey = "";
      this.getList();
    },
    more(){

      if("Y" == this.hasNextPage){
        this.getList();
      } else{
        this.gfn_utils.openSnackbar(this.$t('messages.NO_MORE_POST'), "warning");
      }
    },
    async getList() {
      try {
        //조회 파라메터
        var params = {
          lastKey: this.lastKey,
          srchWord: this.srchWord,
          srchTag: this.srchTag
        };
        let res = await this.gfn_utils.axiosPost(
          "/v1/P/getPostList.cat",
          params
        );
        console.log(res);
        console.log(res.hasNextPage);
        console.log(res.listCount);

        if(this.lastKey != ""){
          var tmp = res.list;
          this.dataList = this.dataList.concat(tmp);
        }else{
          this.dataList = res.list;
        }
        
        this.hasNextPage = res.hasNextPage;
        this.listCount = res.listCount;
        this.lastKey = this.dataList[this.dataList.length - 1].postSeq
       
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    share(){

      console.log(window.location.href);

      const el = document.createElement('textarea');  
      el.value = window.location.href;                                 
      el.setAttribute('readonly', '');                
      el.style.position = 'absolute';                     
      el.style.left = '-9999px';                      
      document.body.appendChild(el);                  
      const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
      el.select();                                    
      document.execCommand('copy');                   
      document.body.removeChild(el);                  
      if (selected) {                                 
        document.getSelection().removeAllRanges();    
        document.getSelection().addRange(selected);   
      }
      this.gfn_utils.openSnackbar(this.$t('post.COPY_URL'), "success");
    },
    likePreCheck(item){
      if(this.gfn_utils.checkToken()){
        this.like(item);
      }else{
        this.loginParam = item;
        this.loginOpen = true;
      }      
    },
    afterLogin(params){
      //로그인정보 셋팅
      this.like(params);
    },
    async like(item) {
      //로그인체크 해서 처리!!!!!
      try {
        var params = {
          postSeq: item.postSeq
        };
        let res = await this.gfn_utils.axiosGet(
          "/v1/P/fvrtPost.cat",
          params
        );
        console.log(res);
        item.fvrtYn = res.fvrtYn;
        item.fvrtCount = res.fvrtCount;

        if(res.isNewUser == "Y"){
          // 쿠키에 로그인 사용자 정보 세팅
          this.gfn_utils.setCookiesLoginUserInfo(res);
          // 쿠키의 로그인 사용자 정보를 가져와서 store에 넣기
          this.gfn_utils.storeLoginUserInfo();
        }

      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    showDetail(item){
      console.log("show detail :: "+item.postSeq);
      this.$router.push({ name: 'ShowDetail_ssul', params: { postSeq : item.postSeq } });
      //console.log(item);

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 4em;
  z-index: 2;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.v-img__thumb{
  cursor:grabbing;
  height:42px;
  width:42px;
}
</style>
