import colors from '@/common/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    modalWrapper: {
        margin: 0,
        justifyContent: 'flex-end'        
    },
    modalContent: {
        backgroundColor: colors.background,
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        gap: 16,        
    },
    spacer: {
        gap: 8
    }
});