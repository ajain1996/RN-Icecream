import {View, Text, Modal} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';
import {StyleSheet} from 'react-native';
import {membersHeader} from './membersHeader';
import {COLORS} from '../../component/Constant/Color';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {getAllUsersAPI} from '../../utils/API';
import {useEffect} from 'react';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {Settings} from 'react-native';
import {height, width} from '../../utils/utils';
import {imageBase} from '../auth/UpdateUserScreenIn';

export default function MembersScreen({navigation}) {
  const [members, setMembers] = React.useState([]);
  const [tempMember, setTempMember] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    getAllUsersAPI(response => {
      if (response !== null) {
        if (response?.status?.toLocaleLowerCase() === 'sucess') {
          console.log('\n\n getAllUsersAPI response: ', response?.data?.length);
          setMembers(response?.data);
          setTempMember(response.data);
        }
      }
    });
  }, []);
  useEffect(() => {
    console.log(searchInput, '<<<sear');
    if (searchInput == '') {
      setTempMember(members);
    } else {
      filterIt(searchInput);
    }
  }, [searchInput]);

  const filterIt = text => {
    console.log(text, '<<<this is text');
    // return null;

    const matchIt = members.filter(item => {
      if (item.name != null) {
        const name = item.name.toLocaleLowerCase();
        const field = text.toLocaleLowerCase();
        if (name.match(field)) return true;
      }
      if (item.short_name != null) {
        const field = text.toLocaleLowerCase();
        const short = item.short_name.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.address_3 != null) {
        const field = text.toLocaleLowerCase();
        const short = item.address_3.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.city != null) {
        const field = text.toLocaleLowerCase();
        const short = item.city.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.country != null) {
        const field = text.toLocaleLowerCase();
        const short = item.country.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.state != null) {
        const field = text.toLocaleLowerCase();
        const short = item.state.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.address_1 != null) {
        const field = text.toLocaleLowerCase();
        const short = item.address_1.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.address_2 != null) {
        const field = text.toLocaleLowerCase();
        const short = item.address_2.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.organization_name != null) {
        const field = text.toLocaleLowerCase();
        const short = item.organization_name.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
      if (item.email != null) {
        const field = text.toLocaleLowerCase();
        const short = item.email.toLocaleLowerCase();
        if (short.match(field)) return true;
      }
    });
    setTempMember(matchIt);
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      {/* {membersHeader(navigation, setSearchInput, searchInput)} */}
      <View style={styles.headerContainer}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor="#eee">
          <Image
            source={require('../../assets/left-arrow.png')}
            resizeMode="contain"
            style={{width: 25, height: 25}}
          />
        </TouchableHighlight>

        <TextInput
          placeholder="Search Members"
          placeholderTextColor="#999"
          onChangeText={text => {
            console.log(text);
            setSearchInput(text);
          }}
          style={styles.searchInput}
        />
      </View>
      <ScrollView>
        {tempMember?.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.itemWrapper}
              key={index}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('MemberDetailScreen', {
                  item: item,
                });
              }}>
              <View style={{width: '100%', padding: 14}}>
                <Text style={styles.memberName}>
                  {item?.name == 'null' ? 'Member name' : item?.name}
                </Text>
                <Text style={{...commonStyles.fs12_400, color: '#fff'}}>
                  ({item?.email == 'null' ? 'company@gmail.com' : item?.email})
                </Text>
              </View>
              <View style={styles.itemContent}>
                {item?.user_profile?.includes('http') ? (
                  <Image
                    source={{
                      uri:
                        'https://icecream.drazs.com/api/storage/app/' +
                        item?.user_profile,
                    }}
                    style={styles.itemImg}
                  />
                ) : (
                  <Image
                    source={{
                      uri:
                        item.user_profile != null
                          ? imageBase + item.user_profile
                          : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
                    }}
                    style={styles.itemImg}
                  />
                )}
                <View style={styles.memberNameBlock}>
                  <Text style={[styles.memberName, {color: COLORS.theme}]}>
                    {item?.short_name == 'null' ? '' : item?.short_name}
                  </Text>
                  <Text style={styles.conpanyName}>
                    (
                    {item?.organization_name == 'null'
                      ? 'Organization Name'
                      : item?.organization_name}
                    )
                  </Text>

                  <Text style={styles.memberAddress}>
                    Address: {item?.address_1 == 'null' ? '' : item?.address_1}
                    {/* 180 Local street, Member Address, Member address 2 */}
                  </Text>
                  <Text style={styles.companywebsite}>
                    Website: (
                    {item.address_3 == 'null' ||
                    item.address_3 == '' ||
                    item.address_3 == null
                      ? '(Not provided)'
                      : item.address_3}
                    )
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{height: 20}} />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: width / 1.5, height: height / 3}}
              source={require('../../assets/iicbs.jpeg')}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                padding: 15,
                borderRadius: 30,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontWeight: '800', fontSize: 18}}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    elevation: 9,
    shadowColor: '#999',
    backgroundColor: COLORS.theme,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 14,
  },
  itemContent: {
    ...commonStyles.rowStart,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  itemImg: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginTop: 20,
  },
  memberNameBlock: {
    width: '100%',
    padding: 16,
    width: '80%',
  },
  memberName: {
    ...commonStyles.fs18_500,
    color: '#fff',
  },
  conpanyName: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
  },
  memberAddress: {
    ...commonStyles.fs18_500,
    marginTop: 14,
  },
  companywebsite: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
    marginTop: 5,
  },
  headerContainer: {
    ...commonStyles.rowStart,
    width: '100%',
    height: 62,
    ...commonStyles.elevation9,
    paddingHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    width: '88%',
    marginLeft: 20,
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
