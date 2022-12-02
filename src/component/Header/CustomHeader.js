import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Navigation from '../../service/Navigation'
import { commonStyles } from '../../utils/Styles'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'

const CustomHeader = ({ title }) => {
    return (
        <TouchableOpacity style={styles.main} onPress={() => Navigation.back()}>
            <Image
                source={require("../../assets/left-arrow.png")}
                resizeMode="contain"
                style={{ width: 25, height: 25 }}
            />
            <Text style={styles.logo}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomHeader;

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        elevation: 9, shadowColor: "#999",
        ...commonStyles.containerStyle,
        height: 62,
        ...commonStyles.rowStart,
    },
    logo: {
        fontFamily: FONTS.Bold,
        color: "#000",
        fontSize: 20,
        marginLeft: 16,
        fontWeight: "700"
    },
})
