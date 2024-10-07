import colors from '@/common/colors';
import { StyleSheet } from 'react-native';

const avatarSmallSize = 40;
const avatarLargeSize = 80;

export default StyleSheet.create({
    avatarSmall: {
        width: avatarSmallSize,
        height: avatarSmallSize,
        borderRadius: 8
    },
    avatarLarge: {
        width: avatarLargeSize,
        height: avatarLargeSize,
        borderRadius: 16
    },
    emptyAvatar: {
        backgroundColor: colors.secondarySurface,
        borderWidth: 1,
        borderColor: colors.secondaryText,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
});