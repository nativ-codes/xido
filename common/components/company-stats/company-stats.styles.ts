import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 16
    },
    titleSectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        alignItems: 'center'
    },
    titleSectionIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.secondarySurface,
        justifyContent: 'center',
        alignItems: 'center',
    }
});