import {StyleSheet, View } from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import Text from '@/common/components/text/text';
import {Button, Selection} from '@/common/components';
import { sortBy } from '@/constants';

import styles from './sort-by-bottom-sheet.styles'
import { SortByPropTypes } from '@/types/components';

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
  const {bottom} = useSafeAreaInsets();

  return (
      <Modal isVisible={isModalVisible} swipeDirection="down" onBackdropPress={hideModal} style={styles.modalWrapper}>
          <View style={StyleSheet.compose({
            paddingBottom: bottom
          }, styles.modalContent)}>
          <Text variant={Text.variants.H3} isBold>Sort by</Text>
          <View style={styles.spacer}>
            <Selection 
              options={sortBy}
              onPress={setSortByValue}
              selected={sortByValue}
              Element={Selection.SelectableListItem}
              keyExtractor={keyExtractor}
              labelExtractor={keyExtractor}
            />
          </View>
          <View style={styles.spacer}>
            <Button
              label="Apply"
              onPress={onApply}
              variant={Button.variants.PRIMARY}
            />
            <Button
              label="Reset"
              onPress={onReset}
              variant={Button.variants.SECONDARY}
            />  
          </View>
          </View>
      </Modal>
  );
}

export default SortByBottomSheet;