<template>
  <div>
    <div class="PleinePage">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'PP')[0].images" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DefilementImage from "@/components/DefilementImage.vue";

export default {
  name: "PP",
  components : {
    DefilementImage
  },
  mounted(){
    this.intervalSmartNews = setInterval(() => this.initPage(), process.env.VUE_APP_INTERVAL_RELOAD_DATA_PAGE)
  },
  computed:{
    ...mapState("smartNewsStore", ["idPage", "idModele", "zones"])
  },
  methods: {
    ...mapActions("smartNewsStore", ["initPage"])
  },
  beforeDestroy(){
    clearInterval(this.intervalSmartNews)
  }
}
</script>

<style scoped>
.PleinePage {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
}
</style>