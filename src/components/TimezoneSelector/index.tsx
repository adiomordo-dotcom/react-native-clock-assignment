import React, { useCallback, useState } from 'react'
import { View, Text, Pressable, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import { TimezoneSelectorProps } from './types';
import TimezoneList from './TimezoneList';
import { Timezone } from '../../api/types';

const ModalHeader = ({ onClose }: { onClose: () => void }) => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Timezone</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
    </View>
);

const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading timezones...</Text>
    </View>
);

function TimezoneSelector({ timezones, loading, onSelect }: TimezoneSelectorProps) {
    const [visible, setVisible] = useState(false);

    const onPress = useCallback(() => {
        setVisible(true);
    }, []);

    const onRequestClose = useCallback(() => {
        setVisible(false);
    }, []);

    const onItemSelect = useCallback((timezone: Timezone) => {
        onSelect(timezone);
        setVisible(false);
    }, [onSelect]);

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>TimezoneSelector</Text>
            </Pressable>
            <Modal visible={visible} onRequestClose={onRequestClose} animationType="slide">
                <View style={styles.container}>
                    <ModalHeader onClose={onRequestClose} />
                    {loading ? <LoadingComponent /> : <TimezoneList timezones={timezones} onItemSelect={onItemSelect} />}
                </View>
            </Modal>
        </View>
    )
}

export default TimezoneSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 10,
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
});