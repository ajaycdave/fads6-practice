<?php

/*
 * This file is part of the fa bundle.
 *
 * @copyright Copyright (c) 2017, Fiare Oy
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Appf\Bundle\FrontendBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * AppfFrontendBundle.
 *
 * This bundle contains library classes for data load
 * which are common for whole platform.
 *
 * @author Atul Kamani <atul@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @version v1.0
 */
class AppfFrontendBundle extends Bundle
{
    /**
     * @return string
     */
    public function getParent()
    {
        return 'FafFrontendBundle';
    }
}
