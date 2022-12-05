import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../component/Constant/Color';
import {FONTS} from '../../component/Constant/Font';
import Navigation from '../../service/Navigation';
import Toast from 'react-native-simple-toast';
import {commonStyles} from '../../utils/Styles';
import {mobileLoginPostRequest} from '../../utils/API';
import Auth from '../../service/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/reducer/user';
import {getRawJSON} from './Register';

const {width, height} = Dimensions.get('window');

function Login({navigation}) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    if (phone == '') {
      Toast.show('Please fill in the phone number');
      return false;
    }
    var userData2 = {
      fullname: userData?.fullname === undefined ? '' : userData?.fullname,
      phone: phone,
      email: userData?.email === undefined ? '' : userData?.email,
      password: userData?.password === undefined ? '' : userData?.password,
      userProfile:
        userData?.userProfile === undefined ? '' : userData?.userProfile,
      companyName:
        userData?.companyName === undefined ? '' : userData?.companyName,
      address: userData?.address === undefined ? '' : userData?.address,
    };
    setLoading(true);
    mobileLoginPostRequest(phone, async response => {
      setLoading(false);
      console.log(response, '<<<<this is response of  otp ');
      // return null;
      console.log('mobileLoginPostRequest response: ', getRawJSON(response));
      if (response !== null) {
        if (getRawJSON(response).toString().includes('SenttoUser')) {
          Toast.show('Login Successfully!!!!');
          // await Auth.setAccount(userData2);
          // dispatch(setUser(userData2));
          // navigation.navigate("Root")
          navigation.navigate('VerifyOTP', {userData: {phone}});
        } else {
          Toast.show('Number not registered');
        }
      } else {
        Toast.show('Oops! Something went wrogn');
      }
    });
  };

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={{justifyContent: 'space-between', height: '95%'}}>
        <View style={styles.uppercard}>
          <Text style={{color: '#fff', fontFamily: FONTS.Bold, fontSize: 25}}>
            Welcome
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '92%',
              borderRadius: 15,
              paddingHorizontal: 20,
              ...commonStyles.elevation9,
            }}>
            <View style={styles.cardView}>
              <Text style={styles.Login}>Login</Text>
              <Text />
              <Text />
              <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={[commonStyles.inputContainer, {marginTop: 10}]}>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Mobile Number"
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    maxLength={10}
                    onChangeText={value => {
                      setPhone(value);
                    }}
                    value={phone}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>
              </KeyboardAwareScrollView>
              <View style={{height: 4}} />

              <TouchableOpacity style={styles.btn} onPress={loginUser}>
                <Text style={styles.btnText}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.contactView}>
          <Text style={styles.smallTxt}>New user?</Text>
          <TouchableOpacity
            style={{marginLeft: 4}}
            onPress={() => Navigation.navigate('Register')}>
            <Text style={styles.register}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  uppercard: {
    width: width,
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
  buttonSec: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
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
    paddingLeft: 25,
    fontFamily: FONTS.Regular,
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
    color: '#fff',
    fontFamily: FONTS.SemiBold,
    fontSize: 14,
    marginTop: 2,
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 50,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
    alignSelf: 'center',
    fontFamily: FONTS.Medium,
    color: COLORS.textInput,
    fontSize: 32,
    marginTop: 10,
    fontWeight: '700',
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
