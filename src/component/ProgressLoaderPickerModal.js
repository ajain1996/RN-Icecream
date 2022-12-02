import { ActivityIndicator } from "react-native";
import { COLORS } from "./Constant/Color";

export function ProgressLoaderPickerModal() {
    // setTimeout(100)

    var [isVisible, setisVisible] = useState(true);
    return (
        <View visible={isVisible} animationType={'fade'} transparent={true}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#fff',
                }}>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        paddingBottom: 6,
                        marginHorizontal: 4,
                    }}>
                    <ActivityIndicator size={40} color={COLORS.theme} />
                    <Text style={{ marginTop: -10, fontFamily: 'STCForward-Regular' }}>
                        Please wait..
                    </Text>
                </View>
            </View>
        </View>
    );
}
