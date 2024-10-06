import colors from "@/common/colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from '@/common/components/text/text';
import styles from './selectable-list-item.styles'

type SelectableListItemPropTypes = {
  label: string,
  isSelected: boolean,
  onPress: () => void | any,
}

function SelectableListItem({label, isSelected, onPress}: SelectableListItemPropTypes) {
  const borderColor = isSelected ? colors.primary : colors.secondaryText;

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
      <View style={StyleSheet.compose({
        borderColor
      }, styles.circle)}>
        {isSelected && <View style={styles.selected}/>}
      </View>
      <Text variant={Text.variants.H4}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SelectableListItem;