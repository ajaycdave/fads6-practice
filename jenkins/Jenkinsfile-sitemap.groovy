
/*
Job naming format: PROJECT-ENVIRONMENT-job-name

Example:
PROJECT= fads6
ENVIRONMENT = test
Job name = fads6-test-cron-sitemap
*/

def cronSchedule = "TZ=Europe/Helsinki\n30 2 * * *"
def timeoutMinutes = "30"

def stages = [
    'Item category sitemap': 'php bin/console fa:generate:item-category-sitemap --file_name=sitemap_item_category',
    'Item location sitemap': 'php bin/console fa:generate:item-location-sitemap --file_name=sitemap_item_location',
    'Item category-location sitemap': 'php bin/console fa:generate:item-location-category-sitemap --file_name=sitemap_item_location_and_category',
    'Item detail sitemap': 'php bin/console fa:generate:item-detail-sitemap --file_name=sitemap_item_detail',
    'Item category sitemap': 'php bin/console fa:generate:item-get-category-sitemap --file_name=sitemap_item_get_category',
    'Dealer sitemap': 'php bin/console fa:generate:dealers-sitemap --file_name=sitemap_dealers',
    'Article list sitemap': 'php bin/console fa:generate:articles-sitemap --file_name=sitemap_article',
    'Article detail category sitemap': 'php bin/console fa:generate:article-detail-sitemap --file_name=sitemap_article_details',
    'Generate sitemap index file': 'php bin/console fa:generate:sitemapxml'
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

