import { StyleSheet } from 'react-native';
import { Colors, Units } from '@/common/constants';

export default StyleSheet.create({
	icon: {
		position: 'absolute',
		width: Units.s40,
		height: Units.s40,
		left: Units.s16,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1
	},
	textinput: {
		fontSize: 18,
		borderRadius: Units.s24,
		paddingLeft: Units.s40,
		paddingRight: Units.s16,
		fontFamily: 'Urbanist',
		paddingVertical: Units.s8,
		backgroundColor: Colors.secondarySurface,
		flex: 1,
	},
	contentContainer: {
		padding: Units.s16
	}
});
