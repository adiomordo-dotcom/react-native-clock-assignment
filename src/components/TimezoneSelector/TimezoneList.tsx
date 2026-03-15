import React, { useCallback, useState, useMemo } from 'react'
import { FlatList, TextInput, View, StyleSheet } from 'react-native';
import TimezoneItem from './TimezoneItem';
import { TimezoneListProps, Timezone } from './types';
import { ITEM_HEIGHT } from '../../constants';

function TimezoneList({ timezones, onItemSelect }: TimezoneListProps) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() =>
        query.trim() === ''
            ? timezones
            : timezones.filter(tz =>
                tz.countryName.toLowerCase().includes(query.toLowerCase()) ||
                tz.zoneName.toLowerCase().includes(query.toLowerCase())
            ),
        [timezones, query]
    );

    const getItemLayout = useCallback((_: ArrayLike<Timezone> | null | undefined, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    const renderItem = useCallback(({ item }: { item: Timezone }) => (
        <TimezoneItem timezone={item} onSelect={() => onItemSelect(item)} />
    ), [onItemSelect])

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search..."
                style={styles.searchInput}
            />
            <FlatList
                data={filtered}
                renderItem={renderItem}
                keyExtractor={(item) => item.zoneName}
                getItemLayout={getItemLayout}
                windowSize={10}
                maxToRenderPerBatch={10}
                initialNumToRender={15}
                removeClippedSubviews={true}
            />
        </View>
    )
}

export default TimezoneList;

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
});
