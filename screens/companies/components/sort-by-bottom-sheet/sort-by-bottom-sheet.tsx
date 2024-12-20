import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SortByPropTypes } from '@/types/components';
import { Button, Selection, BottomSheet } from '@/common/components';
import { sortBy } from '@/constants';

import styles from './sort-by-bottom-sheet.styles'

const keyExtractor = (item: SortByPropTypes) => item?.label;

type SortByBottomSheetPropTypes = {
  onReset: () => void | any,
  onApply: () => void | any,
  setSortByValue: Dispatch<SetStateAction<SortByPropTypes | undefined>>,
  sortByValue: SortByPropTypes | undefined,
  isModalVisible: boolean,
  hideModal: () => void | any
}

function SortByBottomSheet({
  onReset,
  onApply,
  setSortByValue,
  sortByValue,
  isModalVisible,
  hideModal
}: SortByBottomSheetPropTypes) {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheet title="Sort by" isVisible={isModalVisible} onBackdropPress={hideModal}>
      <View style={styles.options}>
        <Selection
          options={sortBy}
          onPress={setSortByValue}
          selected={sortByValue}
          Element={Selection.SelectableListItem}
          keyExtractor={keyExtractor}
          labelExtractor={keyExtractor}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          label="Reset"
          onPress={onReset}
          variant={Button.variants.SECONDARY}
        />
        <Button
          label="Apply"
          onPress={onApply}
          variant={Button.variants.PRIMARY}
        />
      </View>
    </BottomSheet>
  );
}

export default SortByBottomSheet;