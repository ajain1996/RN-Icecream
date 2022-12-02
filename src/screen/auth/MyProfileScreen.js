import { View, Text } from 'react-native'
import React from 'react'
import { home_header } from '../home/home_header'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../component/Constant/Color'
import { commonStyles } from '../../utils/Styles'
import { Image } from 'react-native'
import { image_tap } from '../../component/image_tap'
import { DrawerButton } from '../../component/drawer/CustomDrawer'
import Auth from '../../service/Auth'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/reducer/user'

export default function MyProfileScreen({ navigation }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        Auth.logout().then(() => {
            dispatch(removeUser([]));
        })
    }

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
            {home_header(navigation)}

            <View style={styles.itemContent}>
                <View style={{ ...commonStyles.rowStart }}>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80" }}
                        style={styles.itemImg}
                    />
                    <View style={styles.memberNameBlock}>
                        <Text style={styles.memberName}>
                            User Name
                        </Text>
                        <Text style={styles.conpanyName}>
                            (Company name)
                        </Text>
                    </View>
                </View>
                {image_tap(require("../../assets/edit.png"), 25, () => { navigation.navigate("UpdateUserScreen") })}
            </View>

            <View style={{ padding: 18 }}>
                <Text style={styles.memberAddress}>
                    Address: 180 Local street, Member Address, Member address 2
                </Text>
                <Text style={styles.companywebsite}>
                    Website: (Company website)
                </Text>
            </View>
            <Text />

            <DrawerButton
                title="Share App"
                image={require("../../assets/share.png")}
                onPress={() => { }}
            />

            <DrawerButton
                title="Rate"
                image={require("../../assets/rate.png")}
                onPress={() => { }}
            />

            <DrawerButton
                title="Privacy Policy"
                image={require("../../assets/policy.png")}
                onPress={() => { }}
            />

            <DrawerButton
                title="Terms & Conditions"
                image={require("../../assets/tnc.png")}
                onPress={() => { }}
            />

            <DrawerButton
                title="About Us"
                image={require("../../assets/about.png")}
                onPress={() => { }}
            />

            <DrawerButton
                title="Logout"
                image={require("../../assets/logout.png")}
                onPress={handleLogout}
            />
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
        ...commonStyles.rowBetween,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    itemImg: {
        width: 95, height: 95, borderRadius: 100, marginTop: 20
    },
    memberNameBlock: {
        padding: 16
    },
    memberName: {
        ...commonStyles.fs18_500, color: COLORS.theme
    },
    conpanyName: {
        ...commonStyles.fs12_400, color: COLORS.theme
    },
    memberAddress: {
        ...commonStyles.fs18_500, marginTop: 14
    },
    companywebsite: {
        ...commonStyles.fs12_400, color: COLORS.theme, marginTop: 5
    },
    editIcon: {
        width: 25, height: 25,
        tintColor: "#000",
        marginTop: -10,
        marginLeft: 20,
    }
})