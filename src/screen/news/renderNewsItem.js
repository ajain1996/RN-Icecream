import {Text, Image, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';
import {ListItem} from 'react-native-elements';
import {SIZES} from '../../component/Constant/Color';
import moment from 'moment';

export const renderNewsItem = ({item}) => {
  var img = '';
  if (!item?.image?.startsWith('http')) {
    img = 'http://icecream.drazs.com/api/storage/app/' + item?.image;
  } else {
    img = '';
  }

  return (
    <View style={{marginBottom: 14, marginVertical: 2}}>
      <ListItem
        onPress={() => {}}
        underlayColor="#fff"
        containerStyle={{
          paddingVertical: 15,
          backgroundColor: '#eee',
          borderRadius: 8,
          alignItems: 'flex-start',
          backgroundColor: '#f7f8f9',
          width: SIZES.width / 1.09,
        }}>
        <ListItem.Content>
          <ListItem.Title style={{...commonStyles.fs12_700}}>
            {item?.title}
          </ListItem.Title>
          <Text
            style={{...commonStyles.fs12_400, marginTop: 4}}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item?.content}
          </Text>
        </ListItem.Content>

        <Image
          source={{uri: img}}
          style={{width: 84, height: 84, borderRadius: 8}}
        />
      </ListItem>

      <View
        style={{
          ...commonStyles.rowStart,
          position: 'absolute',
          bottom: 10,
          left: 15,
        }}>
        <Text style={{...commonStyles.fs12_400, marginTop: 4}}>
          {moment(item?.updated_at).format('MM')} minutes ago
        </Text>
      </View>
    </View>
  );
};
