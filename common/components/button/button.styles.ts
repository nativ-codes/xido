import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
    wrapper: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 32,
        alignItems: 'center'    
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.secondarySurface,
        alignItems: 'center',
        justifyContent: 'center',
    }
});