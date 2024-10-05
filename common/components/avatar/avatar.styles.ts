import colors from '@/common/colors';
import {StyleSheet} from 'react-native';

const avatarSize = 40;

export default StyleSheet.create({
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: 8
    },
    emptyAvatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: 8,
        backgroundColor: colors.secondarySurface,
        borderWidth: 1,
        borderColor: colors.secondaryText,
        borderStyle: 'dashed',        
    },    
});