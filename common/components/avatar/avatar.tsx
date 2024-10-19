import { StyleSheet, Image, View } from 'react-native';

import Text from '@/common/components/text/text';
import styles from './avatar.styles'
import colors from '@/common/colors';

type AvatarPropTypes = {
    url: string | null | undefined;
    size?: AvatarSize;
    placeholder?: string;
}

function Avatar({
    url,
    placeholder,
    size = AvatarSize.SMALL
}: AvatarPropTypes) {
    const sizeStyle = sizes[size || AvatarSize.SMALL];
    const textVariant = size === AvatarSize.SMALL ? Text.variants.H6 : Text.variants.H2;

    return Boolean(url) ? (
        <Image
            source={{ uri: url }}
            style={sizeStyle}
        />) : (<View style={StyleSheet.compose(styles.emptyAvatar, sizeStyle)}>
            <Text variant={textVariant} isBold color={colors.secondaryText}>{placeholder}</Text>
        </View>)
}

enum AvatarSize {
    SMALL = 'small',
    LARGE = 'large'
}

const sizes = {
    [AvatarSize.SMALL]: styles.avatarSmall,
    [AvatarSize.LARGE]: styles.avatarLarge
}

Avatar.sizes = AvatarSize;

export default Avatar;