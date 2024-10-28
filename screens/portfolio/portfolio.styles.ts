import colors from "@/common/colors";
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        gap: 8
    },
    search: {
        paddingHorizontal: 16,
        gap: 8,
        flexDirection: 'row',
    },
    icon: {
        position: 'absolute',
        width: 40,
        height: 40,
        left: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1        
    },
    textinput: {
        fontSize: 18,
        borderRadius: 24,
        paddingLeft: 40,
        paddingRight: 16,
        fontFamily: 'Urbanist',
        paddingVertical: 8,
        backgroundColor: colors.surface,
        flex: 1
    },
    card: {
        marginBottom: 16        
    },
    contentContainer: {
        padding: 16,
    }
});
