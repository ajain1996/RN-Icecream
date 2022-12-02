import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles'
import { SIZES } from '../../component/Constant/Color'

export default function renderCategoryItem(item, navigation) {
    return (
        <TouchableHighlight underlayColor="#eee" style={styles.container} onPress={() => {
            navigation.navigate("ProductSubCategoryScreen", {
                product: item,
            })
        }}>
            <View style={{ width: SIZES.width / 3.8 }}>
                <View style={styles.menuItem}>
                    {/* {item?.image?.startsWith("https")
                        ? <Image
                            source={{ uri: item?.image }}
                            resizeMode="stretch"
                            style={{ width: 86, height: 86, borderRadius: 100 }}
                        />
                        : <Image
                            source={require("../../assets/prod/i1.webp")}
                            resizeMode="stretch"
                            style={{ width: 86, height: 86, borderRadius: 100 }}
                        />} */}
                    <Image
                        source={require("../../assets/prod/i1.webp")}
                        resizeMode="stretch"
                        style={{ width: 86, height: 86, borderRadius: 100 }}
                    />
                </View>
                <Text style={{ ...commonStyles.fs13_400, textAlign: "center", marginTop: 8 }}>{item?.name}</Text>
                <Text style={{ ...commonStyles.fs13_400, textAlign: "center" }}>(Members: {item?.description})</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: "#999",
        width: SIZES.width / 3.8,
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 15,
        width: "31.5%",
        ...commonStyles.centerStyles,
        borderRadius: 4
    },
    menuItem: {
        backgroundColor: "#fff",
        ...commonStyles.centerStyles,
        borderRadius: 10
    },
})