import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native';
import TimezoneItem from './TimezoneItem';
import { Timezone } from './types';
import { ITEM_HEIGHT } from '../../constants';

function TimezoneList({ timezones }: { timezones: Timezone[] }) {

    const getItemLayout = useCallback((_: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    const onSelect = useCallback((timezone: Timezone) => {
        console.log('timezone', timezone);
    }, []);

    const renderItem = useCallback(({ item }: { item: Timezone }) => (
        <TimezoneItem timezone={item} onSelect={onSelect} />
    ), [onSelect])

    return (
        <FlatList
            data={timezones}
            renderItem={renderItem}
            keyExtractor={(item) => item.zoneName}
            getItemLayout={getItemLayout}
            windowSize={10}
            maxToRenderPerBatch={10}
            initialNumToRender={15}
            removeClippedSubviews={true}
        />
    )
}

export default TimezoneList;
