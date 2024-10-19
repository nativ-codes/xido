import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16
    },
    section: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8        
    },
    uploadBox: {
        marginVertical: 16,
        backgroundColor: colors.secondarySurface,
        borderWidth: 3,
        borderColor: colors.primary,
        height: 200,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttons: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 8
    }
});