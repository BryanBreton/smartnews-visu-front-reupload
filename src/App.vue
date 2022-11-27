<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  name: "App",
  computed: {
    ...mapState("commonStore", ["isLoading"]),
    ...mapState("smartNewsStore", ["token"])
  },
  methods: {
    ...mapActions("smartNewsStore", ["initPage"]),
  },
  async created() {
    this.initPage(this.token)
  },
}
</script>
