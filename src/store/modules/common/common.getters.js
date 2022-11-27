import { getColorFromType, getIconFromType } from "@/utils/utils"
export default {
  alertColor: state => getColorFromType(state.alert.type),
  alertIcon: state => getIconFromType(state.alert.type)
}
