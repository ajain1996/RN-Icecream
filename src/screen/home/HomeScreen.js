import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { home_header } from './home_header'
import HomeCarousel from './HomeCarousel'
import home_search from './home_search'
import { menuItems } from '../products/AllProductsScreen'
import { commonStyles } from '../../utils/Styles'
import renderCategoryItem from './renderCategoryItem'
import { getAllProductsAPI } from '../../utils/API'

export default function HomeScreen({ navigation }) {
  const [productsData, setProductsData] = React.useState([]);

  React.useEffect(() => {
    getAllProductsAPI((response) => {
      console.log("\n\n getAllNewsAPI response", response)
      if (response !== null) {
        if (response?.Status?.toString() === "true") {
          setProductsData(response?.data);
        }
      }
    })
  }, [])

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      {home_header(navigation)}

      <View style={{ alignItems: "center", marginTop: 14 }}>
        <FlatList
          data={productsData}
          numColumns={3}
          style={{ marginBottom: 10, backgroundColor: "#fff" }}
          columnWrapperStyle={{ justifyContent: 'flex-start', paddingHorizontal: 12, marginLeft: 8 }}
          renderItem={({ item }) => {
            return (
              renderCategoryItem(item, navigation)
            );
          }}
          ListHeaderComponent={
            <View style={{ alignItems: "center" }}>
              {home_search(() => { })}

              <View style={{ height: 250 }}>
                <HomeCarousel />
              </View>

              <View style={{ alignItems: 'flex-start', width: "100%", paddingHorizontal: 12, marginVertical: 9 }}>
                <Text style={{ ...commonStyles.fs17_500 }}>Search Product By Category</Text>
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={{ height: 120 }} />
          }
        />
      </View>
    </View>
  )
}

