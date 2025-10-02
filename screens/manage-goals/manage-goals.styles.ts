import { StyleSheet } from "react-native";

import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.surface,
    borderRadius: Units.s16,
    padding: Units.s16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: Units.s1,
    borderColor: Colors.border,
  },
  leftCard: {
    flex: 1,
    gap: Units.s4,
  },
  wrapper: {
    marginHorizontal: Units.s16,
    gap: Units.s8,
    paddingBottom: 90,
  },
  floatingButton: {
    position: "absolute",
    left: Units.s16,
    right: Units.s16,
  },
});
