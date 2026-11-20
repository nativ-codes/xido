// shortcut: Reanimated 4.7's own mock crashes under jest-expo 58 (setCSSEventHandler), so stub the animation builders; replace with `react-native-reanimated/mock` once component tests need real Animated components
const builder = { duration: () => builder, delay: () => builder };

module.exports = {
	__esModule: true,
	default: {},
	FadeInDown: builder,
	FadeInUp: builder,
	FadeInRight: builder,
	Keyframe: function Keyframe() {
		return builder;
	}
};
