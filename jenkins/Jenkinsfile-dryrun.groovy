/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-dryrun
*/

def cronSchedule = ""
def timeoutMinutes = ""

def stages = [
    'Testing cron by jenkins': 'sh testjenkinscron.sh'
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
                    sh """
                          ecs-run-task
                             --cluster fads-test-ecs
                             --task-def fads-test-cron
                             ${command}
                    """.replace('\n', ' ')
            } catch (error) {
                echo error.toString()
                currentBuild.result = 'FAILURE'
            }
        }
    }
}

