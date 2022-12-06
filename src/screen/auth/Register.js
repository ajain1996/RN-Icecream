import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../component/Constant/Color';
import { FONTS } from '../../component/Constant/Font';
import Toast from 'react-native-simple-toast';
import { commonStyles } from '../../utils/Styles';
import {
  mobileLoginPostRequest,
  mobileRegisterPostRequest,
} from '../../utils/API';

const { width, height } = Dimensions.get('window');
export function getRawJSON(str) {
  return str.split(' ').map((el, index) => { return index > 0 ? el : '' }).join('');
}

export function formatingValidJSON(str) {
  // From https://stackoverflow.com/questions/9637517/parsing-relaxed-json-without-eval
  return str
    .replace(/:\s*"([^"]*)"/g, function (match, p1) {
      return ': "' + p1.replace(/:/g, '@colon@') + '"';
    })
    .replace(/:\s*'([^']*)'/g, function (match, p1) {
      return ': "' + p1.replace(/:/g, '@colon@') + '"';
    })
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
    .replace(/@colon@/g, ':')
}

function Register({ navigation }) {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    if (firstname == '' || lastname == '' || phone == '') {
      Toast.show('please fill in all the fields');
      return false;
    }
    var userData = {
      fullname: firstname + " " + lastname,
      phone: phone,
      email: email,
      password: '',
      userProfile: '',
      companyName: '',
      address: '',
    };
    setLoading(true);
    mobileRegisterPostRequest(email, phone, async response => {
      setLoading(false);
      console.log('mobileLoginPostRequest response: ', formatingValidJSON(getRawJSON(response)));
      if (response !== null) {
        if (getRawJSON(response).toString().includes("Duplicateentry")) {
          Toast.show('User is already registered! Please Login');
        } else {
          Toast.show('OTP sent Successfully!');
          navigation.navigate('VerifyOTP', { userData: userData, screen: "Register" });
        }
      } else {
        Toast.show('Oops! Something went wrogn');
      }
      // await Auth.setLocalStorageData(
      //   'bearerToken',
      //   response['bearer-token'],
      // );
      // await Auth.setLocalStorageData(
      //   'usertoken',
      //   response['data'].usertoken,
      // );
    });
  };

  // {
  //   "Status":"Success",
  //   "Details":"77463b7a82d331d0-BOM"
  // }
  // {
  //   "status":"Done",
  //   "message":"SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'ankitjain.aj1996@gmail.com' for key 'users_email_unique' (SQL: insert into `users` (`email`, `company_id`, `mobile`, `otp`, `updated_at`, `created_at`) values (ankitjain.aj1996@gmail.com, 8fKrj, 8770389198, 723199, 2022-12-04 17:23:53, 2022-12-04 17:23:53))"
  // }

  return loading ? (
    <View style={{ width: '100%', height: '100%', ...commonStyles.centerStyles }}>
      <ActivityIndicator color={COLORS.theme} size={50} />
    </View>
  ) : (
    <>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={{ justifyContent: 'space-between', height: '95%' }}>
        <View style={styles.uppercard}>
          <Text style={{ color: '#fff', fontFamily: FONTS.Bold, fontSize: 25 }}>
            WELCOME
          </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '92%',
              borderRadius: 15,
              paddingHorizontal: 20,
              ...commonStyles.elevation9,
            }}>
            <KeyboardAwareScrollView
              style={{ marginTop: 20 }}
              showsVerticalScrollIndicator={false}>
              <View style={styles.cardView}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.Login}>Register</Text>
                  <Text />
                  <View style={{ ...commonStyles.rowBetween }}>
                    <View
                      style={[
                        commonStyles.inputContainer,
                        { marginTop: 10, width: '48.8%' },
                      ]}>
                      <TextInput
                        style={styles.inputs}
                        placeholder="First Name"
                        underlineColorAndroid="transparent"
                        onChangeText={value => setfirstname(value)}
                        value={firstname}
                        placeholderTextColor={COLORS.liteBlack}
                      />
                    </View>
                    <View
                      style={[
                        commonStyles.inputContainer,
                        { marginTop: 10, width: '48.8%' },
                      ]}>
                      <TextInput
                        style={styles.inputs}
                        placeholder="Last Name"
                        underlineColorAndroid="transparent"
                        onChangeText={value => setlastname(value)}
                        value={lastname}
                        placeholderTextColor={COLORS.liteBlack}
                      />
                    </View>
                  </View>
                  <View style={commonStyles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Mobile Number"
                      underlineColorAndroid="transparent"
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      maxLength={10}
                      onChangeText={value => setphone(value)}
                      value={phone}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                  <View style={commonStyles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Email"
                      underlineColorAndroid="transparent"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={value => setemail(value)}
                      value={email}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                  <View style={{ marginTop: 6 }} />

                  <TouchableOpacity style={styles.btn} onPress={registerUser}>
                    <Text style={styles.btnText}>SEND OTP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>

        <View style={styles.contactView}>
          <Text style={styles.smallTxt}>Existing user?</Text>
          <TouchableOpacity
            style={{ marginLeft: 4 }}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.register}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Register;

const styles = StyleSheet.create({
  uppercard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color: COLORS.lightgray,
    fontSize: 18,
    fontFamily: FONTS.Regular,
  },
  buttonSec: { marginTop: 20, justifyContent: 'center', alignItems: 'center' },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },

  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: COLORS.black,
    paddingLeft: 10,
    fontFamily: FONTS.Regular,
    paddingLeft: 20,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
  },
  register: {
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.textInput,
    textDecorationLine: 'underline',
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    ...commonStyles.fs16_500,
    color: '#fff',
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 52,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
  },
  Login: {
    alignSelf: 'center',
    fontFamily: FONTS.Medium,
    color: COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
