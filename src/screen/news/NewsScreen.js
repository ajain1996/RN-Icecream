import {View, ScrollView, Text, Image, FlatList} from 'react-native';
import React from 'react';
import CustomHeader from '../../component/Header/CustomHeader';
import {renderNewsItem} from './renderNewsItem';
import {renderNewsText} from './renderNewsText';
import {commonStyles} from '../../utils/Styles';
import {getAllNewsAPI, getNewsCategoriesAPI} from '../../utils/API';
import {ListItem} from 'react-native-elements';
import {SIZES} from '../../component/Constant/Color';
import moment from 'moment';
import {Alert} from 'react-native';

export default function NewsScreen({navigation}) {
  const [newsData, setNewsData] = React.useState([]);
  const [newsData2, setNewsData2] = React.useState([]);
  const [newsCategories, setNewsCategories] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState('All News');

  const handleJobsNewsFilter = item => {
    setActiveFilter(item);

    setTimeout(() => {
      if (item === 'All News') {
        setNewsData(newsData2);
      } else {
        setNewsData(newsData.filter(work => work?.category?.includes(item)));
      }
    }, 100);
  };

  React.useEffect(() => {
    getAllNewsAPI(response => {
      console.log('\n\n getAllNewsAPI response', response);
      if (response !== null) {
        if (response?.Status === 'success') {
          setNewsData(response?.data);
          setNewsData2(response?.data);
        }
      }
    });

    getNewsCategoriesAPI(response => {
      console.log('\n\n getNewsCategoriesAPI response', response);
      var newsCategoryList = ['All News'];
      if (response !== null) {
        if (response?.Status === 'success') {
          response?.data?.map(val => {
            newsCategoryList.push(val?.name);
          });
        }
      }
      setNewsCategories(newsCategoryList);
    });
  }, []);

  console.log('\n\n News text newsCategories: ', newsCategories);

  return (
    <View style={{...commonStyles.containerStyle}}>
      <CustomHeader title="News" />

      {/* <ScrollView
        horizontal
        style={{
          height: 2,
        }}
        // style={{marginVertical: 5, marginLeft: 5, height: 2}}
      >
        {newsCategories.map((item, index) => {
          return (
            <View key={index}>
              {renderNewsText(item, activeFilter, handleJobsNewsFilter)}
            </View>
          );
        })}
      </ScrollView> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          justifyContent: 'flex-start',
        }}
        keyExtractor={(item, index) => index.toString()}
        data={newsData.reverse()}
        renderItem={({item}) => {
          let img = '';
          if (!item?.image?.startsWith('http')) {
            img = 'http://icecream.drazs.com/api/storage/app/' + item?.image;
          } else {
            img = '';
          }
          return (
            <View style={{marginBottom: 14, marginVertical: 2}}>
              <ListItem
                onPress={() => {
                  navigation.navigate('NewsDetailScreen', {item});
                  //   Alert.alert('he');
                }}
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
        }}
      />

      <View style={{height: 70}} />
    </View>
  );
}
