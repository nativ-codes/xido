import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
	wrapper: {
		backgroundColor: Colors.secondarySurface,
		height: 24,
		borderRadius: 12,
		width: '100%'
	},
	progress: {
		backgroundColor: Colors.primary,
		height: '100%',
		borderRadius: 12
	}
});
