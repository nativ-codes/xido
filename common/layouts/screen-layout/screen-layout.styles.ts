import { StyleSheet } from "react-native";
import colors from "@/common/colors";

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.background
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 32
    }
});