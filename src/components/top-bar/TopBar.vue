<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>

    <v-toolbar-title>Projet smartnews-visu-front</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-chip class="ma-2" color="red" v-show="!isOnline">Hors ligne</v-chip>
    <iris-logout-dropdown :arrow="false" v-on:logoutEvent="logout()">
      <template slot="avatar">
        <iris-avatar
          :size="40"
          :username="`${utilisateurConnecte.prenom} ${utilisateurConnecte.nom}`"
          :background-color="backgroundColor"
          :color="fontColor"
        ></iris-avatar>
      </template>
    </iris-logout-dropdown>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "TopBar",
  data: () => ({
    backgroundColor: "#056f90",
    fontColor: "white"
  }),
  computed: {
    ...mapState("commonStore", ["utilisateurConnecte"])
  },
  methods: {
    ...mapActions("commonStore", ["logout"])
  }
}
</script>
