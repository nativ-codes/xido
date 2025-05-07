import { StyleSheet } from 'react-native';
import { Colors, Units } from '@/common/constants';

export default StyleSheet.create({
    wrapper: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    content: {
        maxHeight: '60%',
        backgroundColor: Colors.background,
        borderTopLeftRadius: Units.s16,
        borderTopRightRadius: Units.s16
    },
    close: {
        width: Units.s32,
        height: Units.s32,
        borderRadius: Units.s16,
        backgroundColor: Colors.secondarySurface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        padding: Units.s16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',        
    },
    noTitle: {
        padding: Units.s16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});