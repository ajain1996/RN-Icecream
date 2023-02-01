import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import {COLORS} from '../component/Constant/Color';
import {FONTS} from '../component/Constant/Font';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {commonStyles} from '../utils/Styles';

const listData = [
  {
    name: 'Amit patel',
    // avatar_url:
    //   'https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    subtitle: 'Hey there, how are you?',
  },
  {
    name: 'Test user',
    // avatar_url:
    //   'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    subtitle: 'Where are you?',
  },
];

export default function ChatScreen({navigation}) {
  const [search, setsearch] = useState('');
  const [allUser, setAllUser] = useState([]);
  // const [allUserBackup, setAllUserBackup] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    setAllUser(listData);
    // console
  };

  const searchUser = val => {
    setsearch(val);
    // setAllUser(allUserBackup.filter(it => it.name.match(val)));
  };

  const createChatList = data => {
    navigation.navigate('SingleChatScreen', {data: data});
  };

  const renderItem = ({item}) => {
    // if (userData.emailId === item.emailId) {
    //   return;
    // }
    return (
      <ListItem
        bottomDivider
        onPress={() => createChatList(item)}
        containerStyle={{paddingVertical: 7, marginVertical: 2}}>
        <Avatar
          source={{uri: item?.avatar_url}}
          rounded
          title={item.name}
          size="medium"
        />
        <ListItem.Content>
          <ListItem.Title style={{fontFamily: FONTS.Medium, fontSize: 14}}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{fontFamily: FONTS.Regular, fontSize: 12}}
            numberOfLines={1}>
            {item.emailId}
            {'Hey there, how are you?'}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* <StatusBar barStyle="dark-cont/ent" backgroundColor={COLORS.white} /> */}
      {/* <SearchBar
        placeholder="Search by name..."
        placeholderTextColor="#999"
        onChangeText={searchUser}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      /> */}
      <View style={styles.headerContainer}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor="#eee">
          <Image
            source={require('../assets/left-arrow.png')}
            resizeMode="contain"
            style={{width: 25, height: 25}}
          />
        </TouchableHighlight>
        <Text
          style={{
            marginLeft: 20,
            color: '#000',
          }}>
          All Contacts
        </Text>
        {/* <TextInput
          placeholder="Search Members"
          placeholderTextColor="#999"
          onChangeText={text => {
            console.log(text);
            // setSearchInput(text);
            filterIt(text);
          }}
          style={styles.searchInput}
        /> */}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={listData}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    elevation: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.7,
  },
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
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 20,
  },
  memberNameBlock: {
    width: '100%',
    padding: 16,
    paddingTop: 5,
    width: '80%',
  },
  memberName: {
    ...commonStyles.fs18_500,
    color: '#fff',
    fontSize: 15,
  },
  conpanyName: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
  },
  memberAddress: {
    ...commonStyles.fs18_500,
    marginTop: 5,
  },
  companywebsite: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
    marginTop: 5,
    // height: '100%',
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
