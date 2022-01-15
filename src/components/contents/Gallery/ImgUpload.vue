<template>
  <v-container>
    <v-card>
      <v-card-text class="mb-n8">
        <v-form ref="popForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
                <v-text-field
                  dense
                  outlined
                  placeholder=" "
                  v-model="title"
                  label="Title"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="py-2">
                <v-textarea
                  dense
                  outlined
                  placeholder=" "
                  v-model="text"
                  label="Content"
                  counter="1000"
                ></v-textarea>
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
            <!-- <v-row>
               <v-file-input
                  label="이미지 파일"
                  outlined
                  dense
                  chips
                  counter
                  multiple
                  show-size
                  clearable
                  v-model="physFile"
                  prepend-icon="mdi-camera"
                ></v-file-input>
            </v-row>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-img
                  height="250"
                  width="600px"
                  :src="preview"
                  aspect-ratio="2"
                  contain
                ></v-img>
              </v-col>
            </v-row> -->
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
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pt-10">
        <!--
          <v-btn color="btnDelete" text @click="del">삭제</v-btn>
          -->
        <v-spacer></v-spacer>
        <v-btn color="btnClose" text @click="close">{{$t('buttons.CLOSE')}}</v-btn>
        <v-btn color="btnPopSave" text @click="savePreCheck">{{$t('buttons.SAVE')}}</v-btn>
      </v-card-actions>
    </v-card>
    <loginConfirm
      :open="loginOpen"
      :dialogClose.sync="loginOpen"
      :loginData.sync="loginData"
      @saved="afterLogin(params)"
    />
  </v-container>
  
</template>

<script>
import baseMixin from "@/utils/baseMixin.js";
import handyUploader from "handy-uploader/src/components/handyUploader";
// import loginConfirm from "@/components/contents/include/loginConfirm.vue";

export default {
  mixins: [baseMixin],
  props: ["open", "popitem", "mode"],
  components: {
    handyUploader
  },
  data() {
    return {
      loginData:"",
      loginOpen:false,
      loginParam:"",

      physFile:null,
      preview:null,

      tagList: [],
      formtitle: "Image Upload",
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
    physFile: function(val) {
      if (!val) {
        this.preview = "";
        return;
      }
      var reader = new FileReader();
      reader.onload = e => {
        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
        // Read image as base64 and set to imageData
        this.preview = e.target.result;
      };
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(val);
    },
    tagList: function(newVal, oldVal) {
      // console.log(newVal.length);
      // console.log(newVal[newVal.length-1].replace(/\s/g, ''));
      // console.log(oldVal);
      // console.log(oldVal.indexOf(newVal[newVal.length-1].replace(/\s/g, '')));
    }

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
    // updateTags() {
    //   this.$nextTick(() => {
    //     this.tagList.push(...this.search.split(","));
    //     this.$nextTick(() => {
    //       this.search = "";
    //     });
    //   });
    // },
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
    close() {
      // this.$router.go(-1);
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    afterLogin(){
      //로그인정보 셋팅
      this.makeParam();
    },
    savePreCheck(){
      if(this.gfn_utils.checkToken()){
        this.makeParam();
      }else{
        this.loginOpen = true;
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
        // this.$refs.popForm.resetValidation();
        this.handyAttachments = [];
        this.$emit("update:dialogClose", val);
        //this.closed = newValue;
      }
    }
  }
};
</script>
