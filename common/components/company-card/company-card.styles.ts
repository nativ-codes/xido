import {StyleSheet} from 'react-native';

import colors from '@/common/colors';

export default StyleSheet.create({
    wrapper: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 8,
        borderRadius: 16,
        backgroundColor: colors.surface,        
    },
    header: {
        marginBottom: 16        
    },
    companyName: {
        flexGrow: 1,
        flexShrink: 1
    },
    center: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginLeft: 8
    },
    weight: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: colors.secondarySurface,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 0,
        paddingHorizontal: 12,
        paddingVertical: 6,        
    },
    row: {
        marginVertical: 8
    }
});