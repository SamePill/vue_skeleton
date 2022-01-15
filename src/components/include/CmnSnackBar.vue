<template>
  <!-- <v-snackbar v-model="snackbarOpen" :color="snackbarColor" @input="close">
    {{ snackbarMsg }}
    <v-btn text @click="close()" absolute right top class="mt-0">
      Close
    </v-btn>
  </v-snackbar> -->
  <v-snackbar
      v-model="snackbarOpen"
      :color="snackbarColor" @input="close"
    >
      {{ snackbarMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="close()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

</template>

<script>
import { store } from "@/store";

export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    snackbarOpen: {
      // getter
      get: function() {
        return this.$store.getters.snackbarOpen;
      },
      // setter
      set: function(newValue) {
        store.commit("setSnackbarOpen", newValue);
        store.commit("setSnackbarMsg", "");
        store.commit("setSnackbarColor", "primary");
      }
    },
    snackbarMsg() {
      return this.$store.getters.snackbarMsg;
    },
    snackbarColor() {
      return this.$store.getters.snackbarColor;
    }
  },
  methods: {
    close() {
      store.commit("setSnackbarOpen", false);
      store.commit("setSnackbarMsg", "");
      store.commit("setSnackbarColor", "primary");
      this.$emit("close");
    }
  },
  watch: {
    // openYN: function(val){
    //     if(val == false){
    //         store.commit(types.SET_SNACKBAR_OPEN, false);
    //         store.commit(types.SET_SNACKBAR_MSG, "");
    //     }
    // },
  }
};
</script>

<style></style>
