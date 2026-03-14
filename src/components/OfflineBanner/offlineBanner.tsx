import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';

function OfflineBanner() {
    const { isConnected } = useNetInfo();

    if (isConnected === false) {
        return (
            <SafeAreaView style={styles.banner}>
                <Text style={styles.text}>No internet connection</Text>
            </SafeAreaView>
        );
    }
}

export default OfflineBanner;

const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FF3B30',
        paddingVertical: 8,
        alignItems: 'center',
        zIndex: 999,
    },
    text: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
});