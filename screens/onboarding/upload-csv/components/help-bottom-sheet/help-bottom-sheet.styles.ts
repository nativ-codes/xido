import { StyleSheet } from 'react-native';
import colors from '@/common/colors';

export default StyleSheet.create({
    content: {
        backgroundColor: colors.surface,
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 16,
        gap: 16
    },
    section: {
        gap: 4
    },
    image: {
        width: '100%',
        height: 300
    }
});