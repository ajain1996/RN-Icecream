import { View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import CustomHeader from '../../component/Header/CustomHeader'
import { renderNewsItem } from './renderNewsItem';
import { renderNewsText } from './renderNewsText';
import { commonStyles } from '../../utils/Styles';
import { getAllNewsAPI, getNewsCategoriesAPI } from '../../utils/API';

export default function NewsScreen() {
    const [newsData, setNewsData] = React.useState([]);
    const [newsData2, setNewsData2] = React.useState([]);
    const [newsCategories, setNewsCategories] = React.useState([]);
    const [activeFilter, setActiveFilter] = React.useState('All News');

    const handleJobsNewsFilter = (item) => {
        setActiveFilter(item);

        setTimeout(() => {
            if (item === 'All News') {
                setNewsData(newsData2);
            } else {
                setNewsData(newsData.filter((work) => work?.category?.includes(item)));
            }
        }, 100);
    };

    React.useEffect(() => {
        getAllNewsAPI((response) => {
            console.log("\n\n getAllNewsAPI response", response)
            if (response !== null) {
                if (response?.Status === "success") {
                    setNewsData(response?.data);
                    setNewsData2(response?.data)
                }
            }
        })

        getNewsCategoriesAPI((response) => {
            console.log("\n\n getNewsCategoriesAPI response", response)
            var newsCategoryList = ["All News"]
            if (response !== null) {
                if (response?.Status === "success") {
                    response?.data?.map((val) => {
                        newsCategoryList.push(val?.name)
                    })
                }
            }
            setNewsCategories(newsCategoryList);
        })
    }, [])

    console.log("\n\n News text newsCategories: ", newsCategories)

    return (
        <View style={{ ...commonStyles.containerStyle }}>
            <CustomHeader title="News" />

            <ScrollView horizontal style={{ marginVertical: 16, marginLeft: 5, height: 42 }}>
                {
                    newsCategories.map((item, index) => {
                        return (
                            <View key={index}>
                                {renderNewsText(item, activeFilter, handleJobsNewsFilter)}
                            </View>
                        );
                    })
                }
            </ScrollView>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, justifyContent: 'flex-start' }}
                keyExtractor={(item, index) => index.toString()}
                data={newsData}
                renderItem={renderNewsItem}
            />

            <View style={{ height: 70 }} />
        </View>
    )
}
