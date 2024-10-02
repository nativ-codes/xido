import {StyleSheet} from 'react-native';

import colors from '@/common/colors';

export default StyleSheet.create({
    center: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginLeft: 8
    },
    emptyAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: colors.secondarySurface,
        borderWidth: 1,
        borderColor: colors.secondaryText,
        borderStyle: 'dashed',        
    }
});