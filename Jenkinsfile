final gitCredentials = '71956739-87d0-44d6-bb32-8bbf8699a5f3'

pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo "Git platform pull for branch ${env.BRANCH_NAME}"
                        echo "Git frontend pull for branch ${env.BRANCH_NAME}"
                        echo "Git infra pull"
                    } else {
                        echo "Git platform pull for branch ${env.BRANCH_NAME}"
                        dir('vendor/fads/platform') {
                            git branch: 'dev', credentialsId: gitCredentials, url: 'https://github.com/Fiare/fads6.git'
                        }

                        echo "Git frontend pull for branch ${env.BRANCH_NAME}"
                        dir('vendor/fads/frontend') {
                            git branch: 'dev', credentialsId: gitCredentials, url: 'https://github.com/Fiare/fads6-frontend-bundle.git'
                        }

                        echo "Git infra pull"
                        dir('infra') {
                            git branch: 'test_v6', credentialsId: gitCredentials, url: 'https://github.com/Fiare/fads6-infra.git'
                        }
                    }
               }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo "Building branch ${env.BRANCH_NAME}"
                    } else {
                        echo "Building branch ${env.BRANCH_NAME}"
                        echo "Replacing configuration value"
                        sh './infra/app-config test'
                        echo "Building docker image for php and nginx"
                        sh 'infra/bin/build-docker -pfads6 wkhtmltopdf php nginx'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    dir('infra/ecs/deployment') {
                       if (env.BRANCH_NAME == 'master') {
                           echo "Deploying ${env.BRANCH_NAME} to production AWS"
                       } else {
                            echo "Deploying ${env.BRANCH_NAME} to test AWS"
                            sh './deployment-sql fads6 test pre-deployment'
                            sh '../../bin/deploy-terraform -pfads6 test apply'
                            sh './deployment-sql fads6 test post-deployment'
                       }
                    }
                }
            }
        }
    }
}
