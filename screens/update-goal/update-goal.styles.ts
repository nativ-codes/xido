import { StyleSheet } from "react-native";
import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  textInput: {
    fontSize: 18,
    borderRadius: Units.s24,
    paddingLeft: Units.s16,
    paddingRight: Units.s16,
    fontFamily: "Urbanist",
    paddingVertical: Units.s8,
    backgroundColor: Colors.surface,
    flex: 1,
  },
  section: {
    gap: Units.s8,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: Units.s16,
    gap: Units.s16,
  },
  content: {
    flexGrow: 1,
    gap: Units.s16,
  },
  buttonsWrapper: {
    gap: Units.s8,
  },
});
