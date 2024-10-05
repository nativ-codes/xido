import { StyleSheet } from 'react-native';
import colors from "@/common/colors";

export default StyleSheet.create({
  itemWrapper: {
    padding: 16,
    flexDirection: 'row',
    gap: 8,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  selected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.primary    
  },
  circle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  }
});