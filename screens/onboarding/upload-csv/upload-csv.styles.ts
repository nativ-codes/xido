import { StyleSheet } from "react-native";

import { Colors, Units } from "@/common/constants";

export default StyleSheet.create({
  content: {
    flex: 1,
    padding: Units.s16,
  },
  section: {
    marginTop: Units.s16,
  },
  uploadBox: {
    marginVertical: Units.s16,
    backgroundColor: Colors.secondarySurface,
    borderWidth: 3,
    borderColor: Colors.primary,
    height: 200,
    borderRadius: Units.s16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    padding: Units.s16,
  },
  boxContent: {
    gap: Units.s8,
    padding: Units.s16,
    alignItems: "center",
  },
  errorBox: {
    borderColor: Colors.error,
  },
});
