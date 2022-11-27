<template>
  <div>
    <div class="zoneHaute">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'H')[0].images" />
    </div>
    <div class="zoneBasGauche">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'BG')[0].images" />
    </div>
    <div class="zoneBasDroite">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'BD')[0].images" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DefilementImage from "@/components/DefilementImage.vue";

export default {
  name: "HBGBD",
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
.zoneHaute{
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left: 0%;
  top: 0%;
  width: 100%;
  height: 50%;
}
.zoneBasGauche {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left:0%;
  top:50%; 
  width: 50%; 
  height: 50%;
}
.zoneBasDroite {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left: 50%;
  top: 50%;
  width: 50%;
  height: 50%;
}
</style>