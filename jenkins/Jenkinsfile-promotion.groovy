/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-promotion
*/

def cronSchedule = "TZ=Europe/Helsinki\n5 4 * * *"
def timeoutMinutes = "30"

def stages = [
    'User subscription ending reminder': 'php bin/console fa:user:subscription-ending-reminder',
    'User subscription has ended': 'php bin/console fa:user:subscription-has-ended',
    'Activate item upcoming package': 'php bin/console fa:item:activate-upcoming-package --hours=24',
    'Expire upsell': 'php bin/console fa:upsellexpire:upsell',
    'Upsell renew reminder before 72 hours': 'php bin/console fa:promotion:renew-reminder --hours=72'
]

def environment = ((env.JOB_NAME.tokenize('/'))[2].tokenize('-')[1])

assert (environment in ['test', 'production'])

node {
    properties([
        pipelineTriggers([cron(cronSchedule)]),
        buildDiscarder(logRotator(numToKeepStr: '14')),
        disableConcurrentBuilds()
    ])

    stages.each { stageName, command ->
        stage(stageName) {
            try {
                timeout(timeoutMinutes) {
                    sh """
                          ecs-run-task
                             --cluster fads-test-ecs
                             --task-def fads-test-cron
                             ${command}
                    """.replace('\n', ' ')
                }
            } catch (error) {
                echo error.toString()
                currentBuild.result = 'FAILURE'
            }
        }
    }
}
