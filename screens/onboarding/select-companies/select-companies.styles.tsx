import { StyleSheet } from "react-native";
import { Units } from "@/common/constants";

export default StyleSheet.create({
  content: {
    flex: 1,
    padding: Units.s16,
  },
  section: {
    marginTop: Units.s16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Units.s8,
  },
  buttons: {
    paddingHorizontal: Units.s16,
    paddingBottom: Units.s16,
    gap: Units.s8,
  },
});
