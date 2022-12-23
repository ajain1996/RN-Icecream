import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../component/Header/CustomHeader';
import {commonStyles} from '../../utils/Styles';
import {useState} from 'react';
import {getAllProductsAPI} from '../../utils/API';
import {imageBase} from '../auth/UpdateUserScreenIn';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {useSelector} from 'react-redux';

export const menuItems = [
  {
    image: require('../../assets/prod/c1.webp'),
    name: 'Turkey Hill',
  },
  {
    image: require('../../assets/prod/c2.jpg'),
    name: 'Magnum',
  },
  {
    image: require('../../assets/prod/c3.webp'),
    name: 'Vadilal',
  },
  {
    image: require('../../assets/prod/c4.webp'),
    name: 'Breyers',
  },

  {
    image: require('../../assets/prod/c5.jpg'),
    name: 'Amul',
  },
  {
    image: require('../../assets/prod/c6.webp'),
    name: 'Kwality Walls',
  },
];

export default function UserProductScreen({navigation, route}) {
  const [ProductsData, setProductsData] = useState([]);
  //   console.log(route.params.product, '<<<thisis category');
  const {userData} = useSelector(state => state.User);
  //   const selectedC = route.params.product;
  React.useEffect(() => {
    // setModalVisible(true);
    getAllProductsAPI(response => {
      console.log('\n\n getAllPRoduct response', response);
      if (response !== null) {
        if (response?.Status?.toString() === 'true') {
          const filterPro = response.data.filter(item => {
            return item.user_id == userData.id;
          });
          setProductsData(filterPro);
        }
      }
    });
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <CustomHeader title="Products" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          onPress={() => {
            navigation.navigate('CreateProductScreen');
          }}
          style={{
            color: '#000',
            width: 120,
            textAlign: 'center',
            fontWeight: 'bold',
            marginVertical: 5,
            paddingVertical: 8,
            backgroundColor: '#BDBDBD',
            borderRadius: 10,
          }}>
          Add Product
        </Text>
      </View>
      <FlatList
        data={ProductsData}
        contentContainerStyle={{}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('EditProductScreen', {
                  product: item,
                  ProductsData,
                });
              }}>
              <Image
                source={{uri: imageBase + item?.image1}}
                resizeMode="stretch"
                style={{width: 74, height: 74, borderRadius: 16}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{...commonStyles.fs15_600, color: '#000'}}>
                  {item?.name}
                </Text>
                <Text style={{...commonStyles.fs12_400, color: '#000'}}>
                  {'Icecream sweet icecream'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productItem: {
    ...commonStyles.rowStart,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
