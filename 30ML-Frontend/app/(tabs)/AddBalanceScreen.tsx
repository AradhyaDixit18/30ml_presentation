import { Chivo_700Bold } from '@expo-google-fonts/chivo';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const backIcon = require('../../assets/images/back.png');

export default function AddBalanceScreen() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
        Chivo_700Bold,
    });
    const [amount, setAmount] = useState(2000);

    if (!fontsLoaded) {
        return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading...</Text></View>;
    }

    const handleAddAmount = (value: number) => {
        setAmount(prev => prev + value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Image source={backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>30ML VIP Pass</Text>
                    <Text style={styles.headerSubtitle}>Eeshitaa Goyal</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Required Balance for 4 Men | 2 Women</Text>
                    <View style={styles.requiredBalanceContainer}>
                        <Text style={styles.rupeeSymbol}>₹</Text>
                        <TextInput
                            style={styles.requiredBalanceInput}
                            value={String(amount)}
                            onChangeText={(text) => setAmount(Number(text.replace(/[^0-9]/g, '')))}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.currentBalanceLabel}>Current Balance: <Text style={styles.currentBalanceValue}>₹0.08</Text></Text>
                </View>

                <Text style={styles.addBalanceTitle}>Add more balance to the Pass</Text>

                <View style={styles.amountButtons}>
                    <TouchableOpacity style={styles.amountButton} onPress={() => handleAddAmount(1500)}>
                        <Text style={styles.amountButtonText}>+ ₹1500</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountButton} onPress={() => handleAddAmount(2000)}>
                        <Text style={styles.amountButtonText}>+ ₹2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountButton} onPress={() => handleAddAmount(5000)}>
                        <Text style={styles.amountButtonText}>+ ₹5000</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.confirmButtonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/PassScreen')}>
                    <Text style={styles.confirmButtonText}>Add Balance</Text>
                </TouchableOpacity>
            </View>
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
    content: {
        flex: 1,
        padding: 20,
    },
    balanceCard: {
        backgroundColor: '#2C2635',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        marginBottom: 40,
    },
    balanceLabel: {
        color: '#A9A9AA',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    requiredBalanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    rupeeSymbol: {
        color: '#fff',
        fontFamily: 'Chivo_700Bold',
        fontSize: 40,
    },
    requiredBalanceInput: {
        color: '#fff',
        fontFamily: 'Chivo_700Bold',
        fontSize: 40,
        padding: 0,
        marginLeft: 5,
    },
    currentBalanceLabel: {
        color: '#A9A9A9',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    currentBalanceValue: {
        color: '#F9A825',
    },
    addBalanceTitle: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        marginBottom: 20,
    },
    amountButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amountButton: {
        borderWidth: 1,
        borderColor: '#4A4458',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 25,
    },
    amountButtonText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
    confirmButtonContainer: {
        padding: 20,
        backgroundColor: '#1C1623'
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
