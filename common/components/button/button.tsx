import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "@/common/components/text/text";
import { Colors } from "@/common/constants";
import styles from "./button.styles";
import { noop } from "@/common/utils";
import { Units } from "@/common/constants";

type ButtonPropTypes = {
  onPress?: () => void | any;
  label: string;
  variant?: keyof typeof ButtonVariants;
  isDisabled?: boolean;
};

function Button({
  onPress,
  label,
  variant = ButtonVariants.primary,
  isDisabled,
}: ButtonPropTypes) {
  const { backgroundColor, color } = variants[variant];
  const handleOnPress = isDisabled ? noop : onPress;
  const opacity = isDisabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleOnPress}
      style={StyleSheet.compose(styles.wrapper, { backgroundColor, opacity })}
    >
      <Text variant="h4" isBold color={color}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
}

const variants = {
  primary: {
    backgroundColor: Colors.primary,
    color: Colors.background,
  },
  secondary: {
    backgroundColor: "transparent",
    color: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.error,
    color: Colors.background,
  },
};

type IconPropTypes = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size: keyof typeof IconSizes;
  color: string;
  onPress?: () => void | any;
};

function Icon({
  name,
  size = IconSizes.medium,
  color,
  onPress,
}: IconPropTypes) {
  const iconSize = sizes[size || IconSizes.medium];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.compose(styles.icon, iconSize.container)}
    >
      <MaterialCommunityIcons name={name} size={iconSize.icon} color={color} />
    </TouchableOpacity>
  );
}

enum IconSizes {
  small = "small",
  medium = "medium",
  large = "large",
}

const sizes = {
  small: {
    icon: Units.s20,
    container: {
      width: Units.s32,
      height: Units.s32,
      borderRadius: Units.s16,
    },
  },
  medium: {
    icon: Units.s24,
    container: {
      width: Units.s40,
      height: Units.s40,
      borderRadius: Units.s20,
    },
  },
  large: {
    icon: Units.s32,
    container: {
      width: Units.s48,
      height: Units.s48,
      borderRadius: Units.s24,
    },
  },
};

Button.Icon = Icon;

export { sizes };
export default Button;
