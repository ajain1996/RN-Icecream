import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import ApplyFormInput from '../../component/ApplyFormInput';
import { COLORS, SIZES } from '../../component/Constant/Color';
import { ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { StyleSheet } from 'react-native';
import { commonStyles } from '../../utils/Styles';
import CustomHeader from '../../component/Header/CustomHeader';
import { RenderUpload } from '../../component/RenderImageUpload';
import { addProductPostRequest } from '../../utils/API';
import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import CustomLoader, { CustomPanel } from '../../component/CustomLoader';

export default function CreateProductScreen({ navigation }) {
    const [nameOfProduct, setNameOfProduct] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [category0, setcategory0] = React.useState("");
    const [category1, setcategory1] = React.useState("");
    const [category2, setcategory2] = React.useState("");
    const [subcategory0, setsubcategory0] = React.useState("");
    const [subcategory1, setsubcategory1] = React.useState("");

    const [imageError, setImageError] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [currentStatus, setCurrentStatus] = React.useState("");
    const [imageData, setImageData] = React.useState("");

    const handleSubmit = async () => {
        if (nameOfProduct.length === 0) {
            Alert.alert("Alert", "Name of product is required")
        } else if (description.length === 0) {
            Alert.alert("Alert", "Description is required")
        } else if (imageData.length === 0) {
            Alert.alert("Alert", "Please select Image")
        } else if (category0.length === 0) {
            Alert.alert("Alert", "Category is required")
        } else if (subcategory0.length === 0) {
            Alert.alert("Alert", "Sub category is required")
        } else {
            setLoading(true);
            addProductPostRequest(
                nameOfProduct,
                description,
                imageData,
                category0,
                category1,
                category2,
                subcategory0,
                subcategory1,
                (response) => {
                    setLoading(false);
                    Toast.show('Product created Successfully!');
                    navigation.goBack()
                    if (response !== null) { }
                },
            )
        }
    }

    return (
        <>
            <CustomHeader title="Product Management" />
            <ScrollView style={{ width: '100%', height: "100%", backgroundColor: "#fff" }}>
                <Text />
                <ApplyFormInput
                    heading="Name of the product"
                    placeholderText="Name of the product"
                    labelValue={nameOfProduct}
                    onChangeText={(val) => {
                        setNameOfProduct(val);
                    }}
                />

                <ApplyFormInput
                    heading="Code Number of the product"
                    placeholderText="Code Number of the product"
                    labelValue={nameOfProduct}
                    onChangeText={(val) => {
                        setNameOfProduct(val);
                    }}
                />

                <ApplyFormInput
                    heading="Item Description / Specification"
                    placeholderText="Item Description / Specification"
                    labelValue={nameOfProduct}
                    onChangeText={(val) => {
                        setdescription(val);
                    }}
                />

                <ApplyFormInput
                    heading="BAR CODE of the proudct"
                    placeholderText="BAR CODE of the proudct"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                {/* Reorder / Low Stock Warning */}

                <ApplyFormInput
                    heading="Category of the product"
                    placeholderText="Category of the product"
                    onChangeText={(val) => {
                        setcategory0(val);
                    }}
                />

                <ApplyFormInput
                    heading="Sub Category of the product"
                    placeholderText="Sub Category of the product"
                    onChangeText={(val) => {
                        setsubcategory0(val);
                    }}
                />

                <ApplyFormInput
                    heading="UOM of the product"
                    placeholderText="UOM of the product"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Alternate UOM of the product"
                    placeholderText="Alternate UOM of the product"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Purchase Price"
                    placeholderText="Purchase Price"
                    keyboardType="number-pad"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Tax On Purchase Price"
                    placeholderText="Tax On Purchase Price"
                    keyboardType="number-pad"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Sales Price"
                    placeholderText="Sales Price"
                    keyboardType="number-pad"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Tax On Sales Price"
                    placeholderText="Tax On Sales Price"
                    keyboardType="number-pad"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="MRP"
                    placeholderText="MRP"
                    keyboardType="number-pad"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="HSN Code"
                    placeholderText="HSN Code"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="GST Rate"
                    placeholderText="GST Rate"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Enable Batch Monitoring"
                    placeholderText="Enable Batch Monitoring "
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <RenderUpload
                    image={imageData}
                    imageError={imageError}
                    setImageError={setImageError}
                    setImageData={setImageData}
                    title="Product Photo Upload - Max 5 Photo"
                />

                <RenderCustomCheckBox
                    title="Show this product on Online Sales Portal "
                    list={["Yes", "No"]}
                    selectedVal={currentStatus}
                    callback={(item) => {
                        setCurrentStatus(item.toLocaleLowerCase())
                    }}
                />

                <View style={{ padding: 20 }}>
                    <TouchableHighlight style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>SUBMIT</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>

            <CustomLoader loading={loading} />
            <CustomPanel loading={loading} />
        </>
    )
}

const RenderCustomCheckBox = ({ title, list, selectedVal, callback }) => {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ ...commonStyles.fs12_400 }}>{title}</Text>
            <FlatList
                data={list}
                numColumns={3}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={[styles.checkboxWrapper]} activeOpacity={0.8}
                            onPress={() => { callback(item) }}
                        >
                            <View style={[styles.checkbox]}>
                                <View style={{
                                    width: 11, height: 11, borderRadius: 100,
                                    backgroundColor: selectedVal === item.toLocaleLowerCase() ? "#000" : "#fff"
                                }} />
                            </View>
                            <Text style={{ ...commonStyles.fs12_500, marginLeft: 8 }}>{item}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        ...commonStyles.fs12_400, marginLeft: 20, alignSelf: 'flex-start'
    },
    gstCertificate: {
        width: "90%", height: 67, borderWidth: 1, borderColor: "#BDBDBD",
        ...commonStyles.centerStyles, margin: 6, paddingHorizontal: 20,
        marginBottom: 14
    },
    checkbox: {
        width: 17, height: 17,
        borderRadius: 100,
        borderWidth: 1,
        ...commonStyles.centerStyles
    },
    checkboxWrapper: {
        ...commonStyles.rowStart,
        alignItems: "center",
        marginVertical: 8,
        width: SIZES.width / 3.4,
    },
    btn: {
        backgroundColor: COLORS.theme,
        width: '100%',
        height: 52,
        borderRadius: 8,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000"
    },
    btnText: {
        ...commonStyles.fs16_500,
        color: '#fff',
    },
})
