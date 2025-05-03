import { StyleSheet, Image, View } from 'react-native';

import Text from '@/common/components/text/text';
import styles from './avatar.styles'
import colors from '@/common/constants/colors';

type AvatarPropTypes = {
    url?: string;
    size?: keyof typeof AvatarSize;
    placeholder?: string;
}

function Avatar({
    url,
    placeholder,
    size = AvatarSize.small
}: AvatarPropTypes) {
    const sizeStyle = sizes[size || AvatarSize.small];
    const textVariant = size === AvatarSize.small ? 'h6' : 'h2';

    return Boolean(url) ? (
        <Image
            source={{ uri: url }}
            style={sizeStyle}
        />) : (<View style={StyleSheet.compose(styles.emptyAvatar, sizeStyle)}>
            <Text variant={textVariant} isBold color={colors.secondaryText}>{placeholder}</Text>
        </View>)
}

enum AvatarSize {
	small = 'small',
	large = 'large'
}

const sizes = {
    [AvatarSize.small]: styles.avatarSmall,
    [AvatarSize.large]: styles.avatarLarge
}

export default Avatar;