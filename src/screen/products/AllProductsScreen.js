import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../component/Constant/Color'
import { commonStyles } from '../../utils/Styles'
import CustomHeader from '../../component/Header/CustomHeader'

export const menuItems = [
    {
        image: require("../../assets/prod/i1.webp"),
        name: "Vanila",
    },
    {
        image: require("../../assets/prod/i2.webp"),
        name: "Butter",
    },
    {
        image: require("../../assets/prod/i3.webp"),
        name: "Strawberry",
    },
    {
        image: require("../../assets/prod/i4.webp"),
        name: "Chocolate Chip",
    },

    {
        image: require("../../assets/prod/i5.webp"),
        name: "Matcha",
    },
    {
        image: require("../../assets/prod/i6.webp"),
        name: "Eggnog",
    },
    {
        image: require("../../assets/prod/i7.webp"),
        name: "Butter Pecan",
    },
    {
        image: require("../../assets/prod/i8.webp"),
        name: "Teaberry",
    },

    {
        image: require("../../assets/prod/i9.webp"),
        name: "Neapolitan",
    },
    {
        image: require("../../assets/prod/i10.webp"),
        name: "Moose Tracks",
    },
    {
        image: require("../../assets/prod/i11.webp"),
        name: "Rocky Road",
    },
    {
        image: require("../../assets/prod/i12.jpg"),
        name: "Coffee",
    },
]

export default function AllProductsScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <CustomHeader title="Products" />

            <FlatList
                data={menuItems}
                numColumns={2}
                style={{ marginVertical: 14 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ marginBottom: 12 }} onPress={() => {
                            navigation.navigate("ProductSubCategoryScreen", {
                                product: item,
                            })
                        }}>
                            <View style={styles.menuItem}>
                                <Image
                                    source={item?.image}
                                    resizeMode="stretch"
                                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: "#000", textAlign: "center" }}>{item?.name}</Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <View style={{ height: 60 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        elevation: 9,
        shadowColor: "#999",
        backgroundColor: "#fff",
        width: SIZES.width / 2.12,
        height: SIZES.width / 2.6,
        ...commonStyles.centerStyles,
        margin: 5,
        borderRadius: 10
    },
})