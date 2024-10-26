import colors from '@/common/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: colors.background,
    },
    selected: {
        borderWidth: 2,
        borderColor: colors.primary,
    },
    smallContainer: {
        padding: 8
    },
    mediumContainer: {
        padding: 16
    }
});