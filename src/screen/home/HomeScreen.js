import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {home_header} from './home_header';
import HomeCarousel from './HomeCarousel';
import home_search from './home_search';
import {menuItems} from '../products/AllProductsScreen';
import {commonStyles} from '../../utils/Styles';
import renderCategoryItem from './renderCategoryItem';
import {getAllProductsAPI, getProductCategories} from '../../utils/API';
import {Image} from 'react-native';
import {height, width} from '../../utils/utils';

export default function HomeScreen({navigation}) {
  const [productsData, setProductsData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [categories, setCategories] = useState([]);

  React.useEffect(() => {
    setModalVisible(true);
    getAllProductsAPI(response => {
      console.log('\n\n getAllNewsAPI response', response);
      if (response !== null) {
        if (response?.Status?.toString() === 'true') {
          let categories = [];
          response.data.map(item => {
            if (categories.includes(item.name)) return null;
            else categories.push(item.name);
          });
          console.log(categories, '<<<<<these are categories');
          setProductsData(response?.data);
        }
      }
    });
    getProductCategories(res => {
      setCategories(res.data);
    });
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      {home_header(navigation)}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
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

      <View style={{alignItems: 'center', marginTop: 14}}>
        <FlatList
          data={categories}
          numColumns={3}
          style={{marginBottom: 10, backgroundColor: '#fff'}}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            paddingHorizontal: 12,
            marginLeft: 8,
          }}
          renderItem={({item}) => {
            return renderCategoryItem(item, navigation);
          }}
          ListHeaderComponent={
            <View style={{alignItems: 'center'}}>
              {home_search(() => {})}

              <View style={{height: 250}}>
                <HomeCarousel />
              </View>

              <View
                style={{
                  alignItems: 'flex-start',
                  width: '100%',
                  paddingHorizontal: 12,
                  marginVertical: 9,
                }}>
                <Text style={{...commonStyles.fs17_500}}>
                  Search Product By Category
                </Text>
              </View>
            </View>
          }
          ListFooterComponent={<View style={{height: 120}} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
