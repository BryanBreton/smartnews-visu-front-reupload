<template >
    <img class="zone__img" :src="urlImage"/> 
</template>

<script>
import { mapState } from 'vuex';
import { getImage } from '@/utils/fonctions';

export default {
  computed: {
    ...mapState("smartNewsStore", ["zones"])
  },
  props: ['images'],
  data : function(){
    return {
      indiceImage: 0,
      urlImage: '',
      tempoImg: null
    }
  },
  methods:{
    iterateImage(){
      [this.indiceImage, this.urlImage, this.tempoImg] = getImage(this.images,this.indiceImage,this.urlImage,this.tempoImg)
      setTimeout(this.iterateImage,this.tempoImg)
    }
  },
  mounted(){
    this.iterateImage()
  }
}

</script>
<style scoped>
.zone__img{
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>