node('') {

stage 'buildInDevelopment'

openshiftBuild(namespace: 'cicd', buildConfig: 'dash-monitoring-front', showBuildLogs: 'true')

stage 'deployInDevelopment'

openshiftDeploy(namespace: 'cicd', deploymentConfig: 'dash-monitoring-front')

openshiftScale(namespace: 'cicd', deploymentConfig: 'dash-monitoring-front',replicaCount: '2')

}
