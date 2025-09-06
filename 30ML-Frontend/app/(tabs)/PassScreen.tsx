import { Chivo_700Bold } from '@expo-google-fonts/chivo';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const backIcon = require('../../assets/images/back.png');
const shareIcon = require('../../assets/images/share.png');
const qrCodeImage = require('../../assets/images/home.png');

const DottedLine = () => {
    return (
        <View style={styles.dottedLineContainer}>
            {Array.from({ length: 25 }).map((_, index) => (
                <View key={index} style={styles.dot} />
            ))}
        </View>
    );
};

export default function PassScreen() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
        Chivo_700Bold,
    });

    if (!fontsLoaded) {
        return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading...</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <Image source={backIcon} style={styles.headerIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Image source={shareIcon} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.cardContainer}>
                    <BlurView intensity={600} tint="dark" style={styles.card}>
                        <LinearGradient colors={['rgba(106, 13, 173, 0.3)', 'rgba(255, 48, 127, 0.3)']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.cardGradient} />
                        <View style={styles.qrSection}>
                            <Image source={qrCodeImage} style={styles.qrCode} />
                            <Text style={styles.qrTitle}>DJ Rebeka & Pun33t</Text>
                            <Text style={styles.qrSubtitle}>Ladies Night</Text>
                        </View>
                        <View style={styles.dividerContainer}>
                            <View style={styles.notchLeft} />
                            <DottedLine />
                            <View style={styles.notchRight} />
                        </View>
                        <View style={styles.detailsSection}>
                            <View style={styles.detailRow}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailValue}>29th</Text>
                                    <Text style={styles.detailLabel}>December</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailValue}>Tuesday</Text>
                                    <Text style={styles.detailLabel}>10:00 PM - End</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailValue}>1 x Couples</Text>
                                    <Text style={styles.detailLabel}>Guest</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailValue}>2 x Stags</Text>
                                    <Text style={styles.detailLabel}>Guest</Text>
                                </View>
                            </View>
                            <View style={styles.locationItem}>
                                <Text style={styles.detailValue}>Kitty Ko</Text>
                                <Text style={styles.detailLabel}>3V98+PGC, Ramadevera Betta road, Bengaluru, Karnataka 560045</Text>
                            </View>
                        </View>
                    </BlurView>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.downloadButtonText}>Download</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingText: {
        color: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
    },
    headerButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardContainer: {
        width: '100%',
        position: 'relative',
    },
    card: {
        width: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    cardGradient: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
    },
    qrSection: {
        padding: 30,
        alignItems: 'center',
    },
    qrCode: {
        width: 180,
        height: 180,
        marginBottom: 15,
    },
    qrTitle: {
        color: '#fff',
        fontFamily: 'Chivo_700Bold',
        fontSize: 20,
    },
    qrSubtitle: {
        color: '#A9A9A9',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        marginTop: 4,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dottedLineContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    dot: {
        width: 3,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    notchLeft: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#000',
        marginLeft: -15,
    },
    notchRight: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#000',
        marginRight: -15,
    },
    detailsSection: {
        padding: 30,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    detailItem: {
        flex: 1,
    },
    locationItem: {
        marginTop: 10,
    },
    detailValue: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    detailLabel: {
        color: '#A9A9A9',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        marginTop: 4,
    },
    footer: {
        padding: 20,
    },
    downloadButton: {
        backgroundColor: '#6A0DAD',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
});
