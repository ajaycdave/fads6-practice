/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-remove-temp-data
*/

def cronSchedule = "TZ=Europe/Helsinki\n30 3 * * *"
def timeoutMinutes = "30"

def stages = [
    'Remove data from temp directory in AWS': 'php bin/console fa:remove:temp:data --from="aws"',
    'Remove data from temp directory in Local': 'php bin/console fa:remove:temp:data --from="local"',
    'Remove cms gallery temp data of last 1 day': 'php bin/console fa:remove:temp:gallery:data --entity_name="cms_gallery" --days=1',
    'Remove item temp data of last 1 day': 'php bin/console fa:remove:temp:gallery:data --entity_name="item_gallery" --days=1'
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
