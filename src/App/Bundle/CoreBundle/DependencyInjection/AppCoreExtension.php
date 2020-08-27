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

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 *
 * @author Vishal Keraliya <vishal@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @version v1.0
 */
class AppCoreExtension extends Extension
{
    /**
     * Loads a specific configuration.
     *
     * @param array            $config    an array of configuration values
     * @param ContainerBuilder $container a ContainerBuilder instance
     *
     * @throws \InvalidArgumentException when provided tag is not defined in this extension
     *
     * @api
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        //$loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
    }
}
