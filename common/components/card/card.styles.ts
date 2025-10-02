import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Units.s16,
    backgroundColor: Colors.surface,
    borderRadius: Units.s16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Units.s8,
    alignItems: "center",
  },
});
