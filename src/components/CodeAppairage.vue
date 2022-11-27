<template>
  <div class="main">
    <div class="wrapper">
      <div class="sousTitre">
        <h2>
          <span v-html="$t('message.codeAppairage')"> 
          </span>
          
        </h2>
      </div>
      <div class="codeConteneur">
        <div class="code">
          {{codeAppairage || $t("message.appairage.chargement")}}
        </div>
      </div>
      <div class="SmartNews">
        {{$t("message.smartnews")}}
      </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
    </div> 
  </div>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState("smartNewsStore", ["codeAppairage", "token"]),
  },
  data() {
    return {
      intervalInitAppairage: null
    }
  },
  methods: {
    ...mapActions("smartNewsStore", ["initPage", "initAppairage"]),
  },
  created() {
    this.initAppairage()
    this.intervalInitAppairage = setInterval(this.initAppairage, 2000)
  },
  beforeDestroy() {
    clearInterval(this.intervalInitAppairage)
  }
}

</script>
<style>
.wrapper {
  background-color: #007d8f;
  color: white;
  text-align: center;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
  position : fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}
.sousTitre{
  grid-column: 2 / 8;
  grid-row: 1 / 2;
  font-size: 2.5em;
  margin: auto;
}
.codeConteneur{
  grid-column: 3 / 7;
  grid-row: 4 / 5;
  margin: 1em;
  border: solid 3px black;
  border-radius: 8px;
  background-color: white;
}
.code{
  margin: auto;
  color: black;
  font-size: 6em;
}
.SmartNews{
  grid-column: 1 / 1;
  grid-row: 8 / 8;
  margin: auto;
  font-size: 2em;
}
.logo{
  grid-column: 8 / 8;
  grid-row: 8 / 8;
  margin: auto;
}
</style>