import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.secondarySurface,
    height: Units.s24,
    borderRadius: Units.s12,
    width: "100%",
  },
  progress: {
    backgroundColor: Colors.primary,
    height: "100%",
    borderRadius: Units.s12,
  },
});
