<template>
  <v-alert :value="alert.display" class="pt-0 ma-2 alert" colored-border prominent border="bottom" :type="alert.type" elevation="2" transition="scale-transition">
    <v-row align="center">
      <v-col class="grow size-limited">{{ alert.text }}</v-col>
      <v-col class="shrink pa-0">
        <v-btn icon small :color="alertColor" @click="dismissAlert" class="mb-0">
          <v-icon dark>mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn icon small :color="alertColor" @click="closeAlert" class="mb-0">
          <v-icon dark>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  name: "Alert",
  computed: {
    ...mapState("commonStore", ["alert"]),
    ...mapGetters("commonStore", ["alertColor"])
  },
  methods: {
    ...mapActions("commonStore", ["closeAlert", "dismissAlert"])
  }
}
</script>

<style lang="scss" scoped>
.alert {
  width: 100%;
  white-space: pre-line;
  .size-limited {
    max-height: 100px;
    overflow-y: auto;
  }
}
</style>
