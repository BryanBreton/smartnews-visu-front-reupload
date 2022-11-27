<template>
  <v-tooltip v-if="alert.recall" top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="recall" fab small dark fixed bottom right :color="alertColor" @click="setAlertDisplay(true)">
        <v-icon dark>{{ alertIcon }}</v-icon>
      </v-btn>
    </template>
    <span>Visualiser l'alerte</span>
  </v-tooltip>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  name: "DisplayAlertButton",
  computed: {
    ...mapState("commonStore", ["alert"]),
    ...mapGetters("commonStore", ["alertColor", "alertIcon"])
  },
  methods: {
    ...mapActions("commonStore", ["setAlertDisplay"])
  }
}
</script>

<style lang="scss" scoped>
.recall {
  z-index: 300;
}
</style>
