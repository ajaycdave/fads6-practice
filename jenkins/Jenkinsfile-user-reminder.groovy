/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-user-reminder
*/

def cronSchedule = "TZ=Europe/Helsinki\n45 1 * * *"
def timeoutMinutes = "30"

def stages = [
    'User has not placed any ad yet': 'php bin/console fa:user:has-not-placed-ad',
    'User has not placed any ad yet in 24 hours': 'php bin/console fa:user:has-not-placed-ad --hours=24',
    'User has not placed any ad yet in 10 days': 'php bin/console fa:user:has-not-placed-ad --hours=240',
    'User has not confirmed email address': 'php bin/console fa:user:has-not-confirmed-email',
    'Private user has not logged yet since last 10 days': 'php bin/console fa:user:login-reminder --user_role_id=ROLE_SELLER --hours=240',
    'Business user has not logged yet since last 10 days': 'php bin/console fa:user:login-reminder --user_role_id=ROLE_BUSINESS_SELLER --hours=240'
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
