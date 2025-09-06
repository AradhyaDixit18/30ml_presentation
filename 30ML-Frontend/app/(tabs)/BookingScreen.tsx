import { Chivo_700Bold } from '@expo-google-fonts/chivo';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useScroll } from './_layout';

const backIcon = require('../../assets/images/back.png');
const passIcon = require('../../assets/images/home.png');
const maleIcon = require('../../assets/images/male.png');
const femaleIcon = require('../../assets/images/female.png');
const guestListIcon = require('../../assets/images/guestlist_icon.png');
const tableIcon = require('../../assets/images/table_icon.png');

const SCROLL_THRESHOLD = 10;

const TicketCounter = ({ value, onIncrement, onDecrement }) => (
    <View style={styles.counterContainer}>
        <TouchableOpacity onPress={onDecrement} style={styles.counterButton}>
            <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.counterButton}>
            <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
    </View>
);

export default function BookingScreen() {
    const { setScrollDirection } = useScroll();
    const scrollOffsetY = useRef(0);
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
        Chivo_700Bold,
    });
    const [menCount, setMenCount] = useState(0);
    const [womenCount, setWomenCount] = useState(0);

    const handleScroll = (event) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        const previousOffsetY = scrollOffsetY.current;

        if (Math.abs(currentOffsetY - previousOffsetY) < SCROLL_THRESHOLD) {
            return;
        }

        if (currentOffsetY > previousOffsetY && currentOffsetY > 0) {
            setScrollDirection('down');
        } else {
            setScrollDirection('up');
        }

        scrollOffsetY.current = currentOffsetY;
    };

    if (!fontsLoaded) {
        return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading...</Text></View>;
    }

    const totalCount = menCount + womenCount;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Image source={backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>DJ Rebeka & Pun33t</Text>
                    <Text style={styles.headerSubtitle}>Tue, 29 Dec | 10:00 PM onwards | Bengaluru</Text>
                </View>
            </View>

            <Animated.ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollContainer}
            >
                <Text style={styles.sectionTitle}>Select a type of Booking</Text>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image source={passIcon} style={styles.cardIcon} />
                        <View>
                            <Text style={styles.cardTitle}>30ML Full Cover Pass</Text>
                            <Text style={styles.cardSubtitle}>Redeemable anywhere, any-day, anytime</Text>
                            <Text style={styles.cardSubtitle}>Validity 90 days</Text>
                        </View>
                    </View>
                    <View style={styles.ticketOption}>
                        <View style={styles.ticketInfo}>
                            <Image source={maleIcon} style={styles.genderIcon} />
                            <Text style={styles.ticketText}>Men</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>₹499</Text>
                            {menCount > 0 ? (
                                <TicketCounter value={menCount} onIncrement={() => setMenCount(menCount + 1)} onDecrement={() => setMenCount(menCount - 1)} />
                            ) : (
                                <TouchableOpacity style={styles.addButton} onPress={() => setMenCount(1)}>
                                    <Text style={styles.addButtonText}>Add</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={styles.ticketOption}>
                        <View style={styles.ticketInfo}>
                            <Image source={femaleIcon} style={styles.genderIcon} />
                            <Text style={styles.ticketText}>Women</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>₹299</Text>
                            {womenCount > 0 ? (
                                <TicketCounter value={womenCount} onIncrement={() => setWomenCount(womenCount + 1)} onDecrement={() => setWomenCount(womenCount - 1)} />
                            ) : (
                                <TouchableOpacity style={styles.addButton} onPress={() => setWomenCount(1)}>
                                    <Text style={styles.addButtonText}>Add</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={[styles.card, styles.guestListCard]}>
                    <View style={styles.cardHeader}>
                        <Image source={guestListIcon} style={styles.cardIcon} />
                        <View style={{flex: 1}}>
                            <Text style={styles.cardTitle}>Register for Guest List</Text>
                            <Text style={styles.cardSubtitle}>Free</Text>
                            <Text style={styles.cardFinePrint}>For Couples and Women, before 9 PM only</Text>
                            <Text style={styles.cardFinePrint}>*Subject to Approval</Text>
                        </View>
                        <View style={styles.soldOutTag}>
                            <Text style={styles.soldOutText}>Sold Out</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Image source={tableIcon} style={styles.cardIcon} />
                        <View>
                            <Text style={styles.cardTitle}>Reserve a Table</Text>
                            <Text style={styles.cardSubtitle}>Starting from ₹20k</Text>
                            <Text style={styles.cardFinePrint}>Reserved seating or bottle service</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.whatsappButton}>
                        <Text style={styles.whatsappButtonText}>Message on Whatsapp</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>

            {totalCount > 0 && (
                <View style={styles.confirmButtonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/AddBalanceScreen')}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1623',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1623',
    },
    loadingText: {
        color: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2635'
    },
    backButton: {
        padding: 5,
        marginRight: 15,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
    },
    headerSubtitle: {
        color: '#A9A9A9',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        marginTop: 2,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 120,
    },
    sectionTitle: {
        color: '#fff',
        fontFamily: 'Chivo_700Bold',
        fontSize: 16,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#2C2635',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    guestListCard: {
        opacity: 0.6
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardIcon: {
        width: 24,
        height: 24,
        tintColor: '#9B5DE5',
        marginRight: 15,
        marginTop: 5,
    },
    cardTitle: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    cardSubtitle: {
        color: '#A9A9A9',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        marginTop: 4,
    },
    cardFinePrint: {
        color: '#8A8A8A',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        marginTop: 4,
    },
    ticketOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#4A4458',
    },
    ticketInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    genderIcon: {
        width: 20,
        height: 20,
        tintColor: '#A9A9A9',
        marginRight: 10,
    },
    ticketText: {
        color: '#fff',
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        marginRight: 15,
    },
    addButton: {
        borderWidth: 1,
        borderColor: '#9B5DE5',
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    addButtonText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9B5DE5',
        borderRadius: 20,
    },
    counterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    counterButtonText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    counterValue: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    soldOutTag: {
        backgroundColor: '#4A4458',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center'
    },
    soldOutText: {
        color: '#A9A9A9',
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
    },
    whatsappButton: {
        backgroundColor: '#25D366',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    whatsappButtonText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
    confirmButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#1C1623',
    },
    confirmButton: {
        backgroundColor: '#6A0DAD',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },
});
