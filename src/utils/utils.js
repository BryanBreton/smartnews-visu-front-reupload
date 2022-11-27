export function getColorFromType(type) {
  if (type === "error") return "red"
  else if (type === "warning") return "orange"
  else if (type === "success") return "green"
  else return "blue"
}

export function getIconFromType(type) {
  if (type === "error") return "mdi-alert"
  else if (type === "warning") return "mdi-alert-circle"
  else if (type === "success") return "mdi-checkbox-marked-circle"
  else return "mdi-information"
}
