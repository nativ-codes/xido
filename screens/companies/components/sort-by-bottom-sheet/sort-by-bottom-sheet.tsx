import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { SortByPropTypes } from '@/types/components';
import { Button, Selection, BottomSheet } from '@/common/components';
import { sortBy } from '@/common/constants';

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
          variant="secondary"
        />
        <Button
          label="Apply"
          onPress={onApply}
          variant="primary"
        />
      </View>
    </BottomSheet>
  );
}

export default SortByBottomSheet;