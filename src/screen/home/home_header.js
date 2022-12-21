import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '../../utils/Styles';
import {image_tap, image_tap2} from '../../component/image_tap';
import Auth from '../../service/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser} from '../../redux/reducer/user';
import {CustomDrawer} from '../../component/drawer/CustomDrawer';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {COLORS} from '../../component/Constant/Color';
import {TouchableHighlight} from 'react-native';
import {imageBase} from '../auth/UpdateUserScreenIn';
import {removeUserType} from '../../redux/reducer/userType';
import {Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export function home_header(navigation) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const {userType} = useSelector(state => state.UserType);
  console.log('\n\nthis is uerData at header: ', userType, '--', userData);
  const onFocus = useIsFocused();
  const [switchModal, setSwitchModal] = useState(false);
  const [modalVisible, setmodalVisible] = React.useState(false);

  const handleLogout = () => {
    Auth.logout().then(() => {
      dispatch(removeUser([]));
      dispatch(removeUserType());
    });
  };

  useEffect(() => {
    setSwitchModal(false);
  }, [onFocus]);

  const showProfile = () => {
    if (
      userData?.user_profile === null ||
      userData?.user_profile === undefined
    ) {
      if (userType !== 'guest') {
        return image_tap(require('../../assets/user.png'), 28, () => {
          navigation.navigate('MyProfileScreen');
        });
      }
    } else {
      if (userType !== 'guest') {
        return image_tap2(imageBase + userData?.user_profile, 30, () => {
          navigation.navigate('MyProfileScreen');
        });
      }
    }
  };
  const openModal = () => {
    console.log('open');
    setSwitchModal(true);
  };
  console.log(`${modalVisible}<<<<modal visible`);

  return (
    <>
      <View style={styles.headerContainer}>
        {/* {image_tap(
          require('../../assets/menu.png'),
          22,
          () => {
            // Alert.alert('cliecked');
            setSwitchModal(true);
          },
          setSwitchModal,
        )} */}
        <TouchableHighlight
          underlayColor="#eee"
          onPress={() => {
            console.log('Open drawer');

            // openModal();

            setSwitchModal(true);
          }}
          style={styles.img_container}>
          <Image
            source={require('../../assets/menu.png')}
            style={{width: 22, height: 22}}
          />
        </TouchableHighlight>

        {Object.keys(userData)?.length !== 0 ? (
          <View style={{...commonStyles.rowStart}}>
            {showProfile()}
            <View style={{width: 2}} />

            {image_tap(require('../../assets/logout.png'), 20, handleLogout)}
          </View>
        ) : (
          <>
            {userType == '' && (
              <TouchableHighlight
                style={styles.loginBtn}
                onPress={() => {
                  // logout()
                  navigation.navigate('SplashUserScreen');
                }}>
                <Text style={{color: '#fff', fontSize: 13}}>
                  {userType == 'guest' ? 'Guest User' : 'SignIn/SignUp'}
                </Text>
              </TouchableHighlight>
            )}
            {userType == 'guest' && (
              <View style={{...commonStyles.rowStart}}>
                {image_tap(require('../../assets/logout.png'), 20, () => {
                  Auth.logout().then(() => {
                    dispatch(removeUser([]));
                    dispatch(removeUserType());
                  });
                  // navigation.navigate('SplashUserScreen');
                })}
              </View>
            )}
          </>
        )}
      </View>

      <CustomDrawer
        modalVisible={switchModal}
        callback={() => {
          console.log('open drawer false');
          setSwitchModal(false);
        }}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...commonStyles.rowBetween,
    width: '100%',
    height: 60,
    elevation: 9,
    shadowColor: '#999',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  loginBtn: {
    padding: 8,
    backgroundColor: COLORS.theme,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  img_container: {
    width: 50,
    height: 50,
    borderRadius: 100,
    ...commonStyles.centerStyles,
  },
});
