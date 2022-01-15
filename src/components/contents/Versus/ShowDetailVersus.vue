<template>
    <v-card class="mb-4">
      <!-- <v-card-title class="dialogTitle dialogTitleText--text">
        <span class="headline">{{ formtitle }}</span>
      </v-card-title> -->
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
            <v-text-field
              dense
              outlined
              placeholder=" "
              v-model="dataDetail.postTitle"
              label="Title"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
            <v-textarea
              dense
              outlined
              placeholder=" "
              v-model="dataDetail.postCtnt"
              label="Content"
              hide-details
              readonly
            ></v-textarea>
          </v-col>
        </v-row>

          <v-hover>
            <template v-slot:default="{ hover }">
              <div
                :class="`elevation-${hover ? 24 : 6}`"
                class="mx-auto pa-0 transition-swing "
                style="cursor: pointer"
              >
                <v-img height="250" :src="dataDetail.photoUrl">
                  <v-row
                    align="center"
                    no-gutters
                    style="height: 250px;"
                  >
                    <v-col cols="4">
                      <p style="color:white" align="center" >{{dataDetail.c1}}</p>
                    </v-col>
                    <v-col cols="4">
                    </v-col>
                    <v-col cols="4">
                      <p style="color:white" class="mr-1" align="center">{{dataDetail.c2}}</p>
                    </v-col>
                  </v-row>
                </v-img>
              </div>
            </template>
          </v-hover>
          <v-progress-linear
            background-color="pink lighten-1"
            color="blue"
            :value="dataDetail.c1rate"
            height=15
          ></v-progress-linear>          
        <v-row>
          <v-col cols="6">
            <v-btn block>
                {{dataDetail.c1}}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block>
              {{dataDetail.c2}}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mb-4">
              <v-flex xs12>
                <v-combobox
                  multiple
                  v-model="tagList"
                  label="Tags"
                  chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                    >
                    <!-- <v-avatar
                      class="accent white--text"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar> -->
                    <v-icon left>
                      mdi-music-accidental-sharp
                      <!-- mdi-pound -->
                    </v-icon>
                    {{ data.item }}
                    </v-chip>
                  </template>
                </v-combobox>
        
              </v-flex>
            </v-row>
        <v-divider />
          <!-- <v-carousel v-model="model">
            <v-carousel-item
              v-for="card in dataDetail.photoUrls"
              :key="card.fileSeq"
            >
              <v-sheet
                height="100%"
                tile
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-img
                    :src="card.photoUrl"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                  </v-img>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>             -->
        <v-row dense>
          <v-col
            v-for="card in dataDetail.photoUrls"
            :key="card.fileSeq"
            cols="12" sm="12" md="6" lg="4" xl="4" class="py-2"
          >
            <v-card>
              <v-img
                :src="card.photoUrl"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="btnClose" text 
              @click="complainPreCheck"
              v-bind="attrs"
              v-on="on">
              <v-icon>mdi-alert-decagram</v-icon></v-btn> 
          </template>
          <span>{{$t('post.DECLARATION')}}</span>
        </v-tooltip>
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="btnClose" text 
              @click="likePreCheck"
              v-bind="attrs"
              v-on="on">
              <v-icon :color="dataDetail.fvrtYn=='N'?'grey':'red'">mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>{{$t('post.LIKE')}}</span>
        </v-tooltip>
        {{dataDetail.fvrtCount}}
        <v-spacer></v-spacer>
        <v-btn color="btnDelete" text @click="modify" v-if="showModify">{{$t('buttons.MODIFY')}}</v-btn>
        <v-btn color="btnClose" text @click="close">{{$t('buttons.CLOSE')}}</v-btn>
      </v-card-actions>

      <v-divider />

       <v-card-actions class="pt-10">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="btnClose" text 
              @click="preAndNext('previous')"
              v-bind="attrs"
              v-on="on">
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
          </template>
          <span>{{$t('post.PREVIOUS')}}</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">        
          <v-btn color="btnClose" text 
            @click="preAndNext('next')"
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-skip-next</v-icon></v-btn>
          </template>
          <span>{{$t('post.NEXT')}}</span>
        </v-tooltip>
        
      </v-card-actions>
      <v-divider />
      <v-card-text>
      <v-row
        v-for="rpl in rplList"
        :key="rpl.seq"
        :justify="rpl.div"
      >
      <v-col
        xs="10" 
        sm="10"
        md="10"
        lg="10"
        xl="10"
        cols="10"
        class="pb-0 px-1"
        :align="rpl.div=='end'?'right':'left'"        
      >
        <div 
          v-if="rpl.relatedSeq==''?false:true"
          style="color:black;font-size:12px;"> 
          <v-btn
                small
                icon
                color="blue lighten-3"
                @click="$vuetify.goTo('#link'+rpl.relatedSeq)"
              >
                <v-icon>mdi-link</v-icon>
          </v-btn>          
          작성자 : 글 내용 줄임말... {{rpl.relatedSeq}} 
        </div>
        <div >
          <v-chip
          class="pa-2 text-left"
          filter
          :color="rpl.div=='start'?'blue':'pink lighten-1'"
          :id="'link'+rpl.seq"
          >
            {{rpl.txt}}
          </v-chip>
        </div>
        <div
          style="color:black;font-size:12px;">
          {{rpl.user}}&nbsp;&nbsp;&nbsp;{{rpl.dtm}}
          <v-btn
              v-if="rpl.user=='테스터'?true:false"
                icon
                color="indigo"
              >
                <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
                v-if="rpl.user=='테스터'?true:false"
                icon
                color="red"
              >
                <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
          <v-btn
                v-if="rpl.user!='테스터'?true:false"
                icon
                color="green"
              >
              신고
          </v-btn>
          <v-btn
                icon
                color="green"
              >
                <v-icon>mdi-reply</v-icon>
          </v-btn>
          
        </div>
      </v-col>
      </v-row>
      </v-card-text>
      <loginConfirm
        :open="loginOpen"
        :params="loginParam"
        :dialogClose.sync="loginOpen"
        :loginData.sync="loginData"
        @saved="afterLogin"
      />
      <complainPop
        :open="cmplnOpen"
        :postSeq="cmplnPostSeq"
        :dialogClose.sync="cmplnOpen"
        @saved="afterCmpln"
      />
    <!-- <div class="chip-wrap">
      <v-chip>Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Default Defaultasdflaskdflkjasdlkjflk;ajsd;lkjflkajsdlkjf;lkajsdlk;j</v-chip>
    </div> -->
    </v-card>
    
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";
// import loginConfirm from "@/components/contents/include/loginConfirm.vue";
import complainPop from "@/components/contents/include/complainPop.vue";

export default {
  mixins: [baseMixin],
  props: ["postSeq"],
  components: {
    complainPop
  },
  mounted: function() {
    //this.getContents();
  },
  data() {
    return {
      //부모창에서 받은 값을 local변수에 넣음
      tagList:[],
      model: 0,
      showModify: false,
      formtitle : "타이틀",
      dataDetail:{photoUrl :"https://cdn.pixabay.com/photo/2021/07/15/18/08/vs-6469147_960_720.jpg",
          title : "Which one is best??",
          c1 : "Android",
          c2 : "IOS",
          c1rate: "50"
        },
      rplList:[
        {seq:"1" , txt:"가나다라1gkgkgkg하하하하하ㅏㅇ라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하라1gkgkgkg하하허ㅏ미너히ㅏㅓㅁ닝ㅇ나ㅣ러미ㅏㅓㄴㅇ리;ㅏㅓ밍ㄴ;ㅏ러ㅣㅏ;ㅓㅁㅇ니;ㅏ러ㅏㄴ얼;ㅣㅏㅓ", div:"start", user:"닉네임", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"2" , txt:"가나다라2", div:"start", user:"닉네임", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"3" , txt:"가나다라3", div:"end", user:"별명", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"4" , txt:"가나다라4", div:"start", user:"닉네임", relatedSeq:"1", dtm:"2021-01-01 12:01:01"},
        {seq:"5" , txt:"가나다라5", div:"start", user:"테스터", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"6" , txt:"가나다라6", div:"end", user:"별명", relatedSeq:"1", dtm:"2021-01-01 12:01:01"},
        {seq:"7" , txt:"가나다라5", div:"start", user:"테스터7", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"8" , txt:"안녕하세요", div:"start", user:"테스터6", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"9" , txt:"감사합니다", div:"start", user:"테스터5", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"10" , txt:"아이고", div:"start", user:"테스터4", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"11" , txt:"hello", div:"end", user:"테스터2", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"12" , txt:"가나rkskekfkekj 다라5", div:"start", user:"테스터1", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"13" , txt:"동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세", div:"end", user:"테스터", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"14" , txt:"ㅋㅋㅋㅋㅋ", div:"start", user:"테스터4", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"15" , txt:"ㅎㅎㅎㅎㅎ", div:"end", user:"테스터3", relatedSeq:"", dtm:"2021-01-01 12:01:01"},
        {seq:"16" , txt:"ㄷㄷㄷㄷㄷ", div:"end", user:"테스터2", relatedSeq:"1", dtm:"2021-01-01 12:01:01"},
        {seq:"17" , txt:"ㅎㄷㄷㄷㄷ", div:"start", user:"테스터1", relatedSeq:"2", dtm:"2021-01-01 12:01:01"},
      ],
      
      initDetail: {
        fvrtCount: "",
        fvrtYn: "",
        photoUrls: [
          {
            fileSeq: "",
            photoUrl: "",
            postSeq: "",
            sortSeq: ""
          }
        ],
        postCtnt: "",
        postSeq: "",
        postTitle: "",
        regUserId: "",
        tags: "",
        writeDttm: "",
        prePostSeq : "",
        nextPostSeq : "",
      },
      
      loginData:"",
      loginOpen:false,
      loginParam:"",
      loginRsn:"",

      cmplnOpen:false,
      cmplnPostSeq:""
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
      this.dataDetail = this.initDetail;
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },

    async preAndNext(div){
      try {
        //조회 파라메터
        var  params = {};
        if(div == "previous"){
          if(this.dataDetail.prePostSeq == null){
            // alert(this.$t('messages.NO_PRE_POST'));
            this.gfn_utils.openSnackbar(this.$t('messages.NO_PRE_POST'), "warning");
            return;
          }
          params = {
            postSeq: this.dataDetail.prePostSeq
          };
        }else{
          if(this.dataDetail.nextPostSeq == null){
            // alert(this.$t('messages.NO_NEXT_POST'));
            this.gfn_utils.openSnackbar(this.$t('messages.NO_NEXT_POST'), "warning");
            return;
          }
          params = {
            postSeq: this.dataDetail.nextPostSeq
          };
        }

        let res = await this.gfn_utils.axiosGet(
          "/v1/P/getPost.cat",
          params
        );
        console.log("result :: ");
        console.log(res);
        this.dataDetail = this.initDetail;

        if(res.regUserId != window.$cookies.get('userId')){
          this.showModify = true;
        }else{
          this.showModify = true;
        }
        this.dataDetail = res;
        if(this.dataDetail.tags != null){
          this.tagList = this.dataDetail.tags.split(",");
        }
        this.$vuetify.goTo(0);
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    async getContents(){
      try {
        //조회 파라메터
        var params = {
          postSeq: this.$route.params.postSeq
        };
        let res = await this.gfn_utils.axiosGet(
          "/v1/P/getPost.cat",
          params
        );
        console.log("result :: ");
        console.log(res);

        if(res.regUserId != window.$cookies.get('userId')){
          this.showModify = false;
        }else{
          this.showModify = true;
        }
        this.dataDetail = res;
        if(this.dataDetail.tags != null){
          this.tagList = this.dataDetail.tags.split(",");
        }
        
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    modify(){
      this.$router.push({ name: 'ModifyPost', params: { postSeq : this.dataDetail.postSeq } });
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
    likePreCheck(){
      this.loginRsn = "like";
      if(this.gfn_utils.checkToken()){
        console.log("like");
        this.like();
      }else{
        console.log("login");
        this.loginParam = {};
        this.loginOpen = true;
      }      
    },
    afterLogin(params){
      //로그인정보 셋팅
      if(this.loginRsn == "like"){
        this.like();
      }else if(this.loginRsn == "complain"){
        this.complain();
      }
      this.loginRsn = "";
    },
    async like() {
      //로그인체크 해서 처리!!!!!
      try {
        var params = {
          postSeq: this.$route.params.postSeq
        };
        let res = await this.gfn_utils.axiosGet(
          "/v1/P/fvrtPost.cat",
          params
        );
        console.log(res);
        this.dataDetail.fvrtYn = res.fvrtYn;
        this.dataDetail.fvrtCount = res.fvrtCount;

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
    complainPreCheck(){
      this.loginRsn = "complain";
      if(this.gfn_utils.checkToken()){
        console.log("complain");
        this.complain();
      }else{
        console.log("login");
        this.loginParam = {};
        this.loginOpen = true;
      }      
    },
    complain(){
      this.cmplnPostSeq = this.$route.params.postSeq
      this.cmplnOpen = true;
    },
    afterCmpln(){

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

<style scoped>
.example {
  color: blue;
}
.chip-wrap {
  width:250px
}
.chip-wrap >>> .v-chip {
  margin: 8px;
  height: auto;
  white-space:pre-line;
}
.v-chip {
  margin: 8px;
  height: auto;
  white-space:pre-line;
}
</style>

<!--
https://codepen.io/johnjleider/pen/NQjWEm?&editable=true&editors=111
칩 멀티라인 예제;;
-->