<?php

namespace Appf;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;
use Symfony\Component\Routing\RouteCollectionBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

class FrontKernel extends BaseKernel implements CompilerPassInterface
{
    use MicroKernelTrait;

    const CONFIG_EXTS = '.{php,xml,yaml,yml}';

    public function getCacheDir()
    {
        return $this->getProjectDir().'/var/cache/front/'.$this->environment;
    }

    public function getLogDir()
    {
        return $this->getProjectDir().'/var/log/front';
    }

    public function registerBundles()
    {
        $contents = require $this->getProjectDir().'/config/frontbundles.php';
        foreach ($contents as $class => $envs) {
            if (isset($envs['all']) || isset($envs[$this->environment])) {
                yield new $class();
            }
        }
    }

    public function process(ContainerBuilder $container)
    {
        $container->getDefinition('translator.default')->setPublic(true);
        $container->getDefinition('monolog.logger')->setPublic(true);
        $container->getDefinition('liip_theme.active_theme')->setPublic(true);

        // Below line uncomment if you want to override controller.
        //$container->findDefinition('Faf\Bundle\FrontendBundle\Controller\HomePageController')->setClass('Appf\Controller\HomePageController'::class);
    }

    protected function configureContainer(ContainerBuilder $container, LoaderInterface $loader)
    {
        $container->setParameter('container.autowiring.strict_mode', true);
        $container->setParameter('container.dumper.inline_class_loader', true);
        $confDir = $this->getProjectDir().'/config';
        $loader->load($confDir.'/frontpackages/*'.self::CONFIG_EXTS, 'glob');
        if (is_dir($confDir.'/frontpackages/'.$this->environment)) {
            $loader->load($confDir.'/frontpackages/'.$this->environment.'/**/*'.self::CONFIG_EXTS, 'glob');
        }
        $loader->load($confDir.'/services'.self::CONFIG_EXTS, 'glob');
        $loader->load($confDir.'/services_'.$this->environment.self::CONFIG_EXTS, 'glob');
    }

    protected function configureRoutes(RouteCollectionBuilder $routes)
    {
        $confDir = $this->getProjectDir().'/config';
        if (is_dir($confDir.'/routes/')) {
            $routes->import($confDir.'/routes/*'.self::CONFIG_EXTS, '/', 'glob');
        }
        if (is_dir($confDir.'/routes/'.$this->environment)) {
            $routes->import($confDir.'/routes/'.$this->environment.'/**/*'.self::CONFIG_EXTS, '/', 'glob');
        }
        $routes->import($confDir.'/frontroutes'.self::CONFIG_EXTS, '/', 'glob');
    }

    /**
     * {@inheritdoc}
     *
     * @throws \RuntimeException if a custom resource is hidden by a resource in a derived bundle
     */
    public function locateResource($name, $dir = null, $first = true)
    {
        if ('@' !== $name[0]) {
            throw new \InvalidArgumentException(sprintf('A resource name must start with @ ("%s" given).', $name));
        }

        if (false !== strpos($name, '..')) {
            throw new \RuntimeException(sprintf('File name "%s" contains invalid characters (..).', $name));
        }

        $bundleName = substr($name, 1);
        $path = '';
        if (false !== strpos($bundleName, '/')) {
            list($bundleName, $path) = explode('/', $bundleName, 2);
        }

        $isResource = 0 === strpos($path, 'Resources') && null !== $dir;
        $overridePath = substr($path, 9);
        $resourceBundle = null;
        $bundle = $this->getBundle($bundleName);
        $files = array();

        if ($isResource && file_exists($file = $dir.'/'.$bundle->getName().$overridePath)) {
            if (null !== $resourceBundle) {
                throw new \RuntimeException(sprintf('"%s" resource is hidden by a resource from the "%s" derived bundle. Create a "%s" file to override the bundle resource.',
                    $file,
                    $resourceBundle,
                    $dir.'/'.$bundle->getName().$overridePath
                    ));
            }

            $files[] = $file;
        }

        // check for theme
        if ($isResource && file_exists($file = $this->getProjectDir().'/vendor/fads/frontend/layouts/theme1'.'/'.$bundle->getName().$overridePath)) {
            if (null !== $resourceBundle) {
                throw new \RuntimeException(sprintf('"%s" resource is hidden by a resource from the "%s" derived bundle. Create a "%s" file to override the bundle resource.',
                    $file,
                    $resourceBundle,
                    $dir.'/'.$bundles[0]->getName().$overridePath
                    ));
            }

            if ($first) {
                return $file;
            }
            $files[] = $file;
        }

        // check for theme inside bundle
        $bundleThemePath = 'templates'.'/'.'theme1'.$overridePath;
        if (file_exists($file = $bundle->getPath().'/'.$bundleThemePath)) {
            if ($first && !$isResource) {
                return $file;
            }
            $files[] = $file;
            $resourceBundle = $bundle->getName();
        }

        if (file_exists($file = $bundle->getPath().'/'.$path)) {
            if ($first && !$isResource) {
                return $file;
            }
            $files[] = $file;
            $resourceBundle = $bundle->getName();
        }

        if (count($files) > 0) {
            return $first && $isResource ? $files[0] : $files;
        }

        throw new \InvalidArgumentException(sprintf('Unable to find file "%s".', $name));
    }
}
