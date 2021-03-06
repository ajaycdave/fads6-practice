<?php

return [
    Symfony\Bundle\FrameworkBundle\FrameworkBundle::class => ['all' => true],
    Symfony\Bundle\TwigBundle\TwigBundle::class => ['all' => true],
    Csa\Bundle\GuzzleBundle\CsaGuzzleBundle::class => ['all' => true],
    Faf\Bundle\FrontendBundle\FafFrontendBundle::class => ['all' => true],
    FOS\JsRoutingBundle\FOSJsRoutingBundle::class => ['all' => true],
    Symfony\Bundle\WebServerBundle\WebServerBundle::class => ['dev' => true],
    Symfony\Bundle\SecurityBundle\SecurityBundle::class => ['all' => true],
    Symfony\Bundle\WebProfilerBundle\WebProfilerBundle::class => ['dev' => true, 'test' => true],
    Symfony\Bundle\MonologBundle\MonologBundle::class => ['all' => true],
    Faf\Bundle\UtilityBundle\FafUtilityBundle::class => ['all' => true],
    Faf\Bundle\CrudBundle\FafCrudBundle::class => ['all' => true],
    JMS\I18nRoutingBundle\JMSI18nRoutingBundle::class => ['all' => true],
    Faf\Bundle\ItemBundle\FafItemBundle::class => ['all' => true],
    Faf\Bundle\ContentBundle\FafContentBundle::class => ['all' => true],
    Faf\Bundle\CoreBundle\FafCoreBundle::class => ['all' => true],
    Faf\Bundle\EntityBundle\FafEntityBundle::class => ['all' => true],
    Faf\Bundle\UserBundle\FafUserBundle::class => ['all' => true],
    Faf\Bundle\TwigBundle\FafTwigBundle::class => ['all' => true],
    Faf\Bundle\CmsBundle\FafCmsBundle::class => ['all' => true],
    Faf\Bundle\QuickLinkBundle\FafQuickLinkBundle::class => ['all' => true],
    Faf\Bundle\PromotionBundle\FafPromotionBundle::class => ['all' => true],
    Faf\Bundle\BranchBundle\FafBranchBundle::class => ['all' => true],
    Faf\Bundle\PaymentBundle\FafPaymentBundle::class => ['all' => true],
    Translation\Bundle\TranslationBundle::class => ['all' => true],
    WhiteOctober\PagerfantaBundle\WhiteOctoberPagerfantaBundle::class => ['all' => true],
    Faf\Bundle\TranslationBundle\FafTranslationBundle::class => ['all' => true],
    Knp\Bundle\SnappyBundle\KnpSnappyBundle::class => ['all' => true],
    Faf\Bundle\MessageBundle\FafMessageBundle::class => ['all' => true],
    Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle::class => ['all' => true],
    Faf\Bundle\FavoriteBundle\FafFavoriteBundle::class => ['all' => true],
    Faf\Bundle\NotificationBundle\FafNotificationBundle::class => ['all' => true],
    Faf\Bundle\LandingPageBundle\FafLandingPageBundle::class => ['all' => true],
    Faf\Bundle\SearchAgentBundle\FafSearchAgentBundle::class => ['all' => true],
    Faf\Bundle\ErrorBundle\FafErrorBundle::class => ['all' => true],
    Snc\RedisBundle\SncRedisBundle::class => ['all' => true],
    Faf\Bundle\FeedbackBundle\FafFeedbackBundle::class => ['all' => true],
    Faf\Bundle\ReportBundle\FafReportBundle::class => ['all' => true],
    Faf\Bundle\SeoBundle\FafSeoBundle::class => ['all' => true],
    PhpMob\TwigModifyBundle\PhpMobTwigModifyBundle::class => ['all' => true],

    // Added for by pass api and enabled Doctrine in frontend
    Doctrine\Bundle\DoctrineCacheBundle\DoctrineCacheBundle::class => ['all' => true],
    Doctrine\Bundle\DoctrineBundle\DoctrineBundle::class => ['all' => true],
    Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle::class => ['dev' => true, 'test' => true],
    Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle::class => ['all' => true],

    // upper level bundles
    Appf\Bundle\FrontendBundle\AppfFrontendBundle::class => ['all' => true],

    Symfony\Bundle\DebugBundle\DebugBundle::class => ['dev' => true, 'test' => true],
    Faf\Bundle\BuynowBundle\FafBuynowBundle::class => ['all' => true],
    Liip\ThemeBundle\LiipThemeBundle::class => ['all' => true],
];
