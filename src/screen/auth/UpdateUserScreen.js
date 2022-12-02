import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Toast from 'react-native-simple-toast';
import ApplyFormInput from '../../component/ApplyFormInput';
import ApplyFormPicker from '../../component/ApplyFormPicker';
import { COLORS, SIZES } from '../../component/Constant/Color';
import CountryFormPicker from '../../component/CountryFormPicker';
import CitiesFormPicker from '../../component/CitiesFormPicker';
import { ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { StyleSheet } from 'react-native';
import { commonStyles } from '../../utils/Styles';
import { Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import CustomHeader from '../../component/Header/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../service/Auth';
import { updateUserPostRequest } from '../../utils/API';
import { setUser } from '../../redux/reducer/user';

export default function UpdateUserScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { userData } = route?.params;

    var companyTypeList = [
        { name: "Public Ltd", value: "Public Ltd" },
        { name: "Pvt. Ltd.", value: "Pvt. Ltd." },
        { name: "Propritorship", value: "Propritorship" },
        { name: "OPC", value: "OPC" },
        { name: "LLP", value: "LLP" },
        { name: "Individual", value: "Individual" },
        { name: "Other", value: "Other" },
    ];

    var businessTypeList = [
        { name: "Manufacturer", value: "Manufacturer" },
        { name: "Super Stokist", value: "Super Stokist" },
        { name: "Distributor", value: "Distributor" },
        { name: "Channel Partner", value: "Channel Partner" },
        { name: "Franchise Outlet", value: "Franchise Outlet" },
    ];

    const [organizationName, setOrganizationName] = React.useState("");
    const [shortName, setShortName] = React.useState("");
    const [alternateMobNo, setAlternateMobNo] = React.useState("");
    const [typeOfCompany, setTypeOfCompany] = React.useState("");
    const [businessType, setBusinessType] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");

    const [allCountries, setAllCountries] = React.useState([]);
    const [allCities, setAllCities] = React.useState([]);
    const [allStates, setAllStates] = React.useState([]);

    const [gstError, setGSTError] = React.useState(false);
    const [panFileError, setPANFileError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [gstCertificate, setGSTCertificate] = React.useState("");
    const [panFile, setPANFile] = React.useState("");
    const [currentStatus, setCurrentStatus] = React.useState("");
    const [paymentStatus, setPaymentStatus] = React.useState("");

    const [user_profile, setUser_Profile] = React.useState("");
    const [address_1, setAddress_1] = React.useState("");
    const [address_2, setAddress_2] = React.useState("");
    const [address_3, setAddress_3] = React.useState("");
    const [landmark, setLandmark] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [gst_number, setGst_Number] = React.useState("");
    const [est_year, setEst_Year] = React.useState("");
    const [employee_number, setEmployee_Number] = React.useState("");
    const [turnover, setTurnover] = React.useState("");
    const [business_category0, setBusiness_Category0] = React.useState("");
    const [company_logo, setCompany_Logo] = React.useState("");
    const [comapany_profile, setComapany_Profile] = React.useState("");
    const [gst_image, setGST_Image] = React.useState("");
    const [pan_image, setPAN_Image] = React.useState("");
    const [company_brochure, setCompany_Brochure] = React.useState("");
    const [comapny_ad, setComapny_AD] = React.useState("");
    const [pan_number, setPAN_Number] = React.useState("");

    const fetchCountries = async () => {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states")
        const json = await response.json();
        setAllCountries(json?.data)
        return json;
    }

    const selectPdfFile = async (text) => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                mode: 'import',
                copyTo: 'cachesDirectory',
            });

            var realPath;
            if (Platform.OS === 'ios') {
                var RNFS = require('react-native-fs');
                let url = res.uri;
                const split = url.split('/');
                const name = split.pop();
                const inbox = split.pop();
                realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
            } else {
                realPath = res.uri;
            }
            if (text === "Upload GST Certificate") {
                setGSTCertificate(res[0]);
            } else if (text === "Upload Pan Number") {
                setPANFile(res[0])
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };

    React.useEffect(() => {
        fetchCountries()
    }, [])

    const handleSubmit = async () => {
        updateUserPostRequest(
            userData?.email,
            userData?.phone,
            userData?.fullname,
            user_profile,
            organizationName,
            shortName,
            alternateMobNo,
            address_1,
            address_2,
            address_3,
            country,
            state,
            city,
            landmark,
            longitude,
            gst_number,
            est_year,
            employee_number,
            turnover,
            businessType,
            // business_category0,
            "business_category1",
            "business_category2",
            company_logo,
            comapany_profile,
            gst_image,
            pan_image,
            company_brochure,
            comapny_ad,
            pan_number,
            async (response) => {
                if (response !== null) {
                    console.log("\n\n userData: ", userData)
                    await Auth.setAccount(userData);
                    Toast.show('Successfully Registered!');
                    navigation.navigate("Root")
                    dispatch(setUser(userData));
                }
            },
        )
    }

    return (
        <>
            <CustomHeader title="Update Profile" />
            <ScrollView style={{ width: '100%', height: "100%", backgroundColor: "#fff" }}>
                <Text />
                <ApplyFormInput
                    heading="Name of Organisaion"
                    placeholderText="Name of Organisaion"
                    labelValue={organizationName}
                    onChangeText={(val) => {
                        setOrganizationName(val);
                    }}
                />

                <ApplyFormInput
                    heading="Short Name"
                    placeholderText="Short Name"
                    labelValue={shortName}
                    onChangeText={(val) => {
                        setShortName(val);
                    }}
                />

                <ApplyFormInput
                    heading="Alternate mobile number"
                    placeholderText="Alternate mobile number"
                    labelValue={alternateMobNo}
                    onChangeText={(val) => {
                        setAlternateMobNo(val);
                    }}
                />

                <ApplyFormPicker
                    heading="Type of company"
                    placeholderText="Type of company"
                    dropDownValue={typeOfCompany}
                    width={SIZES.width - 120}
                    height={380}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val)
                        setTypeOfCompany(val)
                    }}
                    data={companyTypeList}
                />

                <ApplyFormPicker
                    heading="Business Type / Category"
                    placeholderText="Business Type / Category"
                    dropDownValue={businessType}
                    width={SIZES.width - 120}
                    height={380}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val)
                        setBusinessType(val)
                    }}
                    data={businessTypeList}
                />

                <ApplyFormInput
                    heading="Business Owner's Name"
                    placeholderText="Business Owner's Name"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Business Owner's Email ID"
                    placeholderText="Business Owner's Email ID"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Business Owner's Mobile"
                    placeholderText="Business Owner's Mobile"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Address-1"
                    placeholderText="Address-1"
                    onChangeText={(val) => {
                        setAddress_1(val);
                    }}
                />

                <ApplyFormInput
                    heading="Address-2"
                    placeholderText="Address-2"
                    onChangeText={(val) => {
                        setAddress_2(val);
                    }}
                />

                <ApplyFormInput
                    heading="Address-3"
                    placeholderText="Address-3"
                    onChangeText={(val) => {
                        setAddress_3(val);
                    }}
                />

                <CountryFormPicker
                    heading="Country"
                    placeholderText="Country"
                    dropDownValue={country}
                    width={SIZES.width / 1.05}
                    height={SIZES.height / 1.14}
                    onDateSelected={function (val, states) {
                        console.log('\n\n Selected states :::: ', states)
                        setCountry(val)
                        setAllStates(states);
                    }}
                    data={allCountries}
                />

                <CountryFormPicker
                    heading="State"
                    placeholderText="State"
                    dropDownValue={state}
                    width={SIZES.width / 1.05}
                    height={SIZES.height / 1.14}
                    onDateSelected={async function (val) {
                        console.log('\n\n Selected val :::: ', val)
                        setState(val)

                        const body = {
                            country: "India",
                            state: "Madhya Pradesh"
                        }

                        const citiesData = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
                            method: "POST",
                            headers: {
                                "X-Powered-By": "Express",
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "*",
                                "Content-Type": "application/json",
                                "Content-Length": "1036708",
                                "ETag": 'W/"fd1a4-+y1qCVg9E600sahDr1s3nW1FTHQ"',
                                "Date": "Sun, 02 Aug 2020 10:37:45 GMT",
                                "Connection": "keep-alive"
                            },
                            body: JSON.stringify(body),
                        })

                        const json = await citiesData.json();
                        setAllCities(json?.data);
                    }}
                    data={allStates}
                />

                <CitiesFormPicker
                    heading="Cities"
                    placeholderText="Cities"
                    dropDownValue={city}
                    width={SIZES.width / 1.05}
                    height={SIZES.height / 1.14}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val)
                        setCity(val)
                    }}
                    data={allCities}
                />

                <ApplyFormInput
                    heading="Landmark Location on Google"
                    placeholderText="Landmark Location on Google"
                    onChangeText={(val) => {
                        setLandmark(val);
                    }}
                />

                <ApplyFormInput
                    heading="Google LAT / LONG Position  Cordinates"
                    placeholderText="Google LAT / LONG Position  Cordinates"
                    onChangeText={(val) => {
                        setLongitude(val);
                    }}
                />

                <ApplyFormInput
                    heading="Are you a member of any other association"
                    placeholderText="Are you a member of any other association"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="GST Number"
                    placeholderText="GST Number"
                    onChangeText={(val) => {
                        setGst_Number(val);
                    }}
                />

                <RenderCustomFilePicker
                    title="Upload GST Certificate"
                    file={gstCertificate}
                    fileError={gstError}
                    setFile={setGSTCertificate}
                    selectPdfFile={selectPdfFile}
                    setFileError={setGSTError}
                />

                <ApplyFormInput
                    heading="PAN Number"
                    placeholderText="PAN Number"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <RenderCustomFilePicker
                    title="Upload Pan Number"
                    file={panFile}
                    fileError={panFileError}
                    setFile={setPANFile}
                    selectPdfFile={selectPdfFile}
                    setFileError={setPANFileError}
                />

                <ApplyFormInput
                    heading="Establishment Year"
                    placeholderText="Establishment Year"
                    onChangeText={(val) => {
                        setEst_Year(val);
                    }}
                />

                <ApplyFormInput
                    heading="Number of Employees"
                    placeholderText="Number of Employees"
                    onChangeText={(val) => {
                        setEmployee_Number(val);
                    }}
                />

                <ApplyFormInput
                    heading="Approx Turnover in Lacs"
                    placeholderText="Approx Turnover in Lacs"
                    onChangeText={(val) => {
                        setTurnover(val);
                    }}
                />

                <ApplyFormInput
                    heading="Manufacturing Setup Address/ es"
                    placeholderText="Manufacturing Setup Address/ es"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Pacakge Code Offered under this Subscription"
                    placeholderText="Pacakge Code Offered under this Subscription"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Your Service Account Manager Desk ID"
                    placeholderText="Your Service Account Manager Desk ID"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Your Service Account Manager Name with Photo"
                    placeholderText="Your Service Account Manager Name with Photo"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Your Service Account Manager Mob"
                    placeholderText="Your Service Account Manager Mob"
                    onChangeText={(val) => {
                        // setComments(val);
                    }}
                />

                <RenderCustomCheckBox
                    title="Current Status"
                    list={["Activated", "Deactivated"]}
                    selectedVal={currentStatus}
                    callback={(item) => {
                        setCurrentStatus(item.toLocaleLowerCase())
                    }}
                />
                <View style={{ height: 10 }} />

                <RenderCustomCheckBox
                    title="Payment Status"
                    list={["Free Period", "Paid 3M", "Paid 6M", "Paid 1Y", "Paid 2Y", "Paid 5Y", "On Grace Period "]}
                    selectedVal={paymentStatus}
                    callback={(item) => {
                        setPaymentStatus(item.toLocaleLowerCase())
                    }}
                />

                <View style={{ padding: 20 }}>
                    <TouchableHighlight style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>SUBMIT</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}

const RenderCustomFilePicker = ({ title, file, fileError, setFile, selectPdfFile, setFileError }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.heading}>{title}</Text>
            {file.length === 0
                ? <TouchableHighlight
                    style={[styles.gstCertificate]}
                    onPress={() => { selectPdfFile(title); setFileError(false); }}
                    underlayColor="#f7f8f9"
                >
                    <Image
                        source={require("../../assets/attach.png")}
                        style={{ width: 24, height: 24, tintColor: "#BDBDBD" }}
                    />
                </TouchableHighlight>
                : <View style={[styles.gstCertificate, commonStyles.rowBetween]}>
                    <Text style={{ ...commonStyles.fs14_500 }}>{file.name}</Text>
                    <TouchableHighlight onPress={() => setFile("")} underlayColor="#f7f8f9">
                        <Image
                            source={require("../../assets/cross.png")}
                            style={{ width: 20, height: 20, tintColor: "#BDBDBD" }}
                        />
                    </TouchableHighlight>
                </View>}
            {fileError
                ? <Text style={{ ...commonStyles.fs12_400, color: "red" }}>GST Certificate is mandatory</Text>
                : <></>}
        </View>
    )
}

const RenderCustomCheckBox = ({ title, list, selectedVal, callback }) => {
    console.log("\n\n List: ", list)
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
        // marginRight: 26
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
