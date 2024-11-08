import { StyleSheet } from "react-native";

import colors from "@/common/colors";

export default StyleSheet.create({
    cardWrapper: {
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftCard: {
        flex: 1,
        gap: 4
    },
    wrapper: {
        marginHorizontal: 16,
        gap: 8,
        paddingBottom: 90
    },
    floatingButton: {
        position: 'absolute',
        left: 16,
        right: 16,
    }
});