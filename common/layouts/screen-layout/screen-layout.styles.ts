import { Colors } from '@/common/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: Colors.surface
	},
	contentContainer: {
		flexGrow: 1
	},
	footer: {
		paddingHorizontal: 16,
		paddingTop: 16,
		gap: 8
	}
});
