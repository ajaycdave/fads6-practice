
/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-report
*/

def cronSchedule = "TZ=Europe/Helsinki\n0 5 * * *"
def timeoutMinutes = "30"

def stages = [
    'Item status count report': 'sh itemStatusCountReport.sh',
    'Item type count report': 'sh itemTypeCountReport.sh',
    'Item quick statistics count report': 'sh itemQuickStatisticstReport.sh',
    'Call click from dealer page report': 'php bin/console fa:update:ga-statistic-counter --type=call_from_dealer  --metrics=ga:totalEvents,ga:uniqueEvents --dimensions=ga:pagePath --filters=ga:eventAction==Click-callLinkClickFromDealerPage',
    'Dealer page views report': 'php bin/console fa:update:ga-statistic-counter --type=dealer_page_view --metrics=ga:totalEvents,ga:uniqueEvents --dimensions=ga:pagePath --filters=ga:eventAction==viewDealerDetailPage',
    'Call click from item page report': 'php bin/console fa:update:ga-statistic-counter --type=call_from_item --metrics=ga:productDetailViews --dimensions=ga:productSku --filters=ga:eventAction==Click-callLinkClickFromItem',
    'Item list view report': 'php bin/console fa:update:ga-statistic-counter --type=item_list_page_view --metrics=ga:productListViews --dimensions=ga:productSku --filters=ga:eventAction==ItemListView',
    'Sharing click from item page report': 'php bin/console fa:update:ga-statistic-counter --type=shared_link_pressed --metrics=ga:totalEvents --dimensions=ga:eventLabel --filters=ga:eventAction==Click-sharingFromItem',
    'User report': 'php bin/console fa:update:user-report all'
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

