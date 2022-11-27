<template>
  <CodeAppairage/>
</template>

<script>
import { mapState } from 'vuex'
import CodeAppairage from '@/components/CodeAppairage.vue'

export default {
  name: "Appairage",
  components : {
    CodeAppairage
  },
  computed: {
    ...mapState("smartNewsStore", ["codeAppairage", "token"]),
  }
}

</script>