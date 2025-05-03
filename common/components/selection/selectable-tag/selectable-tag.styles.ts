import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: Colors.background,
    },
    selected: {
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    smallContainer: {
        padding: 8
    },
    mediumContainer: {
        padding: 16
    }
});