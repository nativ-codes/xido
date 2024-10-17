import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contentContainer: {
        backgroundColor: colors.background,
        padding: 16
    },
    headerContainer: {
        alignItems: 'center',
        gap: 16
    },
    content: {
        marginTop: 32,
        gap: 16
    }
})