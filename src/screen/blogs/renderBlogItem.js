import { Text, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles';
import { ListItem } from 'react-native-elements';
import { SIZES } from '../../component/Constant/Color';
import moment from 'moment';

export const renderBlogItem = (item, navigation) => {
    console.log("\n\n item: ", item)
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate("BlogsDetailScreen", { item: item }) }}
            underlayColor="#fff" style={{ marginVertical: 12, width: SIZES.width / 1.1 }} activeOpacity={1}
        >
            {item?.image?.startsWith("https")
                ? <Image
                    source={{ uri: item?.image }}
                    style={{ width: "100%", height: 180, borderRadius: 9 }}
                />
                : <Image
                    source={require("../../assets/news/n1.jpg")}
                    style={{ width: "100%", height: 180, borderRadius: 9 }}
                />}

            <ListItem.Content style={{ marginTop: 8 }}>
                <ListItem.Title style={{ ...commonStyles.fs12_700 }}>
                    {item?.caption}
                </ListItem.Title>
                <Text style={{ ...commonStyles.fs12_400, marginTop: 4 }}>
                    {item?.content}
                </Text>
                <View style={{ ...commonStyles.rowStart }}>
                    {/* <Text style={{ ...commonStyles.fs12_400, marginTop: 4 }}>
                        {item?.content}
                    </Text>

                    <Text style={{
                        width: 6, height: 6,
                        borderRadius: 100,
                        marginTop: 4,
                        backgroundColor: "#dcdcdc",
                        marginHorizontal: 20
                    }} /> */}

                    <Text style={{ ...commonStyles.fs12_400, marginTop: 4 }}>
                        {moment(item?.updated_at).format("MM")} minutes ago
                    </Text>
                </View>
            </ListItem.Content>
        </TouchableOpacity>
    );
}