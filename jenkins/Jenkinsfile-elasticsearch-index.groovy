
/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-elasticsearch-index
*/

def cronSchedule = "TZ=Europe/Helsinki\n0 2 * * *"
def timeoutMinutes = "30"

def stages = [
    'Location lookup elasticsearch index': 'php bin/console fa:elasticsearch:LocationLookup --last_days="1" update',
    'User elasticsearch index': 'php bin/console fa:elasticsearch:user --last_days="1" --status="A" update',
    'Item elasticsearch index': 'php bin/console fa:elasticsearch:item --last_days="1" --status="A" update'
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

