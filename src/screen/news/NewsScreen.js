import { View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import CustomHeader from '../../component/Header/CustomHeader'
import { renderNewsItem } from './renderNewsItem';
import { renderNewsText } from './renderNewsText';
import { commonStyles } from '../../utils/Styles';
import { getAllNewsAPI, getNewsCategoriesAPI } from '../../utils/API';

const listData = [
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n1.jpg"),
        category: "Business",
        title: "Photo Of 2017 Rally From Kolkata Falsely Shared As Gujarat's Surat",
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n2.png"),
        category: "Tech",
        title: "Fact Check: Viral Image Claiming Fans Demeaning Bharat Jodo Yatra During a Cricket Match Is Fake",
    },
    {
        name: "The new Candyman and how horror is reckoning with racism",
        avatar_url: require("../../assets/news/n3.jpg"),
        category: "Politics",
        title: 'How FTX CEO Sam Bankman-Fried Lost $14.6 Billion Overnight',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n4.jpg"),
        category: "Entertainment",
        title: 'DOJ Seizes Over 50,000 Stolen Bitcoin',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n5.jpg"),
        category: "Business",
        title: 'Binance To Sell Off FTT, FTX Halts Withdrawals',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n6.jpg"),
        category: "Tech",
        title: 'Instagram NFTs: Meta Announces Further Web3 Integration',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n7.jpg"),
        category: "Entertainment",
        title: 'Flatcoins: The New Crypto Asset Pegged To Inflation',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n8.jpg"),
        category: "Business",
        title: 'You Can Pay With Bitcoin On Cash App',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n9.jpg"),
        category: "Tech",
        title: 'Is Blockchain Energy Consumption Still A Problem?',
    },
    {
        name: 'The new Candyman and how horror is reckoning with racism',
        avatar_url: require("../../assets/news/n10.jpg"),
        category: "Entertainment",
        title: 'Google Introduces Web3 Development Tools',
    },
];

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
