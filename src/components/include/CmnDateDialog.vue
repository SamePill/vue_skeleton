<template>
  <v-dialog
    ref="dialog"
    v-model="opened"
    :return-value.sync="dateVal"
    persistent
    width="290"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateVal"
        :label="title"
        append-icon="event"
        readonly
        dense
        outlined
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="dateVal" scrollable locale="ko-kr">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="opened = false">취소</v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(dateVal)"
        >선택</v-btn
      >
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["date", "open", "title"],
  data: () => ({
    opened: false
  }),
  computed: {
    dateVal: {
      get: function() {
        return this.date;
      },
      set: function(val) {
        this.$emit("update:dateValue", val);
      }
    }
  }
};
</script>
