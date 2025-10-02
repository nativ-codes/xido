import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  wrapper: {
    marginHorizontal: Units.s16,
    padding: Units.s16,
    borderRadius: Units.s16,
    gap: Units.s16,
    backgroundColor: Colors.surface,
  },
  section: {
    marginLeft: Units.s16,
  },
});
