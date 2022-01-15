<template>
  <v-menu v-model="showMenu" offset-y max-width="120">
    <template v-slot:activator="{ on }">
      <v-btn class="btnLocaleActivation" v-on="on" text max-width="120" >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-icon>mdi-earth</v-icon>
        &nbsp;{{ displayLocale }}
        <country-flag :country="displayflag"  />
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        active-class="white--text"
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        :value="item.lang"
        @click="switchLocale(item)"
        :class="[item.class]"
      >
        <country-flag :country="item.flag" size="small" />
        <v-list-item-title class="ml-3">{{
          item.lang.toUpperCase()
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  data() {
    return {
      showMenu: false,
      langs: [
        {
          lang: 'en',
          flag: 'gb',
          class: 'btnEN'
        },
        {
          lang: 'es',
          flag: 'es',
          class: 'btnES'
        },
        {
          lang: 'fr',
          flag: 'fr',
          class: 'btnFR'
        },
        {
          lang: 'kr',
          flag: 'kr',
          class: 'btnKR'
        }
      ]
    }
  },
  components: {
    CountryFlag
  },
  methods: {
    switchLocale(item) {
      this.$store.dispatch('setLocale', item.lang);
      this.$store.commit("SET_LOCALE_FLAG", item.flag);
    }
  },
  computed: {
    displayLocale() {
      return this.$i18n.locale
    },
    displayflag() {
      return this.$store.getters.localeFlag;
    }
  }
}
</script>

<style>
.flag {
  width: 118px !important;
}
.v-list-item {
  min-width: 185px !important;
}
</style>