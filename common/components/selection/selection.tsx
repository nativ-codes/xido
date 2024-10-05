import React from 'react';

import SelectableListItem from './selectable-list-item/selectable-list-item';

type SelectionPropTypes = {
    Element: React.ElementType,
    options: Array<any>,
    selected: any,
    onPress: Function,
    isMultiple?: boolean,
    keyExtractor?: Function,
    labelExtractor?: Function
}

function Selection({
	Element,
	options,
	selected,
	onPress,
	isMultiple = false,
	keyExtractor = defaultKeyExtractor,
	labelExtractor = defaultLabelExtractor
}: SelectionPropTypes) {
	const handleOnPress = (option: any) => () => {
		if (isMultiple) {
			onPress(
				selected.some((currentOption: any) => keyExtractor(currentOption) === keyExtractor(option))
					? selected.filter((currentOption: any) => keyExtractor(currentOption) !== keyExtractor(option))
					: [...selected, option]
			);
		} else {
			onPress(option);
		}
	};

	return options.map((option) => (
		<Element
			key={keyExtractor(option)}
			label={labelExtractor(option)}
			onPress={handleOnPress(option)}
			isSelected={getIsSelected({isMultiple, selected, option, keyExtractor})}
		/>
	));
}

type GetIsSelectedPropTypes = {
    isMultiple: boolean,
    selected: any,
    option: any,
    keyExtractor: Function
}

const getIsSelected = ({isMultiple, selected, option, keyExtractor}: GetIsSelectedPropTypes) => {
	if (isMultiple) {
		return selected.some((currentOption: any) => keyExtractor(currentOption) === keyExtractor(option));
	} else {
		return keyExtractor(option) === keyExtractor(selected);
	}
};
const defaultLabelExtractor = (option: any) => option?.label;
const defaultKeyExtractor = (option: any) => option?.id;

Selection.SelectableListItem = SelectableListItem;

export default Selection;
