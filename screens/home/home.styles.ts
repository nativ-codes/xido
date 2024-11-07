import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        gap: 8
    },
    noPortfolio: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    goalProgressWrapper: {
        marginTop: 16,
        paddingBottom: 8
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center'
    }
});