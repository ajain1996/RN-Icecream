import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { SIZES } from '../../component/Constant/Color'

export default function home_search(onChange) {
    return (
        <TextInput
            placeholder='Search'
            placeholderTextColor="#999"
            onChangeText={onChange}
            style={styles.input}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: SIZES.width - 20,
        height: 50,
        backgroundColor: "#fff",
        elevation: 9,
        shadowColor: "#999",
        borderRadius: 9,
        paddingHorizontal: 16,
        fontSize: 15,
        fontWeight: "600",
        color: "#000"
    }
})