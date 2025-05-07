import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { SortByPropTypes } from '@/types/components';
import { Button, Selection, BottomSheet } from '@/common/components';
import { sortBy } from '@/common/constants';

import { Spacer } from '@/common/layouts';

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
      <Spacer gap='s8' direction='horizontal' size='s16'>
        <Selection
          options={sortBy}
          onPress={setSortByValue}
          selected={sortByValue}
          Element={Selection.SelectableListItem}
          keyExtractor={keyExtractor}
          labelExtractor={keyExtractor}
        />
      </Spacer>
      <Spacer gap='s8' direction={['horizontal', 'top']} size='s16'>
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
      </Spacer>
    </BottomSheet>
  );
}

export default SortByBottomSheet;