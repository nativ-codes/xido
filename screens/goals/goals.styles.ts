import colors from "@/common/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    lineMiddle: {
        height: '120%',
    },
    lineStart: {
        height: '50%'
    },
    lineEnd: {
        height: '50%',
        top: -16
    },
    line: {
        position: 'absolute',
        width: 2,
        bottom: 0,
        left: 16,
        backgroundColor: colors.primary
    },
    card: {
        borderRadius: 16,
        backgroundColor: colors.surface,
        padding: 16,
        gap: 8,
        flexShrink: 1        
    },
    header: {
        gap: 4
    },
    cardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    wrapper: {
        marginHorizontal: 16,
        gap: 16
    },
    checked: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    notChecked: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
