<template>
    <v-card>
      <!-- <v-card-title class="dialogTitle dialogTitleText--text">
        <span class="headline">{{ formtitle }}</span>
      </v-card-title> -->
      <v-card-text class="mb-n8">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
            <v-text-field
              dense
              outlined
              placeholder=" "
              v-model="dataDetail.postTitle"
              label="Title"
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
            ></v-textarea>
          </v-col>
        </v-row>
        <v-divider />
          <v-row dense>
            <v-col
              v-for="card in dataDetail.photoUrls"
              :key="card.fileSeq"
              cols="12" sm="6" md="3" lg="3" xl="3" class="py-2"
            >
              <v-card>
                <v-img
                  :src="card.photoUrl"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="delPhoto(card.fileSeq)">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-4">
              <v-flex xs12>
                <v-combobox
                  multiple
                  v-model="tagList"
                  label="Tags"
                  chips
                  deletable-chips
                  @change="trimTag"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      @click:close="data.parent.selectItem(data.item)"
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
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
              <handy-uploader
                :documentAttachment.sync="attachmentsList"
                :cardType="'shaped'"
                :fileUploaderType="'simple'"
                :maxFileSize="5120"
                :imageCompressor="true"
                :imageCompressLevel="0.5"
                :maxFileCount="5"
                :badgeCounter="true"
                :thumb="true"
                :changeFileName="false"
                :addFileDescription="false"
                :addFileTag="false"
                :fileAccept="
                  'image/png,image/gif,image/jpeg,image/webp,image/bmp,image/jpg'
                "
              >
              </handy-uploader>
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions class="pt-10">
        <v-spacer></v-spacer>
        <v-btn color="btnDelete" text @click="savePreCheck('del')">삭제</v-btn>
        <v-btn color="btnDelete" text @click="savePreCheck('save')">저장</v-btn>
        <v-btn color="btnClose" text @click="close">닫기</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";
import handyUploader from "handy-uploader/src/components/handyUploader";

export default {
  mixins: [baseMixin],
  props: ["postSeq"],
  components: {
    handyUploader
  },
  mounted: function() {
    this.getContents();
  },
  data() {
    return {
      //부모창에서 받은 값을 local변수에 넣음
      model: 0,
      formtitle : "Modify Post",
      delFileSeqs:[],
      dataDetail: {
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
        writeDttm: ""
      },

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
        writeDttm: ""
      },
      
      tagList: [],
      attachmentsList: [],
      title: "",
      text: "",
      korLang: {
        custom: {
          insertFile: "Insert File",
          insertNewFile: "Insert New File",
          add: "Add",
          delete: "Delete",
          edit: "Edit",
          deleteDialog: {
            message: "Are you sure you want to delete the file?",
            cancel: "cancel"
          },
          table: {
            thumb: "Thumb",
            name: "Name",
            size: "Size",
            tags: "tags",
            action: {
              action: "Action",
              deleteTooltip: "Delete"
            }
          },
          size: {
            kb: "KB",
            mb: "MB"
          },
          maxFileSizeAlert: "Max file Size is",
          maxFileCountAlert: "Max file Count is",
          fileName: "File Name",
          fileDescription: "File Description",
          fileTags: "File Tags"
        }
      }
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
    delPhoto(item){
      this.delFileSeqs.put(item);
      var index = this.dataDetail.photoUrls.findIndex(fileSeq => fileSeq === item);
      this.dataDetail.photoUrls = this.dataDetail.photoUrls.splice(index, 1);
    },
    trimTag(val) {
      if (val.length > 0) {
        // console.log("동일값위치:::" + val.indexOf(val[val.length-1].replace(/\s/g, '')));
        if (
          val.indexOf(val[val.length - 1].replace(/\s/g, "")) == val.length - 1 ||
          val.indexOf(val[val.length - 1].replace(/\s/g, "")) < 0
        ) {
          val[val.length - 1] = val[val.length - 1].replace(/\s/g, "").replace("#","");
        } else {
          // console.log("error");
          val.pop();
        }
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
          console.log("수정권한 없음");
          this.close();
        }else{
          this.dataDetail = res;
          if(this.dataDetail.tags != null){
            this.tagList = this.dataDetail.tags.split(",");
          }
        }
       
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    savePreCheck(div){
      if(div == "save"){
        if(this.gfn_utils.checkToken()){
          this.makeParam();
        }else{
          this.loginOpen = true;
        } 
      }else if(div == "del"){
        this.delContents();
      }
           
    },
    makeParam(){
      let formData = new FormData();

        for (var idx in this.attachmentsList) {
          console.log("format ::" + this.attachmentsList[idx].file.format);
          console.log("name ::" + this.attachmentsList[idx].file.name);
          console.log("size ::" + this.attachmentsList[idx].file.size);

          var format = this.attachmentsList[idx].file.format;
          var base64 = this.attachmentsList[idx].file.base64;
          var fileName = this.attachmentsList[idx].file.name;
          var file = this.gfn_utils.dataURLtoFile(  format, base64, fileName);
          formData.append("fileList", file );
          // this.physFile = file;
          // console.log(" physFile name ::" + this.physFile.name);
        }

        formData.append("postTitle", this.title);
        formData.append("postCtnt", this.text);
        formData.append("tags", this.tagList);


        this.saveContents(formData);
    },
    async saveContents(formData ) {
      try {
        //파라메터

        console.log(formData);

        let res = await this.gfn_utils.axiosPost(
              "/v1/P/regPost.cat",
              formData
            );

        if(res.isNewUser == "Y"){
          // 쿠키에 로그인 사용자 정보 세팅
          this.gfn_utils.setCookiesLoginUserInfo(res);
          // 쿠키의 로그인 사용자 정보를 가져와서 store에 넣기
          this.gfn_utils.storeLoginUserInfo();
        }
        close();
          
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
      }
    },
    async delContents(){
      try {
        //조회 파라메터
        if(this.dataDetail.regUserId != window.$cookies.get('userId')){
          console.log("수정권한 없음");
          this.close();
        } 

        var params = {
          postSeq: this.$route.params.postSeq
        };
        let res = await this.gfn_utils.axiosGet(
          "/v1/P/delPost.cat",
          params
        );
        console.log("result :: ");
        console.log(res);

       
      } catch (error) {
        console.log(error);
        // this.dataTableLoading = false
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
