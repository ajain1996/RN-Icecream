import { View, StyleSheet } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles'
import { image_tap, image_tap2 } from '../../component/image_tap'
import Auth from '../../service/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../redux/reducer/user'
import { CustomDrawer } from '../../component/drawer/CustomDrawer'

export function home_header(navigation) {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.User);

    const [modalVisible, setModalVisible] = React.useState(false);

    const handleLogout = () => {
        Auth.logout().then(() => {
            dispatch(removeUser([]));
        })
    }

    console.log("\n\n userData?.userProfile: ", userData)

    const showProfile = () => {
        if (userData?.userProfile?.length === 0) {
            return image_tap(require("../../assets/user.png"), 28, () => { navigation.navigate("MyProfileScreen") })
        } else {
            return image_tap2(userData?.userProfile, 30, () => { navigation.navigate("MyProfileScreen") })
        }
    }

    return (
        <>
            <View style={styles.headerContainer}>
                {image_tap(require("../../assets/menu.png"), 22, () => { setModalVisible(true) })}

                <View style={{ ...commonStyles.rowStart }}>
                    {showProfile()}
                    <View style={{ width: 2 }} />

                    {image_tap(require("../../assets/logout.png"), 20, handleLogout)}
                </View>
            </View>

            <CustomDrawer
                modalVisible={modalVisible}
                callback={() => { setModalVisible(false) }}
                navigation={navigation}
            />
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        ...commonStyles.rowBetween,
        width: "100%", height: 60,
        elevation: 9,
        shadowColor: "#999",
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        borderBottomColor: "#eee",
        borderBottomWidth: 2
    }
})