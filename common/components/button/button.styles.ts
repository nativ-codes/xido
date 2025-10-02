import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  wrapper: {
    paddingVertical: Units.s16,
    paddingHorizontal: Units.s32,
    borderRadius: Units.s32,
    alignItems: "center",
  },
  icon: {
    width: Units.s32,
    height: Units.s32,
    borderRadius: Units.s16,
    backgroundColor: Colors.secondarySurface,
    alignItems: "center",
    justifyContent: "center",
  },
});
