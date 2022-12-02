import * as React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SIZES } from '../../component/Constant/Color';
import { commonStyles } from '../../utils/Styles';

const slideList = [
    { image: require("../../assets/prod/i1.webp") },
    { image: require("../../assets/prod/i2.webp") },
    { image: require("../../assets/prod/i3.webp") },
    { image: require("../../assets/prod/i4.webp") },
    { image: require("../../assets/prod/i5.webp") },
    { image: require("../../assets/prod/i7.webp") },
    { image: require("../../assets/prod/i8.webp") },
    { image: require("../../assets/prod/i9.webp") },
    { image: require("../../assets/prod/i10.webp") },
    { image: require("../../assets/prod/i11.webp") },
]

export default function HomeCarousel() {
    return (
        <FlatList
            data={slideList}
            renderItem={({ item }) => {
                return <Slide data={item} />;
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
}

function Slide({ data }) {
    return (
        <View style={{ ...commonStyles.centerStyles, paddingVertical: 14, paddingHorizontal: 10 }}>
            <Image
                source={data.image}
                style={{ height: 220, width: SIZES.width - 20, borderRadius: 12 }}
            />
        </View>
    );
}

// export default function HomeCarousel() {
//     const [index, setIndex] = React.useState(0);
//     const indexRef = React.useRef(index);
//     indexRef.current = index;
//     const onScroll = React.useCallback((event) => {
//         const slideSize = event.nativeEvent.layoutMeasurement.width;
//         const index = event.nativeEvent.contentOffset.x / slideSize;
//         const roundIndex = Math.round(index);

//         const distance = Math.abs(roundIndex - index);

//         // Prevent one pixel triggering setIndex in the middle
//         // of the transition. With this we have to scroll a bit
//         // more to trigger the index change.
//         const isNoMansLand = 0.4 < distance;

//         if (roundIndex !== indexRef.current && !isNoMansLand) {
//             setIndex(roundIndex);
//         }
//     }, []);

//     // Use the index
//     React.useEffect(() => {
//         console.warn(index);
//     }, [index]);

//     return (
//         <FlatList
//             data={slideList}
//             // style={{ flex: 1 }}
//             renderItem={({ item }) => {
//                 return <Slide data={item} />;
//             }}
//             pagingEnabled
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             onScroll={onScroll}
//             {...flatListOptimizationProps}
//         />
//     );
// }

// const flatListOptimizationProps = {
//     initialNumToRender: 0,
//     maxToRenderPerBatch: 1,
//     removeClippedSubviews: true,
//     scrollEventThrottle: 16,
//     windowSize: 2,
//     keyExtractor: e => e.id,
//     getItemLayout:
//         (_, index) => ({
//             index,
//             length: SIZES.width,
//             offset: index * SIZES.width,
//         })
// };