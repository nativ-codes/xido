import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    content: {
        flex: 1,
        padding: 16
    },
    section: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8        
    },
    buttons: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 8
    }
});