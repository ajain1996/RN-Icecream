import {View, Text} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';
import {StyleSheet} from 'react-native';
import {membersHeader} from './membersHeader';
import {COLORS} from '../../component/Constant/Color';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {getAllUsersAPI} from '../../utils/API';

export default function MembersScreen({navigation}) {
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    getAllUsersAPI(response => {
      if (response !== null) {
        if (response?.status?.toLocaleLowerCase() === 'sucess') {
          console.log('\n\n getAllUsersAPI response: ', response?.data?.length);
          setMembers(response?.data);
        }
      }
    });
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      {membersHeader(navigation)}

      <ScrollView>
        {members?.map((item, index) => {
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
                  {item?.name === null ? 'Member name' : item?.name}
                </Text>
                <Text style={{...commonStyles.fs12_400, color: '#fff'}}>
                  ({item?.email === null ? 'company@gmail.com' : item?.email})
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
                      uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
                    }}
                    style={styles.itemImg}
                  />
                )}
                <View style={styles.memberNameBlock}>
                  <Text style={[styles.memberName, {color: COLORS.theme}]}>
                    {item?.short_name === null ? 'Full name' : item?.short_name}
                  </Text>
                  <Text style={styles.conpanyName}>
                    (
                    {item?.organization_name === null
                      ? 'Organization Name'
                      : item?.organization_name}
                    )
                  </Text>

<<<<<<< HEAD
            <ScrollView>
                {members?.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.itemWrapper} key={index} activeOpacity={0.9}
                            onPress={() => {
                                navigation.navigate("MemberDetailScreen", {
                                    item: item
                                })
                            }}
                        >
                            <View style={{ width: "100%", padding: 14 }}>
                                <Text style={styles.memberName}>
                                    {item?.name === null ? "" : item?.name}
                                </Text>
                                <Text style={{ ...commonStyles.fs12_400, color: "#fff" }}>
                                    ({item?.email === null ? "company@gmail.com" : item?.email})
                                </Text>
                            </View>
                            <View style={styles.itemContent}>
                                {item?.user_profile?.includes("http")
                                    ? <Image
                                        source={{ uri: item?.user_profile }}
                                        style={styles.itemImg}
                                    />
                                    : <Image
                                        source={{ uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80" }}
                                        style={styles.itemImg}
                                    />}
                                <View style={styles.memberNameBlock}>
                                    <Text style={[styles.memberName, { color: COLORS.theme }]}>
                                        {item?.short_name === null ? "" : item?.short_name}
                                    </Text>
                                    <Text style={styles.conpanyName}>
                                        ({item?.organization_name === null ? "" : item?.organization_name})
                                    </Text>
=======
                  <Text style={styles.memberAddress}>
                    Address: {item?.address_1}
                    {/* 180 Local street, Member Address, Member address 2 */}
                  </Text>
                  <Text style={styles.companywebsite}>
                    Website: (www.companywebsite.com)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
>>>>>>> bc09eaf17a71c2efc6f22bf531d33ea03280657e

        <View style={{height: 20}} />
      </ScrollView>
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
});
