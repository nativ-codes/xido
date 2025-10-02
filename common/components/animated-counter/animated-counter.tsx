import { MotiText } from "moti";
import { useEffect } from "react";
import { useState } from "react";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AnimatedCounterPropsType } from "./animated-counter.types";
import {
  LONG_ANIMATION_DURATION,
  smallSlideInYAnimation,
} from "@/common/constants";

function AnimatedCounter({
  style,
  from = 0,
  to = 100,
  duration = LONG_ANIMATION_DURATION,
  valueFormatter = (value) => value.toFixed(2),
}: AnimatedCounterPropsType) {
  const progress = useSharedValue(from);
  const [count, setCount] = useState(from);

  useEffect(() => {
    progress.value = withTiming(to, { duration });
  }, [to]);

  useAnimatedReaction(
    () => progress.value.toFixed(2),
    (value, prev) => {
      if (value !== prev) {
        runOnJS(setCount)(Number(value));
      }
    },
    []
  );

  return (
    <MotiText {...smallSlideInYAnimation} style={style}>
      {valueFormatter(count)}
    </MotiText>
  );
}

export default AnimatedCounter;
