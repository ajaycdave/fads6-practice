
/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-2hours
*/

def cronSchedule = "TZ=Europe/Helsinki\n0 */2 * * *"
def timeoutMinutes = "15"

def stages = [
    'Redeem unused promotion code from cart': 'php bin/console fa:generate:idle-cart-promocode-process --hours=2',
    'Clear cart item': 'php bin/console fa:buynow:clear-cart-item'
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

