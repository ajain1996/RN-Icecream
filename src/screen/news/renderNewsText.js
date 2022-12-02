import { Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/Styles';

export function renderNewsText(item, activeFilter, handleJobsFilter) {

    return (
        <TouchableHighlight underlayColor="#eee" onPress={() => { handleJobsFilter(item); }}>
            <Text style={{
                ...commonStyles.fs14_600, marginHorizontal: 10, marginVertical: 6, paddingHorizontal: 2,
                color: activeFilter === item ? "#000" : "#999"
            }}>
                {item}
            </Text>
        </TouchableHighlight>
    )
}