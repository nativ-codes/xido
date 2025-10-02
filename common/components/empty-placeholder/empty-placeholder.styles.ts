import { Units } from "@/common/constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Units.s8,
    padding: Units.s64,
  },
  content: {
    alignItems: "center",
    gap: Units.s32,
  },
});
