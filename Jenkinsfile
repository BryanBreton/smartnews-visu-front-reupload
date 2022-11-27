#!groovy
@Library('gie') _

k8sContinuousDeployment (
        authProvider: 'none',
        deployer: 'kubernetes',
        builder: 'npm',
        slackChannel: 'smartnews-stream',
        alias: 'smartnews-visu-front',
        imageForBuild: 'docker-registry-iris.groupement.systeme-u.fr/iris-factory/npm:6.14-node14.15',
        allowManualDeployment: true,
        forceEligibilityForRelease: true,
        commercialName: 'smartnews-visu-front',
        kubernetesDeployer: [
                namespace: 'smartnews',
                manifestRepository: 'https://github.com/ugieiris/k8s-deploy-ded-ge-rhc.git',
                integration: [
                        cluster: 'dev-gke-app'
                ],
                recette: [
                        cluster: 'rec-gke-app'
                ],
                production: [
                        cluster: 'prod-gke-app'
                ]
        ],
        smokeTestRunner: [
                rec1: [
                        // 	testRunner: 'cypress',
                        // 	parameters: [
                        //         smUserProfile : 'Centrale',
                        //         smCentrale    : "Centrale Nationale",
                        //         credentials   : "CREDENTIALS",
                        //         smAppUrl      : 'URL_PROJET_RECETTE' // TODO
                        // 	]
                ],
                prod: [
                        // 	testRunner: 'cypress',
                        // 	parameters: [
                        //         smUserProfile : 'Centrale',
                        //         smCentrale    : "Centrale Nationale",
                        //         credentials   : "CREDENTIALS", // TODO
                        //         smAppUrl      : 'URL_PROJET_PROD' // TODO
                        // 	]
                ]
        ]
)
