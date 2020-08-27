<?php

/*
 * This file is part of the fa bundle.
 *
 * @copyright Copyright (c) 2017, Fiare Oy
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Bundle\CoreBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 *
 * @author Vishal Keraliya <vishal@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @version v1.0
 */
class Configuration implements ConfigurationInterface
{
    /**
     * Get config tree builder.
     *
     * @return object
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('app_core');

        // Here you should define the parameters that are allowed to
        // configure your bundle. See the documentation linked above for
        // more information on that topic.

        return $treeBuilder;
    }
}