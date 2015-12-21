<?php
namespace Cms\Model\Entity;

use Cake\ORM\Entity;

/**
 * Input Entity.
 */
class Input extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false,
    ];
}