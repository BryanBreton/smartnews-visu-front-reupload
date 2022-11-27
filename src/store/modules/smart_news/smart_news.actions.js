import adminService from "@/services/http/adminService"
import router from "@/router"

export default {
  async initPage({ commit }) {
    if (localStorage.getItem("token") !== null) {
      // -> récupérer la page avec le token

      const retourMS = await adminService.post("pages", {localDateTime : localStorage.getItem("dateMaj")})
      const { idModele, zones, dateMaj } = retourMS

      //if(idModele !== undefined && zones !== undefined){
      if(!idModele || !zones){ //à retester une fois que le bucket est plus mort
        commit("setIdModele", idModele)
        commit("setZones", zones)
        commit("setDateMaj", dateMaj)
        localStorage.setItem("dateMaj", dateMaj)

        switch (idModele) {
          case "PP":
            router.push("/PleinePage")
            break
          case "HB":
            router.push("/HautBas")
            break
          case "HBGBD":
            router.push("/HautBasGaucheBasDroit")
            break
          case "G23-1HD13-25BD13-35":
            router.push("/GaucheHautDroitBasDroit2")
            break
          case "GHDBD":
            router.push("/GaucheHautDroitBasDroit1")
            break
          case "BA1-17G23-67D13-67":
            router.push("/bandeau")
            break
          case "G13-1HD23-12BD23-12":
            router.push("/GaucheHautDroitBasDroit3")
            break
          case "HGHDBG13-12BD23-12":
            router.push("/4zones2")
            break
          case "HGHDBGBD":
            router.push("/4zones1")
            break
          case "G23-1HD13-12BD13-12":
            router.push("/GaucheHautDroitBasDroit4")
            break
          case "GD":
            router.push("/GaucheDroite")
            break
          default:
            break
        }
      }
      
    }
  },

  async initAppairage({ commit, state }) {
    if (!state.codeAppairage) {
      const { codeAppairage } = await adminService.get("appairage/code")
      commit("setCodeAppairage", codeAppairage)
    } else {
      try{
        const { token } = await adminService.getOne("appairage/token", state.codeAppairage)
        const tokenExists = localStorage.getItem("token") !== null
        if(!tokenExists && token!==null){
        //if(!tokenExists || !token){

          commit("setToken", token)
          localStorage.setItem("token", token)

          router.push('/').catch((e) => {Promise.reject(e)})
        }
      }catch(e){
        console.error("CodeAppairage dépassé ou invalide, génération d'un nouveau code d'appairage")
        commit("setCodeAppairage",null)
        router.push('/appairage')
      }
    }
  }
}
