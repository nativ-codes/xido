import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
	stepper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		marginBottom: 12
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		paddingHorizontal: 16
	},
	cell: {
		width: '23%',
		flexGrow: 1,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 12,
		backgroundColor: Colors.surface,
		// same width in every state so selecting never resizes the cell
		borderWidth: 2,
		borderColor: Colors.border
	},
	selected: {
		backgroundColor: Colors.primaryText,
		borderColor: Colors.primaryText
	},
	current: {
		borderColor: Colors.primary
	}
});
