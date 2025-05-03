import {StyleSheet} from 'react-native';

import colors from '@/common/constants/colors';

export default StyleSheet.create({
    content: {
        flex: 1,
        padding: 16
    },
    section: {
        marginTop: 16
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
    button: {
        padding: 16
    },
    boxContent: {
        gap: 8,
        padding: 16,
        alignItems: 'center'
    },
    errorBox: {
        borderColor: colors.error,
    }
});