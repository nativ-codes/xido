import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
    wrapper: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    content: {
        maxHeight: '60%',
        backgroundColor: Colors.background,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    close: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.secondarySurface,
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