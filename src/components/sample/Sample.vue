<template>
  <v-container>
  <v-row justify="center">
    <v-col
        xs="12" 
        sm="12"
        md="12"
        lg="10"
        xl="10"
        cols="12">
      <div style="width: 100%; height: 500px; overflow-y: scroll;" class="mb-5">
        <v-card>
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
        </v-card>
      </div>
    </v-col>
  </v-row>
 
    <!-- <v-card class="mb-5">
      <v-virtual-scroll
        height="350"
        :items="rplList"
        itemHeight="200"
      >
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-content>
            d<div 
            v-if="item.relatedSeq==''?false:true"
            style="color:black;font-size:12px;"> 
            <v-btn
                  small
                  icon
                  color="blue lighten-3"
                  @click="$vuetify.goTo('#link'+item.relatedSeq)"
                >
                  <v-icon>mdi-link</v-icon>
            </v-btn>          
            작성자 : 글 내용 줄임말... {{item.relatedSeq}} 
          </div>
          <div >
            <v-chip
            class="pa-2 text-left"
            filter
            :color="item.div=='start'?'blue':'pink lighten-1'"
            :id="'link'+item.seq"
            >
              {{item.txt}}
            </v-chip>
          </div>
          <div
            style="color:black;font-size:12px;">
            {{item.user}}&nbsp;&nbsp;&nbsp;{{item.dtm}}
            <v-btn
                v-if="item.user=='테스터'?true:false"
                  icon
                  color="indigo"
                >
                  <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                  v-if="item.user=='테스터'?true:false"
                  icon
                  color="red"
                >
                  <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
            <v-btn
                  v-if="item.user!='테스터'?true:false"
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
          </v-list-item-content>
        </v-list-item>
      </template>
      </v-virtual-scroll>
    </v-card> -->
    <v-card>
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
    </v-card>
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
    // pageCd: {
    //   get: function() {
    //     return this.$route.params.iam;
    //   }
    // }
  },
  methods: {
   
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
