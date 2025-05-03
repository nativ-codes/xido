import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
    lineMiddle: {
        height: '120%',
    },
    lineStart: {
        height: '50%'
    },
    lineEnd: {
        height: '50%',
        top: -16
    },
    line: {
        position: 'absolute',
        width: 2,
        bottom: 0,
        left: 16,
        backgroundColor: Colors.primary,
    },
    card: {
        borderRadius: 16,
        backgroundColor: Colors.surface,
        padding: 16,
        gap: 8,
        flexShrink: 1        
    },
    header: {
        gap: 4
    },
    cardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    wrapper: {
        marginHorizontal: 16,
        gap: 16
    },
    checked: {
        zIndex: 1,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    notChecked: {
        zIndex: 1,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
