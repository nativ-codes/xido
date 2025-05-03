import colors from "@/common/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    textInput: {
        fontSize: 18,
        borderRadius: 24,
        paddingLeft: 16,
        paddingRight: 16,
        fontFamily: 'Urbanist',
        paddingVertical: 8,
        backgroundColor: colors.surface,
        flex: 1
    },
    section: {
        gap: 8
    },
    wrapper: {
        flex: 1,
        marginHorizontal: 16,
        gap: 16        
    },
    content: {
        flexGrow: 1,
        gap: 16        
    },
    buttonsWrapper: {
        gap: 8
    }        
});