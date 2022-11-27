// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const path = require('path');

module.exports = (on, config) => {
  // Couverture de tests
  require('@cypress/code-coverage/task')(on, config)

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === "chrome") {
      // Ajout de l'extension "ignore-x-frame-headers" afin de passer l'authentification Forgerock quand on n'est pas en HTTPS
      launchOptions.extensions.push(path.join(__dirname, '../extensions/ignore-x-frame-headers'))
      launchOptions.args.push("--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure,CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process")

      // Paramétrage des préférences pour utiliser les cookies forgerock (flags expérimentaux cookies samesite)
      launchOptions.preferences.localState.browser = {
        enabled_labs_experiments: [
          'cookies-without-same-site-must-be-secure@2',
          'enable-removing-all-third-party-cookies@2',
          'same-site-by-default-cookies@2'
        ]
      }
      // Augmente la mémoire allouée à Chrome par Docker
      launchOptions.args.push('--disable-dev-shm-usage')
    }
    return launchOptions
  })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return Object.assign({}, config, {
    integrationFolder: "cypress/tests"
  })
}
