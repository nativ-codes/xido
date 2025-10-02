import { BOTTOM_TAB_HEIGHT } from "@/common/constants";

import { Colors } from "@/common/constants";

import { Units } from "@/common/constants";

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    left: Units.s16,
    right: Units.s16,
    height: BOTTOM_TAB_HEIGHT,
    borderRadius: Units.s32,
    borderWidth: Units.s1,
    borderColor: Colors.secondarySurface,
    backgroundColor: Colors.surface,
    flexDirection: "row",
    padding: Units.s4,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Units.s32,
  },
  tabBarItemFocused: {
    backgroundColor: Colors.secondarySurface,
  },
});
