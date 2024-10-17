import colors from "@/common/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    wrapper: {
        padding: 16,
        borderRadius: 32,
        alignItems: 'center'    
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.secondarySurface,
        alignItems: 'center',
        justifyContent: 'center',
    }
});