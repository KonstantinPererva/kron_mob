<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
//print_logG($arResult);

if (!empty($arResult)):?>
<div class="catalog-menu" data-grid="catalog-row-top-cell-left">
<ul class="catalog-menu-list">
	<?php
	// echo "<pre>"; print_r($arResult);
	?>
<?

$previousLevel = 0;
foreach($arResult as $arItem):?>

	<?if ($previousLevel && $arItem["DEPTH_LEVEL"] < $previousLevel):?>
		<?=str_repeat("</ul></li>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
	<?endif?>

	<?if ($arItem["IS_PARENT"]):?>

		<?if($arItem["PARAMS"]["NOT_CHILD"]):?>

			<li class="catalog-menu-item">
				<a class="catalog-menu-link <?=$arItem["PARAMS"]["CLASS"]?> <?=(!$arItem["PARAMS"]["DATA_BTN"])?'second_lev':''?>" <?=($arItem["PARAMS"]["DATA_BTN"])?'data-btn="'.$arItem["PARAMS"]["DATA_BTN"].'"':''?> <?if($arItem["PARAMS"]["LINK_CSS"]) echo $arItem["PARAMS"]["LINK_CSS"];?>  <?=($arItem["PARAMS"]["DATA_SAVE_PROMOTION"])?'data-save-promotion="'.$arItem["PARAMS"]["DATA_SAVE_PROMOTION"].'"':''?> href="#" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>">
					<span class="catalog-menu-link__ico" >
						<?if($arItem["ADDITIONAL_LINKS"][0] == "news"):?>
							<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="10.8052" cy="10.4597" r="10" fill="#1268B1"></circle>
								<path d="M4.5292 12.9537V13.1037H4.6792H5.20654H5.35654V12.9537V10.1094L7.26648 13.0357L7.31087 13.1037H7.39209H7.99268H8.14268V12.9537V8.6178V8.4678H7.99268H7.46533H7.31533V8.6178V11.4616L5.40838 8.53589L5.364 8.4678H5.28271H4.6792H4.5292V8.6178V12.9537ZM8.96475 12.9537V13.1037H9.11475H11.6636H11.8136V12.9537V12.4938V12.3438H11.6636H9.87998V11.0735H11.2446H11.3946V10.9235V10.4694V10.3194H11.2446H9.87998V9.22776H11.5376H11.6876V9.07776V8.6178V8.4678H11.5376H9.11475H8.96475V8.6178V12.9537ZM13.4406 12.9911L13.4696 13.1037H13.5859H14.1953H14.3136L14.3412 12.9886L14.9918 10.2693L15.6135 12.9872L15.6402 13.1037H15.7597H16.372H16.4858L16.5165 12.9942L17.7323 8.6583L17.7857 8.4678H17.5879H17.0869H16.9734L16.9425 8.57699L16.1471 11.3904L15.5046 8.58432L15.4779 8.4678H15.3584H14.7666H14.6482L14.6207 8.58298L13.9432 11.4216L13.2067 8.58016L13.1776 8.4678H13.0615H12.4697H12.2762L12.3244 8.65519L13.4406 12.9911Z" fill="white" stroke="white" stroke-width="0.3"></path>
							</svg>
						<?elseif($arItem["ADDITIONAL_LINKS"][0] == "extrabonus"):?>
							<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="10.8052" cy="10.5167" r="10" fill="#E30613"/>
								<path d="M7.40504 14.5167L13.4076 6.51672H14.2004L8.20298 14.5167H7.40504ZM8.96488 10.5167C8.46724 10.5167 8.07256 10.3451 7.78084 10.0019C7.48912 9.65872 7.34326 9.1954 7.34326 8.61196C7.34326 8.02509 7.48912 7.56177 7.78084 7.222C8.07256 6.8788 8.46724 6.7072 8.96488 6.7072C9.45909 6.7072 9.85206 6.8788 10.1438 7.222C10.4355 7.56177 10.5814 8.02509 10.5814 8.61196C10.5814 9.1954 10.4355 9.65872 10.1438 10.0019C9.85206 10.3451 9.45909 10.5167 8.96488 10.5167ZM8.96488 10.0071C9.22572 10.0071 9.43335 9.8818 9.58779 9.63127C9.74223 9.3773 9.81945 9.03753 9.81945 8.61196C9.81945 8.18296 9.74223 7.84319 9.58779 7.59266C9.43335 7.33869 9.22572 7.2117 8.96488 7.2117C8.70062 7.2117 8.49127 7.33869 8.33683 7.59266C8.18239 7.84319 8.10517 8.18296 8.10517 8.61196C8.10517 9.03753 8.18239 9.3773 8.33683 9.63127C8.49127 9.8818 8.70062 10.0071 8.96488 10.0071ZM12.6457 14.3262C12.1481 14.3262 11.7534 14.1546 11.4617 13.8114C11.1734 13.4682 11.0292 13.0049 11.0292 12.4215C11.0292 11.838 11.1734 11.3747 11.4617 11.0315C11.7534 10.6883 12.1481 10.5167 12.6457 10.5167C13.1433 10.5167 13.538 10.6883 13.8297 11.0315C14.1215 11.3747 14.2673 11.838 14.2673 12.4215C14.2673 13.0049 14.1215 13.4682 13.8297 13.8114C13.538 14.1546 13.1433 14.3262 12.6457 14.3262ZM12.6457 13.8166C12.91 13.8166 13.1193 13.6913 13.2738 13.4408C13.4282 13.1903 13.5054 12.8505 13.5054 12.4215C13.5054 11.9925 13.4282 11.6527 13.2738 11.4022C13.1193 11.1482 12.91 11.0212 12.6457 11.0212C12.3849 11.0212 12.1772 11.1482 12.0228 11.4022C11.8684 11.6527 11.7911 11.9925 11.7911 12.4215C11.7911 12.8505 11.8684 13.1903 12.0228 13.4408C12.1772 13.6913 12.3849 13.8166 12.6457 13.8166Z" fill="white"/>
							</svg>
						<?elseif($arItem["ADDITIONAL_LINKS"][0] == "action"):?>
							<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="10.8052" cy="10.3097" r="10" fill="#038100"/>
								<path d="M6.43018 10.6162V14.3662C6.43018 14.7112 6.7108 14.9912 7.05518 14.9912H10.1802V10.6162H6.43018Z" fill="white"/>
								<path d="M15.1802 8.1163H13.2027C13.3446 8.01942 13.4664 7.92317 13.5514 7.83692C14.0558 7.33005 14.0558 6.50505 13.5514 5.99817C13.0614 5.50442 12.2077 5.50567 11.7183 5.99817C11.4471 6.27005 10.7283 7.37692 10.8277 8.1163H10.7827C10.8814 7.37692 10.1627 6.27005 9.89205 5.99817C9.40205 5.50567 8.5483 5.50567 8.05893 5.99817C7.55518 6.50505 7.55518 7.33005 8.0583 7.83692C8.14393 7.92317 8.2658 8.01942 8.40768 8.1163H6.43018C6.0858 8.1163 5.80518 8.39692 5.80518 8.7413V9.6788C5.80518 9.85129 5.94518 9.9913 6.11768 9.9913H10.1802V8.7413H11.4302V9.9913H15.4927C15.6652 9.9913 15.8052 9.85129 15.8052 9.6788V8.7413C15.8052 8.39692 15.5252 8.1163 15.1802 8.1163ZM10.1433 8.09567C10.1433 8.09567 10.1171 8.1163 10.0277 8.1163C9.5958 8.1163 8.77143 7.66755 8.50205 7.3963C8.24018 7.13255 8.24018 6.70255 8.50205 6.4388C8.62893 6.3113 8.79705 6.2413 8.9758 6.2413C9.15393 6.2413 9.32205 6.3113 9.44893 6.4388C9.87018 6.86255 10.2889 7.94505 10.1433 8.09567ZM11.5821 8.1163C11.4933 8.1163 11.4671 8.0963 11.4671 8.09567C11.3214 7.94505 11.7402 6.86255 12.1614 6.4388C12.4133 6.18442 12.8539 6.18317 13.1083 6.4388C13.3708 6.70255 13.3708 7.13255 13.1083 7.3963C12.8389 7.66755 12.0146 8.1163 11.5821 8.1163Z" fill="white"/>
								<path d="M11.4302 10.6162V14.9912H14.5552C14.9002 14.9912 15.1802 14.7112 15.1802 14.3662V10.6162H11.4302Z" fill="white"/>
							</svg>
						<?elseif($arItem["ADDITIONAL_LINKS"][0] == "my_products"):?>
							<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="10.8052" cy="10.9267" r="10" fill="#545454"/>
								<path d="M11.5361 10.9977L11.1292 11.2311V15.4267L14.7939 13.3298V9.1342L11.5361 10.9977Z" fill="white"/>
								<path d="M12.1993 7.23523L10.7899 6.42673L7.02344 8.5815L8.4347 9.39001L12.1993 7.23523Z" fill="white"/>
								<path d="M14.5546 8.58151L12.9304 7.6647L9.16577 9.81947L9.38057 9.92964L10.7899 10.7363L12.1918 9.93524L14.5546 8.58151Z" fill="white"/>
								<path d="M8.88124 11.3618L8.2067 11.0182V9.95017L6.81616 9.1566V13.3224L10.4545 15.4043V11.2386L8.88124 10.3404V11.3618Z" fill="white"/>
							</svg>
						<?endif;?>
					</span>
					<span class="catalog-menu-link__text"><?=$arItem["TEXT"]?></span>
				</a>
			</li>

		<?else:?>

			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<li class="catalog-menu-item"><span class="catalog-menu-link first_lev" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>"><?=$arItem["TEXT"]?></span>
					<ul class="catalog-menu-drop">
			<?else:?>
				<li class="catalog-menu-item"><a class="catalog-menu-link <?=($arItem["DEPTH_LEVEL"] == 2)?'second_lev':'third_lev' ?>" href="#" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>"><?=$arItem["TEXT"]?></a>
					<ul class="catalog-menu-drop">
			<?endif?>

		<?endif;?>

	<?else:?>

		<?if ($arItem["PERMISSION"] > "D"):?>

			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<li class="catalog-menu-item"><a class="catalog-menu-link first_lev <?=$arItem["PARAMS"]["CLASS"]?>" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>" href="#"><?=$arItem["TEXT"]?></a></li>
			<?else:?>
				<li class="catalog-menu-item"><a class="catalog-menu-link <?=($arItem["DEPTH_LEVEL"] == 2)?'second_lev':'third_lev' ?>" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>" href="#" <?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><?=$arItem["TEXT"]?></a></li>
			<?endif?>

		<?else:?>

			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<li class="catalog-menu-item"><a class="catalog-menu-link first_lev <?=$arItem["PARAMS"]["CLASS"]?>" href="#" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>" title="<?=GetMessage("MENU_ITEM_ACCESS_DENIED")?>"><?=$arItem["TEXT"]?></a></li>

			<?else:?>
				<li class="catalog-menu-item"><a class="catalog-menu-link <?=($arItem["DEPTH_LEVEL"] == 2)?'second_lev':'third_lev' ?>" href="#" data-section_id="<?=$arItem["ADDITIONAL_LINKS"][0]?>" title="<?=GetMessage("MENU_ITEM_ACCESS_DENIED")?>"><?=$arItem["TEXT"]?></a></li>
			<?endif?>

		<?endif?>

	<?endif?>

	<?$previousLevel = $arItem["DEPTH_LEVEL"];?>

<?endforeach?>

<?if ($previousLevel > 1)://close last item tags?>
	<?=str_repeat("</ul></li>", ($previousLevel-1) );?>
<?endif?>

</ul>
</div>
<?endif?>