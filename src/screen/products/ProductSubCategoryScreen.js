import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeader from '../../component/Header/CustomHeader'
import { commonStyles } from '../../utils/Styles'

export const menuItems = [
    {
        image: require("../../assets/prod/c1.webp"),
        name: "Turkey Hill",
    },
    {
        image: require("../../assets/prod/c2.jpg"),
        name: "Magnum",
    },
    {
        image: require("../../assets/prod/c3.webp"),
        name: "Vadilal",
    },
    {
        image: require("../../assets/prod/c4.webp"),
        name: "Breyers",
    },

    {
        image: require("../../assets/prod/c5.jpg"),
        name: "Amul",
    },
    {
        image: require("../../assets/prod/c6.webp"),
        name: "Kwality Walls",
    },
]

export default function ProductSubCategoryScreen({ navigation }) {
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
            <CustomHeader title="Cone" />

            <FlatList
                data={menuItems}
                contentContainerStyle={{}}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.productItem}
                            onPress={() => {
                                navigation.navigate("ProductDetailScreen")
                            }}
                        >
                            <Image
                                source={item?.image}
                                resizeMode="stretch"
                                style={{ width: 74, height: 74, borderRadius: 16 }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ ...commonStyles.fs15_600, color: "#000" }}>{item?.name}</Text>
                                <Text style={{ ...commonStyles.fs12_400, color: "#000" }}>{"Icecream sweet icecream"}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    productItem: {
        ...commonStyles.rowStart,
        width: "100%", padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    }
})