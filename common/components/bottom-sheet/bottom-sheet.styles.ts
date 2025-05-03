import colors from '@/common/constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    content: {
        maxHeight: '60%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    close: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.secondarySurface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',        
    },
    noTitle: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});