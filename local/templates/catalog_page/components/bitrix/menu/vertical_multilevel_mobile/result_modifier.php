<?
require_once($_SERVER['DOCUMENT_ROOT']. '/local/ajax/catalog.php');

    global $USER;

	$userId = $USER->GetID();
	$currentDate = new Bitrix\Main\Type\Date();
	$revisionActionPresent = 0;
	$extrabonus = '000000010';
	$revisionExtrabonus = false;

	// определяем, участвует ли пользователь в программе экстрабонусы и подарочная
	if(Bitrix\Main\Loader::includeModule('skalar.extends'))
	{

		$userActions = Skalar\Ext\UniversalBonus::getUserActions($userId);

		if (is_array($userActions) && count($userActions) > 0)
		{

			foreach ($userActions as $action) {

				$presents = unserialize($action["ACTION_PRESENTS"]);
				$presentFunc = unserialize($action['ACTION_FUNCTIONS']);


				if($action["ACTION_CODE"] == $extrabonus || $action["ACTION_CODE"] == Skalar\Ext\UniversalBonus::VNEDR_PROGRAM_CODE)
				{
                    $post['section_id'] = 'extrabonus';
                    $arFavorites = array();
                    $check_extra_bonuses = getGada($post,false);
                    if($check_extra_bonuses['LOADED_ITEM'] > 0) {
                        $revisionExtrabonus = true;
                    }
				}

				if (is_array($presents) && count($presents) > 0)
				{

					foreach ($presents as $present) {

						if ($present > 0 && !empty($presentFunc[0]) && $action['ACTION_ACTIVE_TO'] != null && $action['ACTION_ACTIVE_TO'] instanceof Bitrix\Main\Type\Date)
						{

							if ($action['ACTION_ACTIVE_TO']->getTimestamp() > $currentDate->getTimestamp())
							{
								$revisionActionPresent++;
							}
						}
					}

				}
			}
		}

		$My_products = [
			'TEXT' => 'Мои товары',
			'ADDITIONAL_LINKS' => ['my_products'],
			'IS_PARENT' => true,
			'DEPTH_LEVEL' => 1,
			'PARAMS' => [
				'NOT_CHILD' => true,
				'LINK_CSS' => '',
				'CLASS' => "catalog-menu-link_my-goods"
			],
		];
		array_unshift($arResult, $My_products);

		/*if ($revisionActionPresent > 0)
		{*/
		if (\Skalar\Ext\UniversalBonus::issetActiveBonusProgramsByUserId($userId))
		{
			$Action = [
				'TEXT' => 'АКЦИИ',
				'ADDITIONAL_LINKS' => ['action'],
				'IS_PARENT' => true,
				'DEPTH_LEVEL' => 1,
				'PARAMS' => [
					'NOT_CHILD' => true,
					'LINK_CSS' => '',
					'CLASS' => "catalog-menu-link_action",
					'DATA_BTN' => "open-bonus-popup",
					'DATA_SAVE_PROMOTION' => "save"
				],
			];
			array_unshift($arResult, $Action);
		}

		if ($revisionExtrabonus)
		{
			$ExtraBonus = [
				'TEXT' => 'ЭКСТРА-БОНУС',
				'ADDITIONAL_LINKS' => ['extrabonus'],
				'IS_PARENT' => true,
				'DEPTH_LEVEL' => 1,
				'PARAMS' => [
					'NOT_CHILD' => true,
					'LINK_CSS' => '',
					'CLASS' => "catalog-menu-link_bonus"
				],
			];
			array_unshift($arResult, $ExtraBonus);
		}

		$Novinki = [
			'TEXT' => 'Новинки',
			'ADDITIONAL_LINKS' => ['news'],
			'IS_PARENT' => true,
			'DEPTH_LEVEL' => 1,
			'PARAMS' => [
				'NOT_CHILD' => true,
				'LINK_CSS' => '',
				'CLASS' => "catalog-menu-link_new"
			],
		];

		array_unshift($arResult, $Novinki);

	}

?>