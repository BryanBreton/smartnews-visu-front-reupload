<template>
  <div>
    <div class="bandeau">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'BA1-17')[0].images" />
    </div>
    <div class="zoneGauche">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'G23-67')[0].images" />
    </div>
    <div class="zoneDroite">
      <DefilementImage :images="zones.filter((zone) => zone.nom === 'D13-67')[0].images" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions} from "vuex";
import DefilementImage from "@/components/DefilementImage.vue";

export default {
  name: "BA1-17G23-67D13-67",
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
.bandeau {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left: 0%;
  top: 0%;
  width: 100%;
  height: 14%;
}
.zoneGauche {
  overflow: hidden;
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left: 0%;
  top: 14%;
  width: 66%;
  height: 86%;
}
.zoneDroite {
  overflow: hidden;
  display: flex; 
  justify-content: center; 
  position: absolute; 
  left:66%; 
  top:14%; 
  width: 33%; 
  height: 86%;
}
</style>