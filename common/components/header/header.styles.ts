import { StyleSheet } from "react-native";

import { sizes } from "@/common/components/button/button";
import { Units } from "@/common/constants";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: Units.s16,
    justifyContent: "space-between",
  },
  placeholder: {
    width: sizes["medium"].container.width,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  titleSpacing: {
    paddingHorizontal: Units.s8,
  },
});
