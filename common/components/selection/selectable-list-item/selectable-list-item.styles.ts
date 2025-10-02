import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  itemWrapper: {
    padding: Units.s16,
    flexDirection: "row",
    gap: Units.s8,
    borderRadius: Units.s16,
    backgroundColor: Colors.surface,
    alignItems: "center",
  },
  selected: {
    height: Units.s12,
    width: Units.s12,
    borderRadius: Units.s6,
    backgroundColor: Colors.primary,
  },
  circle: {
    height: Units.s18,
    width: Units.s18,
    borderRadius: Units.s18 / 2,
    borderWidth: Units.s1,
    alignItems: "center",
    justifyContent: "center",
  },
});
