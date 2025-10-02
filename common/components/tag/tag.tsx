import { View, StyleSheet } from "react-native";

import styles from "./tag.styles";
import Text from "@/common/components/text/text";
import { Colors } from "@/common/constants";

type TagPropTypes = {
  value: string;
  variant: keyof typeof TagVariants;
};

function Tag({ value, variant = TagVariants.primary }: TagPropTypes) {
  const backgroundColor = variants[variant];

  return (
    <View
      style={StyleSheet.compose(styles.wrapper, {
        backgroundColor,
      })}
    >
      <Text textAlign="center" isBold variant="h5" color={Colors.secondaryText}>
        {value.toUpperCase()}
      </Text>
    </View>
  );
}

enum TagVariants {
  primary = "primary",
  secondary = "secondary",
}

const variants = {
  primary: Colors.primarySurface,
  secondary: Colors.secondarySurface,
};

export default Tag;
