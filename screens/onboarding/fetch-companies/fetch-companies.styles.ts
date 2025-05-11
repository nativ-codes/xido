import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
	loading: {
		backgroundColor: Colors.overlay,
		flex: 1,
		justifyContent: 'center'
	},
	error: {
		marginHorizontal: 16
	},
	errorWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorContent: {
		alignItems: 'center'
	}
});
