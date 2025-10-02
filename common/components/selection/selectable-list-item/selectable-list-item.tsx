import { Colors } from "@/common/constants";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Text from "@/common/components/text/text";
import styles from "./selectable-list-item.styles";

type SelectableListItemPropTypes = {
  label: string;
  isSelected: boolean;
  onPress: () => void | any;
};

function SelectableListItem({
  label,
  isSelected,
  onPress,
}: SelectableListItemPropTypes) {
  const borderColor = isSelected ? Colors.primary : Colors.secondaryText;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.itemWrapper}
    >
      <View
        style={StyleSheet.compose(
          {
            borderColor,
          },
          styles.circle
        )}
      >
        {isSelected && <View style={styles.selected} />}
      </View>
      <Text variant="h4">{label}</Text>
    </TouchableOpacity>
  );
}

export default SelectableListItem;
