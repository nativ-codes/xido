import {Image, View} from 'react-native';

import styles from './avatar.styles'

type AvatarPropTypes = {
    url: string | null | undefined;
}

function Avatar({
    url,
}: AvatarPropTypes) {
    return Boolean(url) ? (
        <Image
            source={{uri: url}}
            style={styles.avatar}
        />) : (<View style={styles.emptyAvatar}/>)
}

export default Avatar;