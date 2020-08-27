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
 * @author Amit Limbadia <amitl@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @ORM\Table(name="item_status_count_report_daily", indexes={@ORM\Index(name="fa_item_status_count_report_daily_created_at_index", columns={"created_at"}), @ORM\Index(name="fa_item_status_count_report_daily_category_id_index", columns={"category_id"}), @ORM\Index(name="fa_item_status_count_report_daily_status_id_index", columns={"status_id"}), @ORM\Index(name="fa_item_status_count_report_daily_level_index", columns={"level"}) })
 * @ORM\Entity(repositoryClass="Fa\Bundle\CoreBundle\Repository\Core")
 * @ORM\HasLifecycleCallbacks
 */
class ItemStatusCountReportDaily
{
    use \Fa\Bundle\ItemBundle\HistoryEntity\ItemStatusCountReportDailyTrait;
}
