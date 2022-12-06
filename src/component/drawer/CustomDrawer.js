import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, userSlice} from '../../redux/reducer/user';
import Auth from '../../service/Auth';
import {commonStyles} from '../../utils/Styles';
import {COLORS, SIZES} from '../Constant/Color';

export const CustomDrawer = ({modalVisible, callback, navigation}) => {
  const dispatch = useDispatch();
  const {userData, login} = useSelector(state => state.User);

  const handleLogout = () => {
    Auth.logout().then(() => {
      dispatch(removeUser([]));
    });
  };

  return (
    <View style={{alignItems: 'flex-start'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={callback}>
        <TouchableHighlight
          style={styles.centeredView}
          onPress={() => {
            callback();
          }}
          underlayColor="transparent">
          <View style={styles.modalView}>
            <View
              style={{
                width: SIZES.width / 1.4,
                backgroundColor: COLORS.theme,
                marginTop: -35,
              }}>
              <View style={{padding: 30, paddingVertical: 40, marginBottom: 8}}>
                {userData?.userProfile !== undefined ? (
                  <Image
                    source={{uri: userData?.userProfile}}
                    resizeMode="contain"
                    style={{width: 100, height: 100, borderRadius: 100}}
                  />
                ) : (
                  <Image
                    source={require('../../assets/user.png')}
                    resizeMode="contain"
                    style={{width: 100, height: 100, borderRadius: 100}}
                  />
                )}
                {Object.keys(userData)?.length === 0 ? (
                  <TouchableHighlight
                    style={styles.loginBtn}
                    onPress={() => {
                      navigation.navigate('SplashUserScreen');
                    }}>
                    <Text style={{color: COLORS.theme, fontSize: 13}}>
                      SignIn/SignUp
                    </Text>
                  </TouchableHighlight>
                ) : (
                  <View style={{marginLeft: 5}}>
                    <Text
                      style={{
                        ...commonStyles.fs17_600,
                        marginTop: 15,
                        color: '#fff',
                      }}>
                      {userData?.name === null || userData?.name === undefined
                        ? `User Name`
                        : userData?.name}
                      {/* {userData?.fullname} */}
                    </Text>
                    <Text
                      style={{
                        ...commonStyles.fs14_300,
                        marginTop: 2,
                        color: '#fff',
                      }}>
                      {userData?.email}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={{height: 10}} />
            <ScrollView style={{marginLeft: -25}}>
              <DrawerButton
                title="Home"
                image={require('../../assets/home.png')}
                onPress={() => {
                  navigation.replace('Root');
                }}
              />

              <DrawerButton
                title="Members"
                image={require('../../assets/members.png')}
                onPress={() => {
                  navigation.navigate('MembersScreen');
                }}
              />

              {login ? (
                <DrawerButton
                  title="Enquiries"
                  image={require('../../assets/enquiry.png')}
                  onPress={() => {}}
                />
              ) : (
                <></>
              )}

              {login ? (
                <DrawerButton
                  title="My Products"
                  image={require('../../assets/products.png')}
                  onPress={() => {
                    navigation.navigate('CreateProductScreen');
                  }}
                />
              ) : (
                <></>
              )}

              {login ? (
                <DrawerButton
                  title="Advertisement"
                  image={require('../../assets/ad.png')}
                  onPress={() => {}}
                />
              ) : (
                <></>
              )}

              {login ? (
                <DrawerButton
                  title="My Profile"
                  image={require('../../assets/user.png')}
                  onPress={() => {
                    navigation.navigate('MyProfileScreen');
                  }}
                />
              ) : (
                <></>
              )}

              <DrawerButton
                title="Share App"
                image={require('../../assets/share.png')}
                onPress={() => {}}
              />

              <DrawerButton
                title="Rate"
                image={require('../../assets/rate.png')}
                onPress={() => {}}
              />

              <DrawerButton
                title="Privacy Policy"
                image={require('../../assets/policy.png')}
                onPress={() => {}}
              />

              <DrawerButton
                title="Terms & Conditions"
                image={require('../../assets/tnc.png')}
                onPress={() => {}}
              />

              <DrawerButton
                title="About Us"
                image={require('../../assets/about.png')}
                onPress={() => {}}
              />

              {login ? (
                <DrawerButton
                  title="Logout"
                  image={require('../../assets/logout.png')}
                  onPress={handleLogout}
                />
              ) : null}
            </ScrollView>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

export const DrawerButton = ({title, image, onPress}) => {
  return (
    <TouchableHighlight
      style={[styles.button]}
      underlayColor="#eee"
      onPress={onPress}>
      <View style={{...commonStyles.rowStart}}>
        <Image
          source={image}
          resizeMode="contain"
          style={{width: 24, height: 24}}
        />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: SIZES.width,
    height: SIZES.height,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SIZES.width / 1.4,
    height: SIZES.height + 80,
    marginTop: 80,
  },
  button: {
    padding: 18,
    width: SIZES.width / 1.4,
    backgroundColor: '#fff',
    marginTop: 2,
    borderRadius: 5,
  },
  textStyle: {
    color: '#000',
    fontWeight: '400',
    marginLeft: 12,
    fontSize: 15,
    marginTop: -2,
  },
  loginBtn: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    // paddingHorizontal: 12,
    // marginRight: 10,
    width: 110,
    // alignItems: 'center',
    marginTop: 10,
  },
});
