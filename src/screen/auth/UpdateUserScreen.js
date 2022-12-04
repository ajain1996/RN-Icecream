import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
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
import DocumentPicker from 'react-native-document-picker';
import CustomHeader from '../../component/Header/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../service/Auth';
import { updateUserPostRequest } from '../../utils/API';
import { setUser } from '../../redux/reducer/user';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import CustomLoader, { CustomPanel } from '../../component/CustomLoader';
import { response3 } from './VerifyOTP';

export default function UpdateUserScreenIn({ navigation, route }) {
    const dispatch = useDispatch();
    // const { userData } = route?.params;
    const userData = response3?.data;

    console.log("\n\n userData: ", userData?.user_profile)

    const companyTypeList = [
        { name: 'Public Ltd', value: 'Public Ltd' },
        { name: 'Pvt. Ltd.', value: 'Pvt. Ltd.' },
        { name: 'Propritorship', value: 'Propritorship' },
        { name: 'OPC', value: 'OPC' },
        { name: 'LLP', value: 'LLP' },
        { name: 'Individual', value: 'Individual' },
        { name: 'Other', value: 'Other' },
    ];

    const businessTypeList = [
        { name: 'Manufacturer', value: 'Manufacturer' },
        { name: 'Super Stokist', value: 'Super Stokist' },
        { name: 'Distributor', value: 'Distributor' },
        { name: 'Channel Partner', value: 'Channel Partner' },
        { name: 'Franchise Outlet', value: 'Franchise Outlet' },
    ];

    const numberOfEmployeesList = [
        { name: '< 10', value: '< 10' },
        { name: '11 - 50', value: '11 - 50' },
        { name: '51 - 100', value: '51 - 100' },
        { name: '> 100', value: '> 100' },
    ];

    const [organizationName, setOrganizationName] = React.useState('');
    const [shortName, setShortName] = React.useState('');
    const [alternateMobNo, setAlternateMobNo] = React.useState('');
    const [typeOfCompany, setTypeOfCompany] = React.useState('');
    const [businessType, setBusinessType] = React.useState('');
    const [businessTypeCategory, setBusinessTypeCategory] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [packageCode, setPackageCode] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');

    const [allCountries, setAllCountries] = React.useState([]);
    const [allCities, setAllCities] = React.useState([]);
    const [allStates, setAllStates] = React.useState([]);

    const [gstError, setGSTError] = React.useState(false);
    const [panFileError, setPANFileError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [gstCertificate, setGSTCertificate] = React.useState('');
    const [panFile, setPANFile] = React.useState('');
    const [currentStatus, setCurrentStatus] = React.useState('');
    const [paymentStatus, setPaymentStatus] = React.useState('');

    const [user_profile, setUser_Profile] = React.useState(userData?.userProfile);
    const [address_1, setAddress_1] = React.useState('');
    const [address_2, setAddress_2] = React.useState('');
    const [address_3, setAddress_3] = React.useState('');
    const [landmark, setLandmark] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [gst_number, setGst_Number] = React.useState('');
    const [est_year, setEst_Year] = React.useState('');
    const [employee_number, setEmployee_Number] = React.useState('');
    const [turnover, setTurnover] = React.useState('');
    const [business_category0, setBusiness_Category0] = React.useState('');
    const [company_logo, setCompany_Logo] = React.useState('');
    const [comapany_profile, setComapany_Profile] = React.useState('');
    const [company_brochure, setCompany_Brochure] = React.useState('');
    const [comapny_ad, setComapny_AD] = React.useState('');
    const [pan_number, setPAN_Number] = React.useState('');

    const [businessOwnerName, setBusinessOwnerName] = React.useState("")
    const [businessOwnerEmail, setBusinessOwnerEmail] = React.useState("")
    const [businessOwnerPhone, setBusinessOwnerPhone] = React.useState("")

    const fetchCountries = async () => {
        const response = await fetch(
            'https://countriesnow.space/api/v0.1/countries/states',
        );
        const json = await response.json();
        setAllCountries(json?.data);
        return json;
    };

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const getImage = (text) => {
        launchImageLibrary(options, response => {
            if (response?.didCancel) {
            } else if (response?.error) {
            } else if (response?.customButton) {
            } else {
                if (text === "profile") {
                    setUser_Profile(response?.assets[0].uri);
                } else if (text === "logo") {
                    setCompany_Logo(response?.assets[0].uri);
                } else if (text === "brochure") {
                    setCompany_Brochure(response?.assets[0].uri);
                }
            }
        });
    };

    const selectPdfFile = async text => {
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
            } else { realPath = res.uri }
            if (text.includes('Upload GST Certificate')) {
                setGSTCertificate(res[0]);
            } else if (text.includes('Upload Pan Number')) {
                setPANFile(res[0]);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else { throw err }
        }
    };

    const handleSubmit = async () => {
        if (typeOfCompany.length === 0) {
            Alert.alert("Alert", "Company type is mandatory")
        } else if (businessType.length === 0) {
            Alert.alert("Alert", "Business type is mandatory")
        } else if (businessOwnerName.length === 0) {
            Alert.alert("Alert", "Business Owner Name is mandatory")
        } else if (businessOwnerEmail.length === 0) {
            Alert.alert("Alert", "Business Owner Email is mandatory")
        } else if (businessOwnerPhone.length === 0) {
            Alert.alert("Alert", "Business Owner Phone is mandatory")
        } else if (state.length === 0) {
            Alert.alert("Alert", "State is mandatory")
        } else if (city.length === 0) {
            Alert.alert("Alert", "City is mandatory")
        } else if (user_profile.length === 0) {
            Alert.alert("Alert", "Profile pic is mandatory")
        } else if (gstCertificate.length === 0) {
            Alert.alert("Alert", "Please upload gst image")
        } else if (pan_number.length === 0) {
            Alert.alert("Alert", "Please enter pan number")
        } else if (panFile.length === 0) {
            Alert.alert("Alert", "Please upload pan card")
        } else if (est_year.length === 0) {
            Alert.alert("Alert", "Establishment year is mandatory")
        } else if (employee_number.length === 0) {
            Alert.alert("Alert", "Number of employees is mandatory")
        } else if (turnover.length === 0) {
            Alert.alert("Alert", "Turnover is mandatory")
        } else {
            setLoading(true);
            Auth.getLocalStorageData('usertoken').then((token) => {
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
                    'business_category1',
                    'business_category2',
                    company_logo,
                    comapany_profile,
                    gstCertificate,
                    panFile,
                    company_brochure,
                    comapny_ad,
                    pan_number,
                    token,
                    async response => {
                        setLoading(false);
                        console.log('\n\n updateUserPostRequest response: ', response?.status);
                        console.log("\n\n userData: ", userData)
                        const userData2 = {
                            fullname: userData?.fullname,
                            phone: userData?.phone,
                            email: userData?.email,
                            password: userData?.password,
                            userProfile: user_profile.length === 0 ? userData?.userProfile : user_profile,
                            companyName: organizationName.length === 0 ? userData?.companyName : organizationName,
                            address: address_1.length === 0 ? userData?.address : address_1,
                        }
                        if (response !== null) {
                            await Auth.setAccount(userData2);
                            dispatch(setUser(userData2))
                            if (response?.message) {
                                Toast.show(response?.message);
                                return;
                            }
                            Toast.show('Updated Successfully!');
                            navigation.goBack();
                            // if (response?.status?.toString()?.toLocaleLowerCase() === "done") {
                            // }
                        }
                    },
                );
            });
        }
    };

    React.useEffect(() => {
        if (userData?.organization_name !== undefined) {
            setOrganizationName(userData?.organization_name)
        }
        if (userData?.short_name !== undefined) {
            setShortName(userData?.short_name)
        }
        if (userData?.mobile !== undefined) {
            setAlternateMobNo(userData?.mobile)
        }
        if (userData?.address_1 !== undefined) {
            setAddress_1(userData?.address_1)
        }
        if (userData?.address_2 !== undefined) {
            setAddress_2(userData?.address_2)
        }
        if (userData?.address_3 !== undefined) {
            setAddress_3(userData?.address_3)
        }
        if (userData?.country !== undefined) {
            setCountry(userData?.country)
        }
        if (userData?.state !== undefined) {
            setState(userData?.state)
        }
        if (userData?.city !== undefined) {
            setCity(userData?.city)
        }
        if (userData?.landmark !== undefined) {
            setLandmark(userData?.landmark)
        }
        if (userData?.latitude !== undefined) { }
        if (userData?.longitude !== undefined) {
            setLongitude(userData?.latitude)
        }
        if (userData?.company_logo !== undefined) {
            setCompany_Logo(userData?.company_logo)
        }
        if (userData?.comapany_profile !== undefined) {
            setComapany_Profile(userData?.comapany_profile)
        }
        if (userData?.gst_number !== undefined) {
            setGst_Number(userData?.gst_number)
        }
        if (userData?.gst_image !== undefined) {
            setGSTCertificate(userData?.gst_image)
        }
        if (userData?.pan_number !== undefined) {
            setPANFile(userData?.pan_number)
        }
        if (userData?.pan_image !== undefined) {
            setPANFile(userData?.pan_image)
        }
        if (userData?.company_brochure !== undefined) {
            setCompany_Brochure(userData?.company_brochure)
        }
        if (userData?.comapny_ad !== undefined) {
            setComapny_AD(userData?.comapny_ad)
        }
        if (userData?.est_year !== undefined) {
            setEst_Year(userData?.est_year)
        }
        if (userData?.employee_number !== undefined) {
            setEmployee_Number(userData?.employee_number)
        }
        if (userData?.turnover !== undefined) {
            setTurnover(userData?.turnover)
        }
        if (userData?.package_code !== undefined) {
            setPackageCode(userData?.package_code)
        }
        if (userData?.is_subscribed !== undefined) { }
        if (userData?.payment_status !== undefined) {
            setPaymentStatus(userData?.payment_status)
        }
        if (userData?.current_status !== undefined) {
            setCurrentStatus(userData?.current_status)
        }
        if (userData?.validity_date !== undefined) { }
        if (userData?.certificate_issue !== undefined) {
            // set
        }
    }, [])


    console.log("\n\n user Profile", user_profile)

    return (
        <>
            <CustomHeader title="Update Profile" />
            <ScrollView
                style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                <TouchableHighlight
                    style={{ alignItems: 'center', marginVertical: '8%' }}
                    onPress={() => { getImage("profile") }}
                    underlayColor="transparent">
                    {user_profile?.length === 0 || user_profile === undefined ? (
                        <View
                            style={{
                                width: 120, height: 120,
                                borderRadius: 100,
                                backgroundColor: '#f7f8f9',
                                ...commonStyles.centerStyles,
                            }}>
                            <Image
                                source={require('../../assets/camera.png')}
                                style={{ width: '75%', height: '75%', tintColor: '#999' }}
                            />
                        </View>
                    ) : (
                        <Image
                            source={{ uri: user_profile }}
                            style={{ width: 120, height: 120, borderRadius: 100 }}
                        />
                    )}
                </TouchableHighlight>
                <Text />
                <ApplyFormInput
                    heading="Name of Organisaion"
                    placeholderText="Name of Organisaion"
                    labelValue={organizationName}
                    onChangeText={val => {
                        setOrganizationName(val);
                    }}
                />

                <ApplyFormInput
                    heading="Short Name"
                    placeholderText="Short Name"
                    labelValue={shortName}
                    capatalize={true}
                    onChangeText={val => {
                        setShortName(val);
                    }}
                />

                <ApplyFormInput
                    heading="Alternate mobile number"
                    placeholderText="Alternate mobile number"
                    labelValue={alternateMobNo}
                    maxLength={10}
                    isNumeric={true}
                    onChangeText={val => {
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
                        console.log('\n\n Selected val :::: ', val);
                        setTypeOfCompany(val);
                    }}
                    data={companyTypeList}
                />

                <>
                    <Text style={styles.heading}>Company Logo</Text>
                    <TouchableHighlight
                        style={{ alignItems: 'center', marginBottom: 16, marginTop: 6 }}
                        onPress={() => { getImage("logo") }}
                        underlayColor="transparent">
                        {company_logo?.length === 0 || company_logo === null ? (
                            <View
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 8,
                                    backgroundColor: '#f7f8f9',
                                    ...commonStyles.centerStyles,
                                }}>
                                <Image
                                    source={require('../../assets/camera.png')}
                                    style={{ width: '75%', height: '75%', tintColor: '#999' }}
                                />
                            </View>
                        ) : (
                            <Image
                                source={{ uri: company_logo }}
                                style={{ width: 120, height: 120, borderRadius: 8 }}
                            />
                        )}
                    </TouchableHighlight>
                </>

                <>
                    <Text style={styles.heading}>Company Brochure</Text>
                    <TouchableHighlight
                        style={{ alignItems: 'center', marginBottom: 16, marginTop: 6 }}
                        onPress={() => { getImage("brochure") }}
                        underlayColor="transparent">
                        {company_brochure?.length === 0 || company_brochure === null ? (
                            <View
                                style={{
                                    width: "90%",
                                    height: 210,
                                    borderRadius: 8,
                                    backgroundColor: '#f7f8f9',
                                    ...commonStyles.centerStyles,
                                }}>
                                <Image
                                    source={require('../../assets/camera.png')}
                                    resizeMode="contain"
                                    style={{ width: '60%', height: '60%', tintColor: '#999' }}
                                />
                            </View>
                        ) : (
                            <Image
                                source={{ uri: company_brochure }}
                                resizeMode="contain"
                                style={{ width: "90%", height: 210, borderRadius: 8 }}
                            />
                        )}
                    </TouchableHighlight>
                </>

                <ApplyFormPicker
                    heading="Business Type"
                    placeholderText="Business Type"
                    dropDownValue={businessType}
                    width={SIZES.width - 120}
                    height={380}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val);
                        setBusinessType(val);
                    }}
                    data={businessTypeList}
                />

                <ApplyFormPicker
                    heading="Business Type / Category"
                    placeholderText="Business Type / Category"
                    dropDownValue={businessTypeCategory}
                    width={SIZES.width - 120}
                    height={380}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val);
                        setBusinessTypeCategory(val);
                    }}
                    data={businessTypeList}
                />

                <ApplyFormInput
                    heading="Business Owner's Name"
                    placeholderText="Business Owner's Name"
                    labelValue={businessOwnerName}
                    onChangeText={val => {
                        setBusinessOwnerName(val);
                    }}
                />

                <ApplyFormInput
                    heading="Business Owner's Email ID"
                    placeholderText="Business Owner's Email ID"
                    labelValue={businessOwnerEmail}
                    onChangeText={val => {
                        setBusinessOwnerEmail(val);
                    }}
                />

                <ApplyFormInput
                    heading="Business Owner's Mobile"
                    placeholderText="Business Owner's Mobile"
                    isNumeric={true}
                    labelValue={businessOwnerPhone}
                    maxLength={10}
                    onChangeText={val => {
                        setBusinessOwnerPhone(val);
                    }}
                />

                <ApplyFormInput
                    heading="Address-1"
                    placeholderText="Address-1"
                    labelValue={address_1}
                    onChangeText={val => {
                        setAddress_1(val);
                    }}
                />

                <ApplyFormInput
                    heading="Address-2"
                    placeholderText="Address-2"
                    labelValue={address_2}
                    onChangeText={val => {
                        setAddress_2(val);
                    }}
                />

                <ApplyFormInput
                    heading="Address-3"
                    placeholderText="Address-3"
                    labelValue={address_3}
                    onChangeText={val => {
                        setAddress_3(val);
                    }}
                />

                <ApplyFormInput
                    heading="Country"
                    placeholderText="Country"
                    labelValue={country}
                    onChangeText={val => {
                        setCountry(val);
                    }}
                />

                {/* <CountryFormPicker
                    heading="Country"
                    placeholderText="Country"
                    dropDownValue={country}
                    width={SIZES.width / 1.05}
                    height={SIZES.height / 1.14}
                    onDateSelected={function (val, states) {
                        console.log('\n\n Selected states :::: ', states);
                        setCountry(val);
                        setAllStates(states);
                    }}
                    data={allCountries}
                /> */}

                <ApplyFormInput
                    heading="State"
                    placeholderText="State"
                    labelValue={state}
                    onChangeText={val => {
                        setState(val);
                    }}
                />

                {/* <CountryFormPicker
                    heading="State"
                    placeholderText="State"
                    dropDownValue={state}
                    width={SIZES.width / 1.05}
                    height={SIZES.height / 1.14}
                    onDateSelected={async function (val) {
                        console.log('\n\n Selected val :::: ', val);
                        setState(val);

                        const body = {
                            country: 'India',
                            state: 'Madhya Pradesh',
                        };

                        const citiesData = await fetch(
                            'https://countriesnow.space/api/v0.1/countries/state/cities',
                            {
                                method: 'POST',
                                headers: {
                                    'X-Powered-By': 'Express',
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Headers': '*',
                                    'Content-Type': 'application/json',
                                    'Content-Length': '1036708',
                                    ETag: 'W/"fd1a4-+y1qCVg9E600sahDr1s3nW1FTHQ"',
                                    Date: 'Sun, 02 Aug 2020 10:37:45 GMT',
                                    Connection: 'keep-alive',
                                },
                                body: JSON.stringify(body),
                            },
                        );

                        const json = await citiesData.json();
                        setAllCities(json?.data);
                    }}
                    data={allStates}
                /> */}

                <ApplyFormInput
                    heading="Cities"
                    placeholderText="Cities"
                    labelValue={city}
                    onChangeText={val => {
                        setCity(val);
                    }}
                />

                {/* <CitiesFormPicker
                    heading="Cities"
                    placeholderText="Cities"
                    dropDownValue={city}
                    width={SIZES.width / 1.05}
                    height={SIZES.height / 1.14}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val);
                        setCity(val);
                    }}
                    data={allCities}
                /> */}

                <ApplyFormInput
                    heading="Landmark Location on Google"
                    placeholderText="Landmark Location on Google"
                    labelValue={landmark}
                    onChangeText={val => {
                        setLandmark(val);
                    }}
                />

                <ApplyFormInput
                    heading="Google LAT / LONG Position  Cordinates"
                    placeholderText="Google LAT / LONG Position  Cordinates"
                    labelValue={""}
                    onChangeText={val => {
                        setLongitude(val);
                    }}
                />

                <ApplyFormInput
                    heading="Are you a member of any other association"
                    placeholderText="Are you a member of any other association"
                    labelValue={""}
                    onChangeText={val => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="GST Number"
                    placeholderText="GST Number"
                    labelValue={gst_number}
                    onChangeText={val => {
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
                    labelValue={pan_number}
                    onChangeText={val => {
                        setPAN_Number(val);
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
                    labelValue={est_year}
                    onChangeText={val => {
                        setEst_Year(val);
                    }}
                />

                <ApplyFormPicker
                    heading="Number of Employees"
                    placeholderText="Number of Employees"
                    dropDownValue={employee_number}
                    width={SIZES.width - 120}
                    height={380}
                    onDateSelected={function (val) {
                        console.log('\n\n Selected val :::: ', val);
                        setEmployee_Number(val);
                    }}
                    data={numberOfEmployeesList}
                />

                <ApplyFormInput
                    heading="Approx Turnover in Lacs"
                    placeholderText="Approx Turnover in Lacs"
                    labelValue={turnover}
                    onChangeText={val => {
                        setTurnover(val);
                    }}
                />

                <ApplyFormInput
                    heading="Manufacturing Setup Address/ es"
                    placeholderText="Manufacturing Setup Address/ es"
                    labelValue={""}
                    onChangeText={val => {
                        // setComments(val);
                    }}
                />

                <ApplyFormInput
                    heading="Package Code Offered under this Subscription"
                    placeholderText="Package Code Offered under this Subscription"
                    labelValue={packageCode}
                    onChangeText={val => {
                        // setComments(val);
                    }}
                />

                {/* <ApplyFormInput
                    heading="Your Service Account Manager Desk ID"
                    placeholderText="Your Service Account Manager Desk ID"
                    onChangeText={val => {
                        // setComments(val);
                    }}
                /> */}

                <View style={{ marginHorizontal: 20, marginBottom: 8, backgroundColor: COLORS.theme, padding: 8 }}>
                    <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>{"Your Service Account Manager Desk ID"}</Text>
                    <Text style={{ ...commonStyles.fs12_500, color: "#fff" }}>{"desk-id"}</Text>
                </View>

                {/* <ApplyFormInput
                    heading="Your Service Account Manager Name with Photo"
                    placeholderText="Your Service Account Manager Name with Photo"
                    onChangeText={val => {
                        // setComments(val);
                    }}
                /> */}
                <View style={{ marginHorizontal: 20, marginBottom: 8, backgroundColor: COLORS.theme, padding: 8 }}>
                    <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>{"Your Service Account Manager Name with Photo"}</Text>
                    <Text style={{ ...commonStyles.fs12_500, color: "#fff" }}>{"manager-name"}</Text>
                </View>

                {/* <ApplyFormInput
                    heading="Your Service Account Manager Mob"
                    placeholderText="Your Service Account Manager Mob"
                    onChangeText={val => {
                        // setComments(val);
                    }}
                /> */}
                <View style={{ marginHorizontal: 20, marginBottom: 8, backgroundColor: COLORS.theme, padding: 8 }}>
                    <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>{"Your Service Account Manager Mob"}</Text>
                    <Text style={{ ...commonStyles.fs12_500, color: "#fff" }}>{"manager-phone"}</Text>
                </View>

                <View style={{ marginHorizontal: 20, backgroundColor: COLORS.theme, padding: 8 }}>
                    <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>{"Current Status"}</Text>
                    <Text style={{ ...commonStyles.fs12_500, color: "#fff" }}>{"Activated"}</Text>
                </View>

                {/* <RenderCustomCheckBox
                    title=""
                    list={['', 'Deactivated']}
                    selectedVal={currentStatus}
                    callback={item => {
                        setCurrentStatus(item.toLocaleLowerCase());
                    }}
                /> */}
                <View style={{ height: 10 }} />

                <View style={{ marginHorizontal: 20, backgroundColor: COLORS.theme, padding: 8 }}>
                    <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>{"Payment Status"}</Text>
                    <Text style={{ ...commonStyles.fs12_500, color: "#fff" }}>{"Free Period"}</Text>
                </View>

                {/* <RenderCustomCheckBox
                    title=""
                    list={[
                        '',
                        'Paid 3M',
                        'Paid 6M',
                        'Paid 1Y',
                        'Paid 2Y',
                        'Paid 5Y',
                        'On Grace Period ',
                    ]}
                    selectedVal={paymentStatus}
                    callback={item => {
                        setPaymentStatus(item.toLocaleLowerCase());
                    }}
                /> */}

                <View style={{ padding: 20 }}>
                    <TouchableHighlight style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>SUBMIT</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>

            <CustomLoader loading={loading} />
            <CustomPanel loading={loading} />
        </>
    );
}

const RenderCustomFilePicker = ({
    title,
    file,
    fileError,
    setFile,
    selectPdfFile,
    setFileError,
}) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.heading}>{title}</Text>
            {file?.length === 0 || file === null ? (
                <TouchableHighlight
                    style={[styles.gstCertificate]}
                    onPress={() => {
                        selectPdfFile(title);
                        setFileError(false);
                    }}
                    underlayColor="#f7f8f9">
                    <Image
                        source={require('../../assets/attach.png')}
                        style={{ width: 24, height: 24, tintColor: '#BDBDBD' }}
                    />
                </TouchableHighlight>
            ) : (
                <View style={[styles.gstCertificate, commonStyles.rowBetween]}>
                    <Text style={{ ...commonStyles.fs14_500 }}>{file?.name}</Text>
                    <TouchableHighlight
                        onPress={() => setFile('')}
                        underlayColor="#f7f8f9">
                        <Image
                            source={require('../../assets/cross.png')}
                            style={{ width: 20, height: 20, tintColor: '#BDBDBD' }}
                        />
                    </TouchableHighlight>
                </View>
            )}
            {fileError ? (
                <Text style={{ ...commonStyles.fs12_400, color: 'red' }}>
                    GST Certificate is mandatory
                </Text>
            ) : (
                <></>
            )}
        </View>
    );
};

const RenderCustomCheckBox = ({ title, list, selectedVal, callback }) => {
    console.log('\n\n List: ', list);
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ ...commonStyles.fs12_400 }}>{title}</Text>
            <FlatList
                data={list}
                numColumns={3}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={[styles.checkboxWrapper]}
                            activeOpacity={0.8}
                            onPress={() => {
                                callback(item);
                            }}>
                            <View style={[styles.checkbox]}>
                                <View
                                    style={{
                                        width: 11,
                                        height: 11,
                                        borderRadius: 100,
                                        backgroundColor:
                                            selectedVal === item.toLocaleLowerCase()
                                                ? '#000'
                                                : '#fff',
                                    }}
                                />
                            </View>
                            <Text style={{ ...commonStyles.fs12_500, marginLeft: 8 }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        ...commonStyles.fs12_400,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    gstCertificate: {
        width: '90%',
        height: 67,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        ...commonStyles.centerStyles,
        margin: 6,
        paddingHorizontal: 20,
        marginBottom: 14,
    },
    checkbox: {
        width: 17,
        height: 17,
        borderRadius: 100,
        borderWidth: 1,
        ...commonStyles.centerStyles,
    },
    checkboxWrapper: {
        ...commonStyles.rowStart,
        alignItems: 'center',
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
        shadowColor: '#000',
    },
    btnText: {
        ...commonStyles.fs16_500,
        color: '#fff',
    },
});
