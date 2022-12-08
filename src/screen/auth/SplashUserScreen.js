import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '../../utils/Styles';
import {COLORS, SIZES} from '../../component/Constant/Color';
import Auth from '../../service/Auth';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/reducer/user';
import {setUserType} from '../../redux/reducer/userType';

export default function SplashUserScreen({navigation}) {
  const dispatch = useDispatch();
  const [loginChk, setLoginChk] = useState(true);
  // const { userType } = useSelector(state => state.UserType);

  useEffect(() => {
    Auth.getAccount().then(data => {
      console.log('User fetched: ', data);
      // Alert.alert('splash');
      console.log('\n\n\n\n\n\n\n\n', data, '<<<<\n\n\n\n\n\n this is data');
      //   return null;
      if (data !== null) {
        dispatch(setUser(data));
        setLoginChk(false);
      } else {
        setLoginChk(false);
      }
    });
  }, []);

  if (loginChk) {
    return null;
  }

  return (
    <View style={{...commonStyles.containerStyle}}>
      <View style={styles.wrapper}>
        <Image
          source={require('../../assets/splash-mg.png')}
          resizeMode="contain"
          style={{width: '80%', height: '80%'}}
        />
      </View>
      {renderButton('Login As Member', () => {
        dispatch(setUserType('member'));
        navigation.navigate('Login');
      })}

      {renderButton('As a Guest', async () => {
        dispatch(setUserType('guest'));
        navigation.navigate('Login');
      })}
    </View>
  );
}

const renderButton = (title, onPress) => {
  return (
    <TouchableHighlight
      style={[styles.button]}
      underlayColor="#dcdcdc"
      onPress={onPress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 100,
    ...commonStyles.centerStyles,
    marginBottom: 70,
    elevation: 9,
    shadowColor: '#999',
  },
  button: {
    padding: 16,
    width: SIZES.width / 1.2,
    backgroundColor: COLORS.theme,
    marginTop: 16,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
