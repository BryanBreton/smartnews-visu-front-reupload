<template>
  <div>
    <div class="zoneGauche">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'G')[0].images" />
    </div>
    <div class="zoneHautDroite">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'HD')[0].images" />
    </div>
    <div class="zoneBasDroite">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'BD')[0].images" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DefilementImage from "@/components/DefilementImage.vue";

export default {
  name: "GHDBD",
  components : {
    DefilementImage
  },
  mounted(){
    this.intervalSmartNews = setInterval(() => this.initPage(), process.env.VUE_APP_INTERVAL_RELOAD_DATA_PAGE)
  },
  computed:{
    ...mapState("smartNewsStore", ["idPage", "idModele", "zones"]),
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
.zoneGauche {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left:0%; 
  top:0%; 
  width: 50%; 
  height: 100%;
}

.zoneHautDroite {
  overflow: hidden;
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left: 50%;
  top: 0%;
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