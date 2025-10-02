import { StyleSheet } from "react-native";
import { Units } from "@/common/constants";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabs: {
    paddingHorizontal: Units.s16,
    gap: Units.s8,
  },
  tabWrapper: {
    marginBottom: Units.s8,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    margin: Units.s24,
  },
  content: {
    paddingHorizontal: Units.s16,
  },
});
