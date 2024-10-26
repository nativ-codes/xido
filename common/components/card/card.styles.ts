import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 16
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        alignItems: 'center'
    }
});