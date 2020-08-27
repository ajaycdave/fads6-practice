/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-search-agent-alert
*/

def cronSchedule = "TZ=Europe/Helsinki\n15 0 * * *"
def timeoutMinutes = "30"

def stages = [
    'Search agent alert': 'php bin/console fa:update:search-agent-alert'
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
