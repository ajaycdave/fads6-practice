
/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-buynow
*/

def cronSchedule = "TZ=Europe/Helsinki\n*/30 * * * *"
def timeoutMinutes = "30"

def stages = [
    'Item stock alert': 'php bin/console fa:buynow:item-stock-alert',
    'Item out of stock alert': 'php bin/console fa:buynow:item-stock-alert --reminder_type=out_of_stock',
    'Order reminder': 'php bin/console fa:buynow:order-reminder',
    'Cancel order': 'php bin/console fa:buynow:cancel-order'
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

