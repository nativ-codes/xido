import colors from '@/common/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 16,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: colors.background,
    },
    selected: {
        borderWidth: 2,
        borderColor: colors.primary,
    }
});