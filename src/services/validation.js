import moment from "moment"
import { isEmpty } from "lodash"

/**
 * Vérification si un champ est un nombre
 */
export function isNumber() {
  return value => !isNaN(value) || "Doit être un nombre."
}

/**
 * Vérification de la taille maximum autorisée pour un champ
 * @param {maxSize} Taille maximum autorisée
 */
export function maxSize(maxSize) {
  return value => (value && value.length <= maxSize) || `${maxSize} caractères max.`
}

/**
 * Vérification de la taille maximum autorisée pour un champ
 * Une date non définie est valide
 * @param {maxSize} Taille maximum autorisée
 */
export function maxSizeOrNotSet(maxSize) {
  return value => {
    if (isEmpty(value)) return true

    return (value && value.length <= maxSize) || `${maxSize} caractères max.`
  }
}

/**
 * Vérification d'un champ obligatoire
 */
export function required() {
  return value => !!value || "Obligatoire"
}

/**
 * Vérification de la validité d'une date en fonction d'un format
 * @param {*} format format de la date
 */
export function dateValid(date, format = "YYYY-MM-DD") {
  return (date && moment(date, format, true).isValid()) || "Date non valide."
}

/**
 * Vérification de la validité d'une date en fonction d'un format.
 * Une date non définie est valide
 * @param {*} format format de la date
 */
export function dateValidOrNotSet(date, format = "YYYY-MM-DD") {
  if (isEmpty(date)) return true
  return dateValid(date, format)
}

/**
 * Vérification qu'une date est avant une autre
 * @param {*} dateDebut date qui doit être avant
 * @param {*} dateFin date qui doit être après
 */
export function before(dateDebut, dateFin) {
  return (dateDebut && dateFin && moment(dateDebut).isBefore(dateFin)) || "La date de début doit être inférieure à la date de fin"
}

/**
 * Vérification qu'une date est avant une autre, ou égale (equals)
 * Si dateDebut et/ou DateFin (required) sont non définies la vérification est valide
 * @param {*} dateDebut date qui doit être avant
 * @param {*} dateFin date qui doit être après
 * @param {*} message le message à renvoyer
 * @param {*} equals la date peut être égale ?
 * @param {*} required les deux dates sont obligatoires ?
 * @param {*} filter champ de filtre ?
 * @returns true si les conditions sont respectées, un message sinon
 */
export function beforeOrNotSet(dateDebut, dateFin, message = "La date de début doit être inférieure à la date de fin", equals = false, required = false, filter = false) {
  if ((required || filter) && (isEmpty(dateDebut) || isEmpty(dateFin))) return true
  if (!required && isEmpty(dateDebut) && isEmpty(dateFin)) return true
  return equals
    ? (dateDebut && dateFin && moment(dateDebut).isSameOrBefore(dateFin)) || message
    : (dateDebut && dateFin && moment(dateDebut).isBefore(dateFin)) || message
}

/**
 * Vérification qu'une date est après une autre
 * @param {*} dateDebut date qui doit être avant
 * @param {*} dateFin date qui doit être après
 */
export function after(dateDebut, dateFin) {
  return (dateDebut && dateFin && moment(dateFin).isAfter(dateDebut)) || "La date de fin doit être supérieure à la date de début"
}

/**
 * Vérification qu'une date est après une autre, ou égale (equals)
 * Si dateDebut et/ou DateFin (required) sont non définies la vérification est valide
 * @param {*} dateDebut date qui doit être avant
 * @param {*} dateFin date qui doit être après
 * @param {*} message le message à afficher
 * @param {*} equals la date peut être égale ?
 * @param {*} required les deux dates sont obligatoires ?
 * @param {*} filter champ de filtre ?
 * @returns true si les conditions sont respectées, un message sinon
 */
export function afterOrNotSet(dateDebut, dateFin, message = "La date de fin doit être supérieure à la date de début", equals = false, required = false, filter = false) {
  if ((required || filter) && (isEmpty(dateDebut) || isEmpty(dateFin))) return true
  if (!required && isEmpty(dateDebut) && isEmpty(dateFin)) return true

  return equals ? (dateDebut && dateFin && moment(dateFin).isSameOrAfter(dateDebut)) || message : (dateDebut && dateFin && moment(dateFin).isAfter(dateDebut)) || message
}

const enDateFormat = "YYYY-MM-DD"
const debutAnnee = "01-01"
const finSemestre = "06-30"
const finAnnee = "12-31"
/**
 * Vérification qu'une date est comprise dans le semestre d'une année
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 * @param {*} semestre le semestre dans lequel la date doit se trouver
 * @param {*} oneDayBefore peut se trouver un jour avant
 */
export function inSemester(date, annee, semestre, oneDayBefore = false) {
  return isInCurrentSemester(date, annee, semestre, oneDayBefore) || `La date de début doit être située dans le ${semestre.libelle} de l'année ${annee}`
}

/**
 * Vérification qu'une date est comprise dans le semestre d'une année.
 * Une date non définie est valide
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 * @param {*} semestre le semestre dans lequel la date doit se trouver
 * @param {*} oneDayBefore peut se trouver un jour avant
 */
export function inSemesterOrNotSet(date, annee, semestre, oneDayBefore = false) {
  if (isEmpty(date)) return true
  return inSemester(date, annee, semestre, oneDayBefore)
}

const isInCurrentSemester = (date, annee, semestre, oneDayBefore = false) => {
  let mDateDebAnnee = moment(`${annee}-${debutAnnee}`, enDateFormat)
  let mDateFinSemestre = moment(`${annee}-${finSemestre}`, enDateFormat)
  const mDateFinAnnee = moment(`${annee}-${finAnnee}`, enDateFormat)

  mDateDebAnnee = oneDayBefore ? mDateDebAnnee.subtract(1, "days") : mDateDebAnnee
  mDateFinSemestre = oneDayBefore ? mDateFinSemestre.subtract(1, "days") : mDateFinSemestre

  return semestre.id === 1
    ? moment(date).isSameOrAfter(mDateDebAnnee) && moment(date).isSameOrBefore(mDateFinSemestre)
    : moment(date).isAfter(mDateFinSemestre) && moment(date).isSameOrBefore(mDateFinAnnee)
}

/**
 * Vérification qu'une date est avant la fin d'un semestre d'une année + 1
 * @param {*} date date à vérifier
 * @param {*} annee l'année - 1 dans laquelle la date doit se trouver
 * @param {*} semestre le semestre dans lequel la date doit se trouver
 * @param {*} oneDayAfter peut se trouver un jour après
 */
export function beforeSemesterOneYearLater(date, annee, semestre, oneDayAfter = false) {
  return (
    isBeforeSemesterOneYearLater(date, annee, semestre, oneDayAfter) ||
    `La date de fin doit être située entre le ${semestre.libelle}  ${annee} et le ${semestre.libelle}  ${annee + 1}`
  )
}

/**
 * Vérification qu'une date est avant la fin d'un semestre d'une année + 1.
 * Une date non définie est valide
 * @param {*} date date à vérifier
 * @param {*} annee l'année - 1 dans laquelle la date doit se trouver
 * @param {*} semestre le semestre dans lequel la date doit se trouver
 * @param {*} oneDayAfter peut se trouver un jour après
 */
export function beforeSemesterOneYearLaterOrNotSet(date, annee, semestre, oneDayAfter = false) {
  if (isEmpty(date)) return true
  return beforeSemesterOneYearLater(date, annee, semestre, oneDayAfter)
}

const isBeforeSemesterOneYearLater = (date, annee, semestre, oneDayAfter = false) => {
  const mDateDebAnnee = moment(`${annee}-${debutAnnee}`, enDateFormat)
  const mDateFinSemestre = moment(`${annee}-${finSemestre}`, enDateFormat)
  let mDateFinSemOneYearLater = moment(`${annee}-${finSemestre}`, enDateFormat).add(1, "years")
  let mDateFinOneYearLater = moment(`${annee}-${finAnnee}`, enDateFormat).add(1, "years")

  mDateFinSemOneYearLater = oneDayAfter ? mDateFinSemOneYearLater.add(1, "days") : mDateFinSemOneYearLater
  mDateFinOneYearLater = oneDayAfter ? mDateFinOneYearLater.add(1, "days") : mDateFinOneYearLater
  return semestre.id === 1
    ? moment(date).isSameOrAfter(mDateDebAnnee) && moment(date).isSameOrBefore(mDateFinSemOneYearLater)
    : moment(date).isAfter(mDateFinSemestre) && moment(date).isSameOrBefore(mDateFinOneYearLater)
}

/**
 * Vérification d'une liste obligatoire
 */
export function notEmpty(list) {
  return !isEmpty(list) || "Obligatoire"
}

/**
 * Vérification qu'une date est comprise dans une année
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 */
export function inYear(date, annee) {
  return moment(date).years() === annee || `La date doit être située dans l'année ${annee}`
}

/**
 * Vérification qu'une date est comprise dans une année.
 * Une date non définie est valide
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 */
export function inYearOrNotSet(date, annee) {
  if (isEmpty(date)) return true
  return inYear(date, annee)
}

/**
 * Vérification qu'une date est dans une année ou année + 1
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 */
export function inYearOrYearLater(date, annee) {
  return moment(date).years() === annee || moment(date).years() === annee + 1 || `La date doit être située dans l'année ${annee} ou dans l'année suivante`
}

/**
 * Vérification qu'une date est dans une année ou année + 1
 * Une date non définie est valide
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 */
export function inYearOrYearLaterOrNotSet(date, annee) {
  if (isEmpty(date)) return true
  return inYearOrYearLater(date, annee)
}

/**
 * Vérification qu'une date est dans une année ou année - 1
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 */
export function inYearOrYearBefore(date, annee) {
  return moment(date).years() === annee || moment(date).years() === annee - 1 || `La date doit être située dans l'année ${annee} ou dans l'année précédente`
}

/**
 * Vérification qu'une date est dans une année ou année - 1
 * Une date non définie est valide
 * @param {*} date date à vérifier
 * @param {*} annee l'année dans laquelle la date doit se trouver
 */
export function inYearOrYearBeforeOrNotSet(date, annee) {
  if (isEmpty(date)) return true
  return inYearOrYearBefore(date, annee)
}

/**
 * La date est requise, si une autre est renseignée
 * @param {*} firstDate date à vérifier
 * @param {*} secondDate autre date qui la rend obligatoire
 */
export function secondDateRequired(firstDate, secondDate) {
  if (!isEmpty(firstDate)) return true
  return isEmpty(secondDate) || "Obligatoire"
}
