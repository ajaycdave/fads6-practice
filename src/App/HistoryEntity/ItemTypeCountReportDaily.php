<?php

/*
 * This file is part of the fa bundle.
 *
 * @copyright Copyright (c) 2017, Fiare Oy
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\HistoryEntity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Fa\Bundle\ItemBundle\HistoryEntity\Item.
 *
 * This table is used to store ad information.
 *
 * @author Hardik Raval <hardikr@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @ORM\Table(name="item_type_count_report_daily", indexes={@ORM\Index(name="fa_item_type_count_report_daily_created_at_index", columns={"created_at"}), @ORM\Index(name="fa_item_type_count_report_daily_category_id_index", columns={"category_id"}), @ORM\Index(name="fa_item_type_count_report_daily_type_id_index", columns={"type_id"}), @ORM\Index(name="fa_item_type_count_report_daily_level_index", columns={"level"}) })
 * @ORM\Entity(repositoryClass="Fa\Bundle\CoreBundle\Repository\Core")
 * @ORM\HasLifecycleCallbacks
 */
class ItemTypeCountReportDaily
{
    use \Fa\Bundle\ItemBundle\HistoryEntity\ItemTypeCountReportDailyTrait;
}
