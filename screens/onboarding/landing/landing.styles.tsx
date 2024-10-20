import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: 16
    },
    section: {
        marginTop: 16,
        gap: 8
    },
    button: {
        padding: 16
    }
});