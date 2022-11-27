<template>
  <div>
    <div class="zoneGauche">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'G23-1')[0].images" />
    </div>
    <div class="zoneHautDroite">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'HD13-25')[0].images" />
    </div>
    <div class="zoneBasDroite">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'BD13-35')[0].images" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DefilementImage from "@/components/DefilementImage.vue";

export default {
  name: "G23-1HD13-25BD13-35",
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
.zoneGauche {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left:0%; 
  top:0%; 
  width: 66%; 
  height: 100%;
}
.zoneHautDroite {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left:66%; 
  top:0%; 
  width: 33%; 
  height: 40%;
}
.zoneBasDroite {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left:66%; 
  top:40%; 
  width: 33%; 
  height: 60%;
}
</style>