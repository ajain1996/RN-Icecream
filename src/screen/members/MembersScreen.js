import { View, Text } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles'
import { StyleSheet } from 'react-native'
import { membersHeader } from './membersHeader'
import { COLORS } from '../../component/Constant/Color'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { getAllCategoriesAPI } from '../../utils/API'

export default function MembersScreen({ navigation }) {

    React.useEffect(() => {
        getAllCategoriesAPI((response) => {
            if (response !== null) {
                console.log("\n\n getAllCategoriesAPI response: ", response)
            }
        })
    }, [])

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
            {membersHeader(navigation)}

            <ScrollView>
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.itemWrapper} key={index} activeOpacity={0.9}
                            onPress={() => { navigation.navigate("MemberDetailScreen") }}
                        >
                            <View style={{ width: "100%", padding: 14 }}>
                                <Text style={styles.memberName}>
                                    Member Name
                                </Text>
                                <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>
                                    (Company name)
                                </Text>
                            </View>
                            <View style={styles.itemContent}>
                                <Image
                                    source={{ uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80" }}
                                    style={styles.itemImg}
                                />
                                <View style={styles.memberNameBlock}>
                                    <Text style={[styles.memberName, { color: COLORS.theme }]}>
                                        Member Name
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        (Company name)
                                    </Text>

                                    <Text style={styles.memberAddress}>
                                        Address: 180 Local street, Member Address, Member address 2
                                    </Text>
                                    <Text style={styles.companywebsite}>
                                        Website: (Company website)
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        elevation: 9,
        shadowColor: "#999",
        backgroundColor: COLORS.theme,
        borderRadius: 8,
        marginTop: 16,
        marginHorizontal: 14
    },
    itemContent: {
        ...commonStyles.rowStart,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        backgroundColor: "#fff",
    },
    itemImg: {
        width: 90, height: 90, borderRadius: 100, marginTop: 20
    },
    memberNameBlock: {
        width: "100%", padding: 16, width: "80%"
    },
    memberName: {
        ...commonStyles.fs18_500, color: "#fff"
    },
    conpanyName: {
        ...commonStyles.fs12_400, color: COLORS.theme
    },
    memberAddress: {
        ...commonStyles.fs18_500, marginTop: 14
    },
    companywebsite: {
        ...commonStyles.fs12_400, color: COLORS.theme, marginTop: 5
    }
})