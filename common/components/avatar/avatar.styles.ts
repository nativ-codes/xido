import { StyleSheet } from 'react-native';
import { Colors } from '@/common/constants';

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
        backgroundColor: Colors.secondarySurface,
        borderWidth: 1,
        borderColor: Colors.secondaryText,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
});