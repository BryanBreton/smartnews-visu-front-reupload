<template>
  <v-dialog width="300" v-model="updateExists">
    <v-card>
      <v-card-title class="headline">
        Nouvelle version
      </v-card-title>

      <v-card-text>
        Une nouvelle version de l'application est disponible !
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="refreshApp">
          Recharger
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ReloadButton",
  created() {
    // Listen for our custom event from the SW registration
    document.addEventListener("swUpdated", this.updateAvailable, { once: true })
    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return
      this.refreshing = true
      // Here the actual reload of the page occurs
      window.location.reload()
    })
  },
  data() {
    return {
      // refresh variables
      refreshing: false,
      registration: null,
      updateExists: false
    }
  },
  methods: {
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true
    },
    refreshApp() {
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" })
    }
  }
}
</script>