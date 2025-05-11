import { Units } from '@/common/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	goalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	goalHeaderText: {
		fontWeight: 'bold',
		fontSize: 14,
		fontFamily: 'Urbanist'
	},
	monthlyDividendText: {
		fontWeight: 'bold',
		fontSize: 26,
		fontFamily: 'Urbanist-Bold',
		textAlign: 'center'
	},
	goalTag: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	}
});
