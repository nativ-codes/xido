import { StyleSheet } from 'react-native';

import Button, {sizes} from '@/common/components/button/button';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between'
    },
    placeholder: {
        width: sizes["medium"].container.width,
    },
    centerWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    titleSpacing: {
        paddingHorizontal: 8
    }
})