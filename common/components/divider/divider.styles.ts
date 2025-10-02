import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  divider: {
    width: "100%",
    height: Units.s1,
    backgroundColor: Colors.secondaryText,
    opacity: 0.1,
    marginVertical: Units.s16,
  },
});
