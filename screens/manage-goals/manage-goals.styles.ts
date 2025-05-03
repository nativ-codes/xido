import { StyleSheet } from "react-native";

import { Colors } from "@/common/constants";

export default StyleSheet.create({
    cardWrapper: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border
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