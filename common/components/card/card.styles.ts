import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: Colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.border
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 8,
		alignItems: 'center'
	}
});