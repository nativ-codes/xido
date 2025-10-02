import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Units.s16,
    alignSelf: "flex-start",
    borderWidth: Units.s2,
    borderColor: Colors.background,
  },
  selected: {
    borderWidth: Units.s2,
    borderColor: Colors.primary,
  },
  smallContainer: {
    padding: Units.s8,
  },
  mediumContainer: {
    padding: Units.s16,
  },
});
