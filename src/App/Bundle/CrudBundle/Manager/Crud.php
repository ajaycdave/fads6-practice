<?php
/*
 * This file is part of the fa bundle.
 *
 * @copyright Copyright (c) 2017, Fiare Oy
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Bundle\CrudBundle\Manager;

/**
 * Core form type manager.
 *
 * @author Hiren Chhatbar <hiren@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @version 1.0
 */
abstract class Crud
{
    use \Fa\Bundle\CrudBundle\Manager\Crud;

    const IMAGE_SIZE_THUMB_OPTION_1 = 1;  // 1 => Aspect ratio
    const IMAGE_SIZE_THUMB_OPTION_2 = 2;  // 2 => Aspect ratio with whitebackground
    const IMAGE_SIZE_THUMB_OPTION_3 = 3;  // 3 => Exact size
}