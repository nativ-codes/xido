import { StyleProp, TextStyle } from "react-native";

export type AnimatedCounterPropsType = {
  from?: number;
  to?: number;
  duration?: number;
  style?: StyleProp<TextStyle>;
  valueFormatter?: (value: number) => string;
};
