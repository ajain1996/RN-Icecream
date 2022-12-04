import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Navigation from '../../service/Navigation'
import { commonStyles } from '../../utils/Styles'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'
import { image_tap } from '../image_tap'

const CustomHeader = ({ title }) => {
    return (
        <View style={styles.main}>
            {image_tap(require("../../assets/left-arrow.png"), 22, () => { Navigation.back() })}
            <Text style={styles.logo}>{title}</Text>
        </View>
    )
}

export default CustomHeader;

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 8,
        backgroundColor: COLORS.white,
        elevation: 9, shadowColor: "#999",
        ...commonStyles.containerStyle,
        height: 62,
        ...commonStyles.rowStart,
    },
    logo: {
        fontFamily: FONTS.Bold,
        color: "#000",
        fontSize: 16,
        marginLeft: 16,
        fontWeight: "600"
    },
})
