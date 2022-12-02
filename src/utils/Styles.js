import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../component/Constant/Color";
import { FONTS } from "../component/Constant/Font";

const { width, height } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
    containerStyle: {
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: 'center'
    },
    elevation9: {
        elevation: 9, shadowColor: "#999", backgroundColor: "#fff"
    },
    loginRegisterWrapper: {
        justifyContent: "space-between",
        height: "100%",
    },
    uppercard: {
        width: width,
        height: height / 4,
        backgroundColor: COLORS.theme,
        borderBottomLeftRadius: height / 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerCardWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 3 * height / 4,
    },
    lowerCard: {
        backgroundColor: '#fff',
        width: '92%',
        borderRadius: 15,
        marginHorizontal: 18,
    },
    inputContainer: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: 10,
        height: 52,
        borderWidth: 1,
        borderColor: "#dcdcdc"
    },
    inputs: {
        borderBottomColor: COLORS.white,
        flex: 1,
        color: "#000",
        paddingLeft: 10,
        fontFamily: FONTS.Regular,
        paddingLeft: 20
    },
    authSmallTxt: {
        fontSize: 13,
        color: COLORS.black,
        fontFamily: FONTS.Regular,
        marginTop: 10,
        opacity: 0.5,
        textAlign: 'center',
    },
    authRegisterStyle: {
        fontSize: 13,
        fontFamily: FONTS.SemiBold,
        marginTop: 12,
        textAlign: 'center',
        color: COLORS.textInput,
        textDecorationLine: 'underline'
    },
    authContactView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    authBtnText: {
        color: '#fff',
        fontFamily: FONTS.SemiBold,
        fontSize: 14,
        marginTop: 2,
    },
    authBtn: {
        backgroundColor: COLORS.theme,
        width: '100%',
        height: 50,
        borderRadius: 30,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authLogin: {
        alignSelf: 'center',
        fontFamily: FONTS.Medium,
        color: COLORS.textInput,
        fontSize: 20,
        marginTop: 10,
    },
    authCardView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingBottom: 20,
        paddingTop: 20,
    },
    authWelcomeText: {
        color: '#fff',
        fontFamily: FONTS.Bold,
        fontSize: 25,
    },
    flex1: {
        flex: 1
    },
    centerStyles: {
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowStart: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    commonBtnStyle: {
        width: 226, height: 52,
        backgroundColor: COLORS.theme,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    fs10_400: {
        fontSize: 10,
        fontWeight: "400",
        color: "#000"
    },
    fs10_500: {
        fontSize: 10,
        fontWeight: "500",
        color: "#000"
    },
    fs10_600: {
        fontSize: 10,
        fontWeight: "600",
        color: "#000"
    },
    fs10_700: {
        fontSize: 10,
        fontWeight: "700",
        color: "#000"
    },
    fs10_400: {
        fontSize: 10,
        fontWeight: "400",
        color: "#000"
    },
    fs12_400: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000"
    },
    fs12_500: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000"
    },
    fs12_600: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000"
    },
    fs12_700: {
        fontSize: 12,
        fontWeight: "700",
        color: "#000"
    },
    fs13_300: {
        fontSize: 13,
        fontWeight: "300",
        color: "#000"
    },
    fs13_400: {
        fontSize: 13,
        fontWeight: "400",
        color: "#000"
    },
    fs13_500: {
        fontSize: 13,
        fontWeight: "500",
        color: "#000"
    },
    fs13_600: {
        fontSize: 13,
        fontWeight: "600",
        color: "#000"
    },
    fs13_700: {
        fontSize: 13,
        fontWeight: "700",
        color: "#000"
    },
    fs14_300: {
        fontSize: 14,
        fontWeight: "300",
        color: "#000"
    },
    fs14_400: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000"
    },
    fs14_500: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000"
    },
    fs14_600: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000"
    },
    fs14_700: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000"
    },
    fs15_400: {
        fontSize: 15,
        fontWeight: "400",
        color: "#000"
    },
    fs15_500: {
        fontSize: 15,
        fontWeight: "500",
        color: "#000"
    },
    fs15_600: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000"
    },
    fs16_400: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000"
    },
    fs16_500: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000"
    },
    fs16_600: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000"
    },
    fs16_700: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000"
    },
    fs17_400: {
        fontSize: 17,
        fontWeight: "400",
        color: "#000"
    },
    fs17_500: {
        fontSize: 17,
        fontWeight: "500",
        color: "#000"
    },
    fs17_600: {
        fontSize: 17,
        fontWeight: "600",
        color: "#000"
    },
    fs17_700: {
        fontSize: 17,
        fontWeight: "700",
        color: "#000"
    },
    fs18_400: {
        fontSize: 18,
        fontWeight: "400",
        color: "#000"
    },
    fs18_500: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000"
    },
    fs18_700: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    },
    fs22_600: {
        fontSize: 22,
        fontWeight: "600",
        color: "#000"
    },
    fs22_700: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000"
    },
    fs24_400: {
        fontSize: 24,
        fontWeight: "400",
        color: "#000"
    },
    fs24_500: {
        fontSize: 24,
        fontWeight: "500",
        color: "#000"
    },
    fs24_600: {
        fontSize: 24,
        fontWeight: "600",
        color: "#000"
    },
    fs24_700: {
        fontSize: 24,
        fontWeight: "700",
        color: "#000"
    },
});