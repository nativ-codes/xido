import { StyleSheet } from 'react-native';
import { Colors, Units } from '@/common/constants';

export default StyleSheet.create({
    lineMiddle: {
        height: '120%',
    },
    lineStart: {
        height: '50%'
    },
    lineEnd: {
        height: '50%',
        top: -Units.s16
    },
    line: {
        position: 'absolute',
        width: Units.s2,
        bottom: 0,
        left: Units.s16,
        backgroundColor: Colors.primary,
    },
    cardWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checked: {
        zIndex: 1,
        width: Units.s32,
        height: Units.s32,
        borderRadius: Units.s16,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    notChecked: {
        zIndex: 1,
        width: Units.s32,
        height: Units.s32,
        borderRadius: Units.s16,
        backgroundColor: Colors.background,
        borderWidth: Units.s2,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
