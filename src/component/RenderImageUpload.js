import { Alert, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { commonStyles } from '../utils/Styles';
import { SIZES } from './Constant/Color';

export const RenderUpload = ({ image, imageError, setImageError, setImageData, title }) => {

    const getImage = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = []
                response.forEach((item) => {
                    let image = {
                        name: item?.name,
                        uri: item?.path,
                        type: item?.mime,
                    }
                    tempArray.push(image)
                })
                if (tempArray.length < 1) {
                    Alert.alert("Alert", "Please select atleast an images");
                } else if (tempArray.length > 5) {
                    Alert.alert("Alert", "You can select upto 5 Images");
                } else {
                    setImageData(tempArray);
                }
            })
    }

    return (
        <View style={{ marginHorizontal: 20 }}>
            <Text style={{ ...commonStyles.fs12_400, marginBottom: 6 }}>{title}</Text>
            <View>
                {image.length === 0
                    ? <TouchableHighlight onPress={() => { getImage(); setImageError(false) }} style={{ paddingBottom: 16 }}
                        underlayColor="#f7f8f9"
                    >
                        <View style={{ justifyContent: "center" }}>
                            <View style={[styles.upload]}>
                                <Image
                                    source={require("../assets/camera.png")}
                                    resizeMode="contain"
                                    style={{ width: 100, height: 100, tintColor: "#000" }}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                    : <View style={{ flex: 1, marginTop: 6, marginBottom: 20 }}>
                        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                            {
                                image.map((res) => {
                                    return (
                                        <Image
                                            source={{ uri: res?.uri }}
                                            resizeMode="stretch"
                                            style={{ width: SIZES.width / 1.3, height: SIZES.width / 1.4, borderRadius: 9, marginRight: 20 }}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                        <TouchableHighlight onPress={() => setImageData("")}
                            style={{ position: "absolute", top: 6, right: 6, borderRadius: 100 }}
                            underlayColor="#f7f8f9"
                        >
                            <Image
                                source={require("../assets/cross.png")}
                                style={{ width: 25, height: 25, tintColor: "#000" }}
                            />
                        </TouchableHighlight>
                    </View>}
            </View>
            {imageError
                ? <Text style={{ ...commonStyles.fs12_400, color: "red", marginTop: -24 }}>Image is mandatory</Text>
                : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    upload: {
        width: "100%", height: 150,
        borderRadius: 20,
        backgroundColor: "#eee",
        ...commonStyles.centerStyles
    },
    descriptionInput: {
        width: "100%", height: 77,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 4,
        color: "#000",
        padding: 10,
        fontSize: 14,
        lineHeight: 20,
        marginTop: 6
    },
    locationInput: {
        width: "100%", height: 55,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 4,
        color: "#000",
        padding: 16,
        fontSize: 14,
        lineHeight: 20,
        marginTop: 6
    },
    datePicker: {
        width: SIZES.width / 2.24,
        borderWidth: 1, height: 55,
        borderColor: "#BDBDBD",
        ...commonStyles.rowStart,
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 6
    }
})