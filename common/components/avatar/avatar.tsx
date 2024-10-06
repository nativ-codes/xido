import {StyleSheet, Image, View} from 'react-native';

import styles from './avatar.styles'

type AvatarPropTypes = {
    url: string | null | undefined;
    size?: AvatarSize;
}

function Avatar({
    url,
    size
}: AvatarPropTypes) {
    const sizeStyle = sizes[size || AvatarSize.SMALL];

    return Boolean(url) ? (
        <Image
            source={{uri: url}}
            style={sizeStyle}
        />) : (<View style={StyleSheet.compose(styles.emptyAvatar, sizeStyle)}/>)
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