/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-item-management
*/

def cronSchedule = "TZ=Europe/Helsinki\n15 1 * * *"
def timeoutMinutes = "30"

def stages = [
    'Single item renew reminder': 'php bin/console fa:item:renew-reminder',
    'Multiple items renew reminder': 'php bin/console fa:item:renew-reminder --several=0',
    'Single item draft reminder': 'php bin/console fa:item:draft-reminder',
    'Multiple item draft reminder': 'php bin/console fa:item:draft-reminder --several=0',
    'Single item expire': 'php bin/console fa:item:expire --hours=24',
    'Multiple item expire': 'php bin/console fa:item:expire --several=0 --hours=24'
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
