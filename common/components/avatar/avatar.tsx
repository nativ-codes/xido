import {Image} from 'react-native';

import styles from './avatar.styles'

type AvatarPropTypes = {
    url: string;
}

function Avatar({
    url,
}: AvatarPropTypes) {
    return (
        <Image
            source={{uri: url}}
            style={styles.avatar}
        />
    )
}

export default Avatar;