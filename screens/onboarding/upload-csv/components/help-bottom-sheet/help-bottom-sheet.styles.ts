import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  content: {
    backgroundColor: Colors.surface,
    padding: Units.s16,
    marginHorizontal: Units.s16,
    borderRadius: Units.s16,
    gap: Units.s16,
  },
  section: {
    gap: Units.s4,
  },
  image: {
    width: "100%",
    height: 300,
  },
});
