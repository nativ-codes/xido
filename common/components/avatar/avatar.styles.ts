import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

const avatarSmallSize = Units.s40;
const avatarLargeSize = Units.s80;

export default StyleSheet.create({
  avatarSmall: {
    width: avatarSmallSize,
    height: avatarSmallSize,
    borderRadius: Units.s8,
  },
  avatarLarge: {
    width: avatarLargeSize,
    height: avatarLargeSize,
    borderRadius: Units.s16,
  },
  emptyAvatar: {
    backgroundColor: Colors.secondarySurface,
    borderWidth: Units.s1,
    borderColor: Colors.secondaryText,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});
