import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles'
import { COLORS, SIZES } from '../../component/Constant/Color'
import Auth from '../../service/Auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducer/user'

export default function SplashUserScreen({ navigation }) {
    const dispatch = useDispatch();

    return (
        <View style={{ ...commonStyles.containerStyle }}>
            <View style={styles.wrapper}>
                <Image
                    source={require("../../assets/splash-mg.png")}
                    resizeMode="contain"
                    style={{ width: "80%", height: "80%" }}
                />
            </View>
            {renderButton("Login As Member", () => { navigation.navigate("Login") })}

            {renderButton("As a Guest", async () => {
                const userData = null;
                await Auth.setAccount(userData);
                dispatch(setUser(userData));
                navigation.navigate("Root")
            })}
        </View>
    )
}

const renderButton = (title, onPress) => {
    return (
        <TouchableHighlight
            style={[styles.button]}
            underlayColor="#dcdcdc"
            onPress={onPress}
        >
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 200, height: 200,
        backgroundColor: "#fff",
        borderRadius: 100,
        ...commonStyles.centerStyles,
        marginBottom: 70,
        elevation: 9,
        shadowColor: "#999",
    },
    button: {
        padding: 16,
        width: SIZES.width / 1.2,
        backgroundColor: COLORS.theme,
        marginTop: 16,
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000"
    },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
    },
})