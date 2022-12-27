import {View, ScrollView, FlatList} from 'react-native';
import React from 'react';
import CustomHeader from '../../component/Header/CustomHeader';
import {renderBlogItem} from './renderBlogItem';
import {commonStyles} from '../../utils/Styles';
import {getAllBlogsAPI} from '../../utils/API';

const listData = [
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n1.jpg'),
    title: "Photo Of 2017 Rally From Kolkata Falsely Shared As Gujarat's Surat",
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n2.png'),
    title:
      'Fact Check: Viral Image Claiming Fans Demeaning Bharat Jodo Yatra During a Cricket Match Is Fake',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n3.jpg'),
    title: 'How FTX CEO Sam Bankman-Fried Lost $14.6 Billion Overnight',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n4.jpg'),
    title: 'DOJ Seizes Over 50,000 Stolen Bitcoin',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n5.jpg'),
    title: 'Binance To Sell Off FTT, FTX Halts Withdrawals',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n6.jpg'),
    title: 'Instagram NFTs: Meta Announces Further Web3 Integration',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n7.jpg'),
    title: 'Flatcoins: The New Crypto Asset Pegged To Inflation',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n8.jpg'),
    title: 'You Can Pay With Bitcoin On Cash App',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n9.jpg'),
    title: 'Is Blockchain Energy Consumption Still A Problem?',
    time: '4 min ago',
  },
  {
    name: 'Nature Channel',
    avatar_url: require('../../assets/news/n10.jpg'),
    title: 'Google Introduces Web3 Development Tools',
    time: '4 min ago',
  },
];

export default function BlogsScreen({navigation}) {
  const [blogsData, setBlogsData] = React.useState([]);

  React.useEffect(() => {
    getAllBlogsAPI(response => {
      console.log('\n\n getAllBlogsAPI response', response);
      if (response.Status == 'success') {
        setBlogsData(response.data);
      }
    });
  }, []);

  return (
    <View style={{...commonStyles.containerStyle}}>
      <CustomHeader title="Blogs" />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 16}}
        keyExtractor={(item, index) => index.toString()}
        data={blogsData.reverse()}
        renderItem={({item}) => renderBlogItem(item, navigation)}
      />

      <View style={{height: 80}} />
    </View>
  );
}
