import { StyleSheet } from "react-native";

import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  wrapper: {
    paddingTop: Units.s16,
    paddingHorizontal: Units.s16,
    paddingBottom: Units.s8,
    borderRadius: Units.s16,
    backgroundColor: Colors.surface,
  },
  header: {
    marginBottom: Units.s16,
  },
  companyName: {
    flexGrow: 1,
    flexShrink: 1,
  },
  center: {
    flexDirection: "row",
    gap: Units.s8,
    alignItems: "center",
    marginLeft: Units.s8,
  },
  weight: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.secondarySurface,
    borderBottomLeftRadius: Units.s16,
    borderBottomRightRadius: 0,
    borderTopRightRadius: Units.s16,
    borderTopLeftRadius: 0,
    paddingHorizontal: Units.s12,
    paddingVertical: Units.s6,
  },
  row: {
    marginVertical: Units.s8,
  },
});
