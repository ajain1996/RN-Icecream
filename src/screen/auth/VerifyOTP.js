import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    StyleSheet,
    StatusBar,
    TextInput,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';

import { commonStyles } from '../../utils/Styles';
import { COLORS, SIZES } from '../../component/Constant/Color';
import { matchOTPPostRequest } from '../../utils/API';
import Auth from '../../service/Auth';
import { setUser } from '../../redux/reducer/user';

interface OPTInputProps { }
const CELL_COUNT = 4;
const RESEND_OTP_TIME_LIMIT = 90;

export const VerifyOTP: React.FC<OPTInputProps> = ({
    navigation, route
}) => {
    const dispatch = useDispatch();
    const { userData } = route?.params;
    const { userType } = useSelector(state => state.UserType);

    let resendOtpTimerInterval: any;

    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );

    //to start resent otp option
    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };

    //on click of resend button
    const onResendOtpButtonPress = () => {
        //clear input field
        setOTPValue('');
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();

        // resend OTP Api call
        // todo
        console.log('todo: Resend OTP');
    };

    //declarations for input field
    const [OTPvalue, setOTPValue] = useState('');
    const [loading, setLoading] = useState(false);

    //start timer on screen on launch
    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

    //start timer on screen on launch
    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

    const handleSubmit = async () => {
        if (OTPvalue?.length === 0) {
            Toast.show('The OTP field is required.');
        } else if (OTPvalue?.length < 4) {
            console.log("\n\n VerifyOTP handleSubmit")
            Toast.show('OTP cannot be less then 6');
        } else {
            matchOTPPostRequest(userData?.phone, OTPvalue, async response => {
                setLoading(false);
                console.log('\n\n \n\n matchOTPPostRequest response: ', response);
                if (userType === "member") {
                    navigation.navigate("UpdateUserScreen", { userData: userData })
                } else if (userType === "guest") {
                    await Auth.setAccount(userData);
                    dispatch(setUser(userData))
                    navigation.navigate("Root")
                }
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content"
                hidden={false}
            />
            <View style={{ height: '17%' }} />

            <View style={{ alignItems: 'flex-start', width: '100%' }}>
                {renderLoginChangeText(navigation)}
                <View style={{ height: 8 }} />

                {renderEnterOTPText()}
            </View>
            <View style={{ height: '6%' }} />

            <TextInput
                placeholder='Enter OPT'
                placeholderTextColor="#999"
                keyboardType='number-pad'
                maxLength={6}
                onChangeText={(val) => { setOTPValue(val) }}
                style={styles.input}
            />

            {/* View for resend otp  */}
            {resendButtonDisabledTime > 0 ? (
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        marginTop: 40,
                        borderRadius: 9,
                    }}>
                    <Text style={styles.resendCodeText}>
                        Resend OTP in {resendButtonDisabledTime} sec
                    </Text>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={onResendOtpButtonPress}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        marginTop: 40,
                        borderRadius: 9,
                    }}>
                    <View style={styles.resendCodeContainer}>
                        <Text style={styles.resendCode}>Resend OTP </Text>
                        <Text style={[styles.resendCode, { color: '#999' }]}> in </Text>
                        <Text style={{ color: COLORS.theme }}>
                            {' '}
                            {resendButtonDisabledTime} sec
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            <View style={{ height: '13%' }} />

            {renderSubmitBtn(handleSubmit)}
        </ScrollView>
    );
};

const renderLoginChangeText = navigation => {
    return (
        <View style={{ ...commonStyles.rowBetween, width: '100%' }}>
            <Text style={{ fontSize: 22, fontWeight: '500', color: '#000' }}>
                OTP Input
            </Text>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    navigation.goBack();
                }}>
                <Text style={{ fontSize: 12, fontWeight: '500', color: COLORS.theme }}>
                    Change
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const renderEnterOTPText = () => {
    return (
        <View style={{ ...commonStyles.rowStart, width: '100%' }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#333' }}>
                Please enter the OTP sent to
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: COLORS.theme,
                    marginLeft: 8,
                }}>
                {"phoneNumber"}
            </Text>
        </View>
    );
};

export const renderSubmitBtn = onPress => {
    return (
        <TouchableOpacity
            style={{ ...commonStyles.commonBtnStyle, ...commonStyles.centerStyles }}
            onPress={onPress}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>
                Confirm
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    input: {
        width: SIZES.width - 40,
        height: 54,
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        borderRadius: 9,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
        textAlign: "center"
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        marginStart: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    subTitle: {
        textAlign: 'left',
        fontSize: 16,
        marginStart: 20,
        marginTop: 10,
        color: '#000',
    },
    codeFieldRoot: {
        marginTop: 40,
        width: '100%',
    },
    cellRoot: {
        width: 75,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    cellText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },

    button: {
        marginTop: 20,
    },
    resendCode: {
        color: COLORS.theme,
    },
    resendCodeText: {
        color: '#000',
    },
    resendCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
