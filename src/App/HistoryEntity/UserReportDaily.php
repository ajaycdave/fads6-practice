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
 * Fa\Bundle\UserBundle\HistoryEntity\User.
 *
 * This table is used to store ad information.
 *
 * @author Madhavi Rajani <madhavi@aspl.in>
 * @copyright 2014 Fiare Oy
 *
 * @ORM\Table(name="user_report_daily", indexes={@ORM\Index(name="fa_user_report_daily_created_at_index", columns={"created_at"}), @ORM\Index(name="fa_user_report_daily_email_index", columns={"email"}), @ORM\Index(name="fa_user_report_daily_username_index", columns={"username"}), @ORM\Index(name="fa_user_report_daily_name_index", columns={"name"}) })
 * @ORM\Entity(repositoryClass="Fa\Bundle\CoreBundle\Repository\Core")
 * @ORM\HasLifecycleCallbacks
 */
class UserReportDaily
{
    use \Fa\Bundle\UserBundle\HistoryEntity\UserReportDailyTrait;
}
