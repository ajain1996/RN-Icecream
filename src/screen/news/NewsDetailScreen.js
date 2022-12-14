import { Text, Image, View, ScrollView } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles';
import { ListItem } from 'react-native-elements';
import CustomHeader from '../../component/Header/CustomHeader';

export default function NewsDetailScreen({ route }) {
    const { item } = route.params;

    return (
        <>
            <CustomHeader title={item.name} />
            <ScrollView style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                <View onPress={() => { }} underlayColor="#fff" style={{ padding: 16 }}>
                    <Image
                        source={item?.avatar_url}
                        resizeMode="cover"
                        style={{ width: "100%", height: 300, borderRadius: 12 }}
                    />
                    <View style={{ marginTop: 8 }}>
                        <ListItem.Title style={{ ...commonStyles.fs14_700 }}>
                            {item.title}
                        </ListItem.Title>
                        <View style={{ ...commonStyles.rowStart }}>
                            <Text style={{ ...commonStyles.fs12_400, marginTop: 4 }}>
                                {item.name}
                            </Text>

                            <Text style={{ width: 6, height: 6, borderRadius: 100, marginTop: 4, backgroundColor: "#dcdcdc", marginHorizontal: 20 }} />

                            <Text style={{ ...commonStyles.fs12_400, marginTop: 4 }}>
                                {item.time}
                            </Text>
                        </View>

                        <Text style={{ ...commonStyles.fs14_400, marginTop: 20 }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>

                        <Text style={{ ...commonStyles.fs14_400, marginTop: 20 }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}